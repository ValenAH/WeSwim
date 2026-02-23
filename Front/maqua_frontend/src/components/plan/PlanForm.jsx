import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { environment } from "../../environments/environment";
import "./PlanForm.scss";

const baseUrl = (environment.API_BACKEND || "").replace(/\/?$/, "");

const PlanForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiPlan = `${baseUrl}/planAPI`;
  const apiPaymentPlan = `${baseUrl}/paymentPlans`;
  const apiTeacher = `${baseUrl}/teacherCustomAPI`;

  const [paymentPlans, setPaymentPlans] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formState, setFormState] = useState({
    paymentPlanId: "",
    teacherId: "",
    totalAmount: "",
    creationDate: new Date().toISOString().slice(0, 10),
    defaultStartTime: "",
    defaultEndTime: "",
    place: "",
  });

  useEffect(() => {
    const fetchPaymentPlans = async () => {
      try {
        const res = await axios.get(`${apiPaymentPlan}/GetPaymentPlans`);
        const data = res?.data ?? {};
        let list =
          data.paymentPlansList ??
          data.paymentPlanList ??
          data.PaymentPlanList ??
          (Array.isArray(data) ? data : null);
        if (!Array.isArray(list) && data && typeof data === "object") {
          const first = Object.values(data).find((v) => Array.isArray(v));
          if (first) list = first;
        }
        setPaymentPlans(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Error cargando planes de pago:", err?.response?.status, err?.message);
        setPaymentPlans([]);
      }
    };
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(`${apiTeacher}/getAllTeachers`);
        const list = res?.data?.teacherList ?? res?.data ?? [];
        setTeachers(Array.isArray(list) ? list : []);
      } catch {
        setTeachers([]);
      }
    };
    fetchPaymentPlans();
    fetchTeachers();
  }, [apiPaymentPlan, apiTeacher]);

  useEffect(() => {
    if (id === "new" || !id) return;
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`${apiPlan}/GetPlans`);
        const list = res?.data?.planList ?? res?.data ?? [];
        const plan = Array.isArray(list) ? list.find((p) => String(p.id) === String(id)) : null;
        if (plan) {
          const creationDate = plan.creationDate
            ? new Date(plan.creationDate).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10);
          const startTime = plan.defaultStartTime ? String(plan.defaultStartTime).slice(0, 5) : "";
          const endTime = plan.defaultEndTime ? String(plan.defaultEndTime).slice(0, 5) : "";
          setFormState({
            paymentPlanId: plan.idPaymentPlan ?? plan.paymentPlanId ?? "",
            teacherId: plan.teacherId ?? "",
            totalAmount: plan.totalAmount ?? "",
            creationDate,
            defaultStartTime: startTime,
            defaultEndTime: endTime,
            place: plan.place ?? "",
          });
        }
      } catch (err) {
        console.error("Error cargando plan:", err);
      }
    };
    fetchPlan();
  }, [id, apiPlan]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const buildPayload = () => {
    const payload = {
      idPaymentPlan: formState.paymentPlanId ? Number(formState.paymentPlanId) : null,
      teacherId: formState.teacherId ? Number(formState.teacherId) : null,
      creationDate: formState.creationDate ? new Date(formState.creationDate).toISOString() : new Date().toISOString(),
      totalAmount: formState.totalAmount !== "" ? Number(formState.totalAmount) : null,
    };
    payload.defaultStartTime = formState.defaultStartTime
      ? (formState.defaultStartTime.length === 5 ? formState.defaultStartTime + ":00" : formState.defaultStartTime)
      : null;
    payload.defaultEndTime = formState.defaultEndTime
      ? (formState.defaultEndTime.length === 5 ? formState.defaultEndTime + ":00" : formState.defaultEndTime)
      : null;
    if (formState.place !== undefined && formState.place !== null) {
      payload.place = formState.place.trim() || null;
    }
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = buildPayload();
    try {
      if (id === "new" || !id) {
        await axios.post(`${apiPlan}/addPlan`, payload);
      } else {
        payload.id = Number(id);
        await axios.post(`${apiPlan}/updatePlan`, payload);
      }
      navigate("/plan");
    } catch (err) {
      console.error("Error guardando plan:", err?.response?.data ?? err);
    }
  };

  const isNew = id === "new" || !id;
  const formTitle = isNew ? "Crear plan" : "Editar plan";

  return (
    <section className="plan-form">
      <div className="plan-form__container container">
        <div className="plan-form__header">
          <button
            type="button"
            className="plan-form__back"
            onClick={() => navigate("/plan")}
            title="Volver al listado"
          >
            <IoIosArrowBack />
            Volver
          </button>
        </div>
        <div className="plan-form__card">
          <h2 className="plan-form__title">{formTitle}</h2>
          <form className="plan-form__form" onSubmit={handleSubmit}>
            <div className="plan-form__grid">
              <div className="plan-form__field plan-form__field--full">
                <label htmlFor="paymentPlanId">Plan de pago</label>
                <select
                  id="paymentPlanId"
                  name="paymentPlanId"
                  value={formState.paymentPlanId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un plan de pago</option>
                  {paymentPlans.map((pp) => (
                    <option key={pp.id} value={pp.id}>
                      {pp.periodicity != null && pp.peopleQuantity != null && pp.price != null
                        ? `${pp.periodicity} vez/sem, ${pp.peopleQuantity} persona(s) — $${Number(pp.price).toLocaleString("es-CO")}`
                        : `Plan #${pp.id}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="plan-form__field plan-form__field--full">
                <label htmlFor="teacherId">Profesor</label>
                <select
                  id="teacherId"
                  name="teacherId"
                  value={formState.teacherId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un profesor</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name ?? t.email ?? `Profesor ${t.id}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="plan-form__field">
                <label htmlFor="totalAmount">Precio total (monto real, puede incluir descuento)</label>
                <input
                  id="totalAmount"
                  name="totalAmount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Ej. 150000"
                  value={formState.totalAmount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="plan-form__field">
                <label htmlFor="creationDate">Fecha de creación</label>
                <input
                  id="creationDate"
                  name="creationDate"
                  type="date"
                  value={formState.creationDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="plan-form__field">
                <label htmlFor="defaultStartTime">Hora inicio pactada (opcional)</label>
                <input
                  id="defaultStartTime"
                  name="defaultStartTime"
                  type="time"
                  value={formState.defaultStartTime}
                  onChange={handleChange}
                />
              </div>
              <div className="plan-form__field">
                <label htmlFor="defaultEndTime">Hora fin pactada (opcional)</label>
                <input
                  id="defaultEndTime"
                  name="defaultEndTime"
                  type="time"
                  value={formState.defaultEndTime}
                  onChange={handleChange}
                />
              </div>
              <div className="plan-form__field plan-form__field--full">
                <label htmlFor="place">Lugar de la clase</label>
                <input
                  id="place"
                  name="place"
                  type="text"
                  placeholder="Ej. Piscina Centro, Cancha 2"
                  value={formState.place}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="plan-form__actions">
              <button type="button" className="plan-form__btn plan-form__btn--secondary" onClick={() => navigate("/plan")}>
                Cancelar
              </button>
              <button type="submit" className="plan-form__btn plan-form__btn--primary">
                {isNew ? "Crear" : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export { PlanForm };
