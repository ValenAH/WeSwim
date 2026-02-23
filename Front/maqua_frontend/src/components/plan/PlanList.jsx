import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PlanList.scss";
import { BsFillPencilFill, BsFillTrashFill, BsPeopleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { environment } from "../../environments/environment";
import { PlanStudentsModal } from "./PlanStudentsModal";

const getListFromResponse = (res) => {
  const data = res?.data;
  if (!data) return [];
  if (Array.isArray(data)) return data;
  const list = data.planList ?? data.PlanList ?? data.plans;
  if (Array.isArray(list)) return list;
  const firstValue = data && typeof data === "object" ? Object.values(data)[0] : null;
  if (Array.isArray(firstValue)) return firstValue;
  return [];
};

const formatTime = (t) => {
  if (!t) return "—";
  if (typeof t === "string" && t.length >= 5) return t.slice(0, 5);
  return "—";
};

const formatDate = (d) => {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const PlanList = () => {
  const baseUrl = (environment.API_BACKEND || "").replace(/\/?$/, "");
  const apiPlan = `${baseUrl}/planAPI`;
  const apiPaymentPlan = `${baseUrl}/paymentPlans`;
  const apiTeacher = `${baseUrl}/teacherCustomAPI`;
  const apiCustomer = `${baseUrl}/CustomerAPI`;
  const navigate = useNavigate();
  const auth = useAuth();
  const [plans, setPlans] = useState([]);
  const [paymentPlans, setPaymentPlans] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [openStudentsPlanId, setOpenStudentsPlanId] = useState(null);
  const roleId = auth.user?.role_Id != null ? Number(auth.user.role_Id) : null;
  const isAdmin = roleId === 1;
  const isProfessor = roleId === 2;
  const teacherId = isProfessor && auth.user?.id
    ? (() => {
        const t = teachers.find((te) => Number(te.userid) === Number(auth.user.id));
        return t ? t.id : null;
      })()
    : null;

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(`${apiTeacher}/getAllTeachers`);
        const list = res?.data?.teacherList ?? res?.data ?? [];
        setTeachers(Array.isArray(list) ? list : []);
      } catch {
        setTeachers([]);
      }
    };
    fetchTeachers();
  }, [apiTeacher]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${apiPlan}/GetPlans`);
        setPlans(getListFromResponse(res));
      } catch (err) {
        console.error("Error cargando planes:", err?.response?.status, err?.message);
        setPlans([]);
      }
    };
    fetchPlans();
  }, [apiPlan]);

  useEffect(() => {
    const fetchPaymentPlans = async () => {
      try {
        const res = await axios.get(`${apiPaymentPlan}/GetPaymentPlans`);
        const data = res?.data ?? {};
        const list =
          data.paymentPlansList ??
          data.paymentPlanList ??
          data.PaymentPlanList ??
          (Array.isArray(data) ? data : []);
        setPaymentPlans(Array.isArray(list) ? list : []);
      } catch {
        setPaymentPlans([]);
      }
    };
    fetchPaymentPlans();
  }, [apiPaymentPlan]);

  const refreshPlans = () => {
    axios.get(`${apiPlan}/GetPlans`).then((res) => setPlans(getListFromResponse(res))).catch(() => setPlans([]));
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        if (isProfessor && auth.user?.id) {
          const res = await axios.get(`${apiCustomer}/customersByTeacher`, { params: { userId: auth.user.id } });
          const list = res?.data?.customerList ?? res?.data ?? [];
          setCustomers(Array.isArray(list) ? list : []);
        } else if (isAdmin) {
          const res = await axios.get(`${apiCustomer}/getCustomers`);
          const list = res?.data?.customerList ?? res?.data ?? [];
          setCustomers(Array.isArray(list) ? list : []);
        }
      } catch {
        setCustomers([]);
      }
    };
    fetchCustomers();
  }, [apiCustomer, isAdmin, isProfessor, auth.user?.id]);

  const displayPlans =
    isProfessor && teacherId == null
      ? []
      : isProfessor && teacherId != null
        ? plans.filter((p) => Number(p.teacherId) === Number(teacherId))
        : plans;

  const getTeacherName = (plan) => {
    const t = teachers.find((te) => Number(te.id) === Number(plan.teacherId));
    return t?.name ?? t?.email ?? (plan.teacherId ? `Profesor ${plan.teacherId}` : "—");
  };

  const handleDelete = async (plan) => {
    if (!window.confirm("¿Eliminar este plan?")) return;
    try {
      await axios.post(`${apiPlan}/RemovePlan`, { id: plan.id });
      setPlans((prev) => prev.filter((p) => p.id !== plan.id));
    } catch (err) {
      console.error("No se pudo eliminar el plan", err);
    }
  };

  const title = isProfessor ? "Mis planes" : "Planes";

  return (
    <section className="plan-list">
      <div className="plan-list__container container">
        <div className="plan-list__header">
          <h2 className="plan-list__title">{title}</h2>
          {isAdmin && (
            <button
              type="button"
              className="plan-list__btn-new"
              onClick={() => navigate("/plan/new")}
            >
              Nuevo plan
            </button>
          )}
        </div>
        <div className="plan-list__card">
          <div className="plan-list__table-wrap">
            <table className="plan-list__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Plan de pago (ID)</th>
                  <th>Profesor</th>
                  <th>Precio</th>
                  <th>Fecha creación</th>
                  <th>Hora pactada</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {displayPlans.map((plan, index) => (
                  <tr key={plan.id ?? index}>
                    <td>{plan.id}</td>
                    <td>{plan.idPaymentPlan ?? plan.paymentPlanId ?? plan.PaymentPlanId ?? "—"}</td>
                    <td>{getTeacherName(plan)}</td>
                    <td>{plan.totalAmount != null ? `$${Number(plan.totalAmount).toLocaleString("es-CO")}` : "—"}</td>
                    <td>{formatDate(plan.creationDate)}</td>
                    <td>
                      {formatTime(plan.defaultStartTime) !== "—" || formatTime(plan.defaultEndTime) !== "—"
                        ? `${formatTime(plan.defaultStartTime)} - ${formatTime(plan.defaultEndTime)}`
                        : "—"}
                    </td>
                    <td>
                      <span className="plan-list__actions">
                        <button
                          type="button"
                          className="plan-list__action plan-list__action--students"
                          onClick={() => setOpenStudentsPlanId(plan.id)}
                          title="Estudiantes del plan"
                        >
                          <BsPeopleFill />
                        </button>
                        <button
                          type="button"
                          className="plan-list__action plan-list__action--edit"
                          onClick={() => navigate(`/plan/${plan.id}`)}
                          title="Editar"
                        >
                          <BsFillPencilFill />
                        </button>
                        {isAdmin && (
                          <button
                            type="button"
                            className="plan-list__action plan-list__action--delete"
                            onClick={() => handleDelete(plan)}
                            title="Eliminar"
                          >
                            <BsFillTrashFill />
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {displayPlans.length === 0 && (
            <p className="plan-list__empty">No hay planes registrados.</p>
          )}
        </div>
      </div>
      {openStudentsPlanId != null && (
        <PlanStudentsModal
          isOpen={true}
          onClose={() => setOpenStudentsPlanId(null)}
          planId={openStudentsPlanId}
          planLabel={`Estudiantes del plan #${openStudentsPlanId}`}
          plans={plans}
          paymentPlans={paymentPlans}
          apiPlan={apiPlan}
          customers={customers}
          teachers={teachers}
          isAdmin={isAdmin}
          teacherId={teacherId}
          onSuccess={refreshPlans}
        />
      )}
    </section>
  );
};

export { PlanList };
