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

  const plansForDropdown =
    isAdmin && plans.length > 0
      ? plans
      : currentTeacherId != null
        ? plans.filter((p) => Number(p.teacherId) === Number(currentTeacherId))
        : plans;

  const effectivePlanId = initialPlanId != null ? initialPlanId : (planId ? Number(planId) : null);

  useEffect(() => {
    if (!isOpen) return;
    setPlanId(initialPlanId != null ? String(initialPlanId) : "");
    setError("");
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
    setError("");
    setSubmitting(true);
    try {
      await axios.post(`${apiPlanStudent}/addPlanStudent`, {
        planId: effectivePlanId,
        customerId: Number(addCustomerId),
        amount: addAmount !== "" ? Number(addAmount) : null,
      });
      const res = await axios.get(`${apiPlanStudent}/studentsByPlan`, { params: { planId: effectivePlanId } });
      setStudents(getListFromResponse(res));
      setAddCustomerId("");
      setAddAmount("");
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
            <label htmlFor="plan-studients-plan">Plan</label>
            <select
              id="plan-studients-plan"
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
                <div className="plan-studients-card__list-wrap">
                  <p className="plan-studients-card__list-label">Alumnos en este plan</p>
                  {students.length === 0 ? (
                    <p className="plan-studients-card__empty">No hay alumnos asignados.</p>
                  ) : (
                    <ul className="plan-studients-card__list">
                      {students.map((ps) => (
                        <li key={ps.id} className="plan-studients-card__item">
                          <span className="plan-studients-card__item-name">{getCustomerName(ps.customerId)}</span>
                          <span className="plan-studients-card__item-amount">
                            {ps.amount != null ? `$${Number(ps.amount).toLocaleString("es-CO")}` : "—"}
                          </span>
                          <button
                            type="button"
                            className="plan-studients-card__btn-remove"
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

                <form className="plan-studients-card__add" onSubmit={handleAdd}>
                  <p className="plan-studients-card__add-label">Agregar alumno</p>
                  <div className="plan-studients-card__add-row">
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
                      placeholder="Monto (opc.)"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      className="plan-studients-card__add-amount"
                    />
                    <button type="submit" className="plan-studients-card__btn-add" disabled={submitting || !addCustomerId}>
                      {submitting ? "..." : "Agregar"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        )}

        {showPlanSelector && !planId && (
          <p className="plan-studients-card__hint">Selecciona un plan para ver y gestionar sus alumnos.</p>
        )}

        {error && <p className="plan-studients-card__error">{error}</p>}

        <div className="plan-studients-card__actions">
          <button type="button" className="plan-studients-card__btn plan-studients-card__btn--secondary" onClick={() => onClose?.()}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export { PlanStudentsModal };
