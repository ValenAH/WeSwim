import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircle, IoIosRemove } from "react-icons/io";
import { environment } from "../../environments/environment";
import "./PlanStudentsModal.scss";

const baseUrl = (environment.API_BACKEND || "").replace(/\/?$/, "");
const apiPlanStudent = `${baseUrl}/planStudentAPI`;

const getListFromResponse = (res) => {
  const data = res?.data ?? {};
  const list = data.planStudentList ?? data.planStudentsList ?? (Array.isArray(data) ? data : []);
  return Array.isArray(list) ? list : [];
};

const PlanStudentsModal = ({
  isOpen,
  onClose,
  planId: initialPlanId = null,
  planLabel = "",
  plans = [],
  paymentPlans = [],
  apiPlan = "",
  customers = [],
  teachers = [],
  isAdmin = false,
  teacherId: currentTeacherId = null,
  onSuccess,
}) => {
  const [planId, setPlanId] = useState(initialPlanId != null ? String(initialPlanId) : "");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addCustomerId, setAddCustomerId] = useState("");
  const [addAmount, setAddAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [selectedNewPaymentPlanId, setSelectedNewPaymentPlanId] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const plansForDropdown =
    isAdmin && plans.length > 0
      ? plans
      : currentTeacherId != null
        ? plans.filter((p) => Number(p.teacherId) === Number(currentTeacherId))
        : plans;

  const effectivePlanId = initialPlanId != null ? initialPlanId : (planId ? Number(planId) : null);
  const currentPlan = plans.find((p) => Number(p.id) === Number(effectivePlanId));
  const currentPaymentPlanId = currentPlan?.idPaymentPlan ?? currentPlan?.paymentPlanId ?? currentPlan?.PaymentPlanId;
  const paymentPlan = paymentPlans.find((pp) => Number(pp.id) === Number(currentPaymentPlanId));
  const maxStudents = paymentPlan?.peopleQuantity ?? null;
  const newCountIfAdd = students.length + 1;
  const wouldExceedLimit = maxStudents != null && newCountIfAdd > maxStudents;
  const paymentPlansForMorePeople =
    wouldExceedLimit && paymentPlans.length > 0
      ? paymentPlans.filter((pp) => (pp.peopleQuantity ?? 0) >= newCountIfAdd)
      : [];
  const canAdd = !wouldExceedLimit || selectedNewPaymentPlanId !== "";

  useEffect(() => {
    if (!isOpen) return;
    setPlanId(initialPlanId != null ? String(initialPlanId) : "");
    setError("");
    setShowAddForm(false);
  }, [isOpen, initialPlanId]);

  useEffect(() => {
    if (!isOpen || !effectivePlanId) {
      setStudents([]);
      return;
    }
    setLoading(true);
    axios
      .get(`${apiPlanStudent}/studentsByPlan`, { params: { planId: effectivePlanId } })
      .then((res) => setStudents(getListFromResponse(res)))
      .catch(() => setStudents([]))
      .finally(() => setLoading(false));
  }, [isOpen, effectivePlanId, apiPlanStudent]);

  const getCustomerName = (customerId) => {
    const c = customers.find((x) => Number(x.id) === Number(customerId));
    return c ? `${c.name ?? ""} ${c.lastname ?? ""}`.trim() || `Cliente #${customerId}` : `Cliente #${customerId}`;
  };

  const alreadyAddedIds = students.map((s) => Number(s.customerId));
  const customersToAdd = customers.filter((c) => !alreadyAddedIds.includes(Number(c.id)));

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!effectivePlanId || !addCustomerId) {
      setError("Selecciona un alumno.");
      return;
    }
    if (wouldExceedLimit && !selectedNewPaymentPlanId) {
      setError("Selecciona un plan de pago que permita más personas.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      if (wouldExceedLimit && selectedNewPaymentPlanId && apiPlan) {
        const newPP = paymentPlans.find((pp) => Number(pp.id) === Number(selectedNewPaymentPlanId));
        if (newPP) {
          const payload = {
            id: effectivePlanId,
            idPaymentPlan: Number(selectedNewPaymentPlanId),
            teacherId: currentPlan?.teacherId ?? null,
            creationDate: currentPlan?.creationDate ?? new Date().toISOString(),
            totalAmount: newPP.price ?? currentPlan?.totalAmount,
            place: currentPlan?.place ?? null,
          };
          if (currentPlan?.defaultStartTime != null)
            payload.defaultStartTime =
              String(currentPlan.defaultStartTime).length >= 5
                ? String(currentPlan.defaultStartTime).slice(0, 5) + ":00"
                : currentPlan.defaultStartTime;
          if (currentPlan?.defaultEndTime != null)
            payload.defaultEndTime =
              String(currentPlan.defaultEndTime).length >= 5
                ? String(currentPlan.defaultEndTime).slice(0, 5) + ":00"
                : currentPlan.defaultEndTime;
          await axios.post(`${apiPlan}/updatePlan`, payload);
        }
      }
      await axios.post(`${apiPlanStudent}/addPlanStudent`, {
        planId: effectivePlanId,
        customerId: Number(addCustomerId),
        amount: addAmount !== "" ? Number(addAmount) : null,
      });
      const res = await axios.get(`${apiPlanStudent}/studentsByPlan`, { params: { planId: effectivePlanId } });
      setStudents(getListFromResponse(res));
      setAddCustomerId("");
      setAddAmount("");
      setSelectedNewPaymentPlanId("");
      setShowAddForm(false);
      onSuccess?.();
    } catch (err) {
      setError(err?.response?.data?.message ?? "No se pudo agregar.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (ps) => {
    try {
      await axios.post(`${apiPlanStudent}/RemovePlanStudent`, { id: ps.id });
      setStudents((prev) => prev.filter((s) => s.id !== ps.id));
      onSuccess?.();
    } catch {
      setError("No se pudo quitar al alumno.");
    }
  };

  if (!isOpen) return null;

  const showPlanSelector = initialPlanId == null && plansForDropdown.length > 0;
  const title = planLabel || (effectivePlanId ? `Estudiantes del plan #${effectivePlanId}` : "Alumnos del plan");

  return (
    <div className="plan-students-overlay" onClick={() => onClose?.()}>
      <div className="plan-students-card" onClick={(e) => e.stopPropagation()}>
        <div className="plan-students-card__header">
          <h2 className="plan-students-card__title">{title}</h2>
          <button type="button" className="plan-students-card__close" onClick={() => onClose?.()} aria-label="Cerrar">
            <IoIosCloseCircle />
          </button>
        </div>

        {showPlanSelector && (
          <div className="plan-students-card__plan-select">
            <label htmlFor="plan-students-plan">Plan</label>
            <select
              id="plan-students-plan"
              value={planId}
              onChange={(e) => setPlanId(e.target.value)}
            >
              <option value="">Selecciona un plan</option>
              {plansForDropdown.map((p) => (
                <option key={p.id} value={p.id}>
                  Plan #{p.id}
                  {p.totalAmount != null ? ` — $${Number(p.totalAmount).toLocaleString("es-CO")}` : ""}
                </option>
              ))}
            </select>
          </div>
        )}

        {effectivePlanId && (
          <>
            {loading ? (
              <p className="plan-students-card__loading">Cargando...</p>
            ) : (
              <>
                <div className="plan-students-card__list-wrap">
                  <p className="plan-students-card__list-label">Alumnos en este plan</p>
                  {students.length === 0 ? (
                    <p className="plan-students-card__empty">No hay alumnos asignados.</p>
                  ) : (
                    <ul className="plan-students-card__list">
                      {students.map((ps) => (
                        <li key={ps.id} className="plan-students-card__item">
                          <span className="plan-students-card__item-name">{getCustomerName(ps.customerId)}</span>
                          <span className="plan-students-card__item-amount">
                            {ps.amount != null ? `$${Number(ps.amount).toLocaleString("es-CO")}` : "—"}
                          </span>
                          <button
                            type="button"
                            className="plan-students-card__btn-remove"
                            onClick={() => handleRemove(ps)}
                            title="Quitar del plan"
                          >
                            <IoIosRemove />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {!showAddForm ? (
                  <button
                    type="button"
                    className="plan-students-card__btn-add plan-students-card__btn-add--toggle"
                    onClick={() => setShowAddForm(true)}
                  >
                    Agregar alumno
                  </button>
                ) : (
                  <form className="plan-students-card__add" onSubmit={handleAdd}>
                    {wouldExceedLimit && paymentPlansForMorePeople.length > 0 && (
                      <div className="plan-students-card__payment-plan-change">
                        <p className="plan-students-card__payment-plan-change-msg">
                          Este plan es para {maxStudents} persona(s). Para agregar otro estudiante ({newCountIfAdd} en total), elige un plan de pago:
                        </p>
                        <select
                          value={selectedNewPaymentPlanId}
                          onChange={(e) => setSelectedNewPaymentPlanId(e.target.value)}
                          className="plan-students-card__payment-plan-select"
                        >
                          <option value="">Selecciona plan de pago</option>
                          {paymentPlansForMorePeople.map((pp) => (
                            <option key={pp.id} value={pp.id}>
                              {pp.peopleQuantity} persona(s), {pp.periodicity} vez/sem — $${Number(pp.price ?? 0).toLocaleString("es-CO")}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {wouldExceedLimit && paymentPlansForMorePeople.length === 0 && (
                      <p className="plan-students-card__payment-plan-no-option">
                        No hay un plan de pago configurado para {newCountIfAdd} personas. Crea uno en la sección de planes de pago.
                      </p>
                    )}
                    {!(wouldExceedLimit && paymentPlansForMorePeople.length === 0) && (
                    <div className="plan-students-card__add-row">
                      <select
                        value={addCustomerId}
                        onChange={(e) => setAddCustomerId(e.target.value)}
                      >
                        <option value="">Selecciona un cliente</option>
                        {customersToAdd.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} {c.lastname ?? ""}
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="Monto"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                        className="plan-students-card__add-amount"
                      />
                      <button
                        type="submit"
                        className="plan-students-card__btn-add"
                        disabled={submitting || !addCustomerId || !canAdd || (wouldExceedLimit && paymentPlansForMorePeople.length === 0)}
                      >
                        {submitting ? "..." : "Agregar"}
                      </button>
                    </div>
                    )}
                  </form>
                )}
              </>
            )}
          </>
        )}

        {showPlanSelector && !planId && (
          <p className="plan-students-card__hint">Selecciona un plan para ver y gestionar sus alumnos.</p>
        )}

        {error && <p className="plan-students-card__error">{error}</p>}

        <div className="plan-students-card__actions">
          <button type="button" className="plan-students-card__btn plan-students-card__btn--secondary" onClick={() => onClose?.()}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export { PlanStudentsModal };
