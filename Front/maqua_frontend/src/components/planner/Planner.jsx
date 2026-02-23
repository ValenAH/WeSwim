import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./Planner.scss";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Calendar } from "./calendar/calendar";
import { RegisterClass } from "./register-class/register-class";
import { useAuth } from "../auth/Auth";
import { environment } from "../../environments/environment";

const formatDateKey = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return date.toISOString().slice(0, 10);
};

const formatTime = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
};

const Planner = () => {
  const auth = useAuth();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [planClasses, setPlanClasses] = useState([]);
  const [plans, setPlans] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTeacherId, setFilterTeacherId] = useState("");

  const baseUrl = (environment.API_BACKEND || "").replace(/\/?$/, "");
  const apiPlanClass = `${baseUrl}/planClassAPI`;
  const apiPlan = `${baseUrl}/planAPI`;
  const apiTeacher = `${baseUrl}/teacherCustomAPI`;
  const apiCustomer = `${baseUrl}/CustomerAPI`;

  const teacherId = useMemo(() => {
    if (auth.user?.role_Id !== 2) return null;
    const userId = auth.user?.id;
    const t = teachers.find((te) => Number(te.userid) === Number(userId));
    return t ? t.id : null;
  }, [auth.user, teachers]);

  const myPlanIds = useMemo(() => {
    if (auth.user?.role_Id === 1) {
      return new Set(plans.map((p) => p.id));
    }
    if (!teacherId) return new Set();
    return new Set(plans.filter((p) => Number(p.teacherId) === Number(teacherId)).map((p) => p.id));
  }, [teacherId, plans, auth.user?.role_Id]);

  const classesForSelectedDay = useMemo(() => {
    const key = formatDateKey(selectedDate);
    let list = planClasses.filter((pc) => {
      const classKey = formatDateKey(pc.classDate);
      return classKey === key && myPlanIds.has(pc.planId);
    });
    if (auth.user?.role_Id === 1 && filterTeacherId !== "") {
      list = list.filter((pc) => {
        const plan = plans.find((p) => p.id === pc.planId);
        return plan && Number(plan.teacherId) === Number(filterTeacherId);
      });
    }
    return list;
  }, [planClasses, selectedDate, myPlanIds, auth.user?.role_Id, filterTeacherId, plans]);

  const refreshClasses = () => {
    axios.get(`${apiPlanClass}/GetPlanClasses`).then((res) => {
      const data = res.data;
      const list = data?.planClassList ?? data?.planClassesList ?? (Array.isArray(data) ? data : []);
      setPlanClasses(Array.isArray(list) ? list : []);
    }).catch(() => setPlanClasses([]));
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [resPlans, resClasses, resTeachers] = await Promise.all([
          axios.get(`${apiPlan}/GetPlans`).catch(() => ({ data: {} })),
          axios.get(`${apiPlanClass}/GetPlanClasses`).catch(() => ({ data: {} })),
          (auth.user?.role_Id === 1 || auth.user?.role_Id === 2)
            ? axios.get(`${apiTeacher}/getAllTeachers`).catch(() => ({ data: {} }))
            : Promise.resolve({ data: {} }),
        ]);
        const planList = resPlans.data?.planList ?? resPlans.data?.plansList ?? [];
        const classList = resClasses.data?.planClassList ?? resClasses.data?.planClassesList ?? [];
        const teacherList = resTeachers.data?.teacherList ?? resTeachers.data ?? [];
        setPlans(Array.isArray(planList) ? planList : []);
        setPlanClasses(Array.isArray(classList) ? classList : []);
        setTeachers(Array.isArray(teacherList) ? teacherList : []);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [apiPlan, apiPlanClass, apiTeacher, auth.user?.role_Id]);

  useEffect(() => {
    if (auth.user?.role_Id === 2) {
      const userId = auth.user?.id;
      if (!userId) return;
      axios.get(`${apiCustomer}/customersByTeacher`, { params: { userId } }).then((res) => {
        const list = res?.data?.customerList ?? res?.data ?? [];
        setCustomers(Array.isArray(list) ? list : []);
      }).catch(() => setCustomers([]));
    } else if (auth.user?.role_Id === 1) {
      axios.get(`${apiCustomer}/getCustomers`).then((res) => {
        const list = res?.data?.customerList ?? res?.data ?? [];
        setCustomers(Array.isArray(list) ? list : []);
      }).catch(() => setCustomers([]));
    }
  }, [auth.user?.role_Id, auth.user?.id, apiCustomer]);

  const onClassRegistered = () => {
    refreshClasses();
    setOpenRegisterModal(false);
  };

  return (
    <section className="planner">
      <div className="planner__container container">
        <div className="planner__grid">
          <div className="planner__left">
            <div className="planner__left-header">
              <h2 className="planner__title">Clases del día</h2>
              <button type="button" className="planner__btn-register" onClick={() => setOpenRegisterModal(true)}>
                Registrar clase
              </button>
            </div>
            <p className="planner__date-label">
              {selectedDate.toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
            {auth.user?.role_Id === 1 && teachers.length > 0 && (
              <div className="planner__filter">
                <label htmlFor="planner-filter-teacher" className="planner__filter-label">Ver clases de</label>
                <select
                  id="planner-filter-teacher"
                  className="planner__filter-select"
                  value={filterTeacherId}
                  onChange={(e) => setFilterTeacherId(e.target.value)}
                >
                  <option value="">Todos los profesores</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name ?? `Profesor ${t.id}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="planner__classes-card">
              {loading ? (
                <p className="planner__empty">Cargando...</p>
              ) : classesForSelectedDay.length === 0 ? (
                <p className="planner__empty">No hay clases agendadas para este día.</p>
              ) : (
                <ul className="planner__classes-list">
                  {classesForSelectedDay.map((pc) => {
                    const plan = plans.find((p) => p.id === pc.planId);
                    const teacher = plan ? teachers.find((t) => Number(t.id) === Number(plan.teacherId)) : null;
                    const teacherName = teacher?.name ?? (plan?.teacherId ? `Profesor ${plan.teacherId}` : "");
                    return (
                      <li key={pc.id} className="planner__class-item">
                        <span className="planner__class-time">{formatTime(pc.classDate)}</span>
                        <span className="planner__class-meta">
                          {auth.user?.role_Id === 1 && teacherName ? (
                            <span className="planner__class-teacher">{teacherName}</span>
                          ) : null}
                          <span className="planner__class-plan">Plan #{pc.planId}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div className="planner__right">
            <h3 className="planner__right-title">
              <BsFillCalendarCheckFill className="planner__right-icon" />
              Selecciona una fecha y hora
            </h3>
            <div className="planner__calendar-wrap">
              <Calendar value={selectedDate} onChange={setSelectedDate} />
            </div>
          </div>
        </div>
      </div>
      {openRegisterModal && (
        <RegisterClass
          isOpen={openRegisterModal}
          closeModal={(v) => setOpenRegisterModal(!!v)}
          onSuccess={onClassRegistered}
          plans={plans}
          customers={customers}
          teachers={teachers}
          isAdmin={auth.user?.role_Id === 1}
          teacherId={teacherId}
        />
      )}
    </section>
  );
};

export default Planner;
