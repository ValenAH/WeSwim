import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosCloseCircle, IoIosRemove } from "react-icons/io";
import "./register-class.scss";
import { environment } from "../../../environments/environment";

const DAYS = [
  { value: 1, label: "Lun" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Mié" },
  { value: 4, label: "Jue" },
  { value: 5, label: "Vie" },
  { value: 6, label: "Sáb" },
  { value: 7, label: "Dom" },
];

const RegisterClass = ({ closeModal, onSuccess, plans = [], teachers = [], customers = [], isAdmin = false, teacherId: currentTeacherId }) => {
  const baseUrl = (environment.API_BACKEND || "").replace(/\/?$/, "");
  const apiPlanClass = `${baseUrl}/planClassAPI`;
  const apiPlanStudent = `${baseUrl}/planStudentAPI`;

  const getPlanStudentList = (res) => {
    const data = res?.data ?? {};
    const list = data.planStudentList ?? data.planStudentsList ?? (Array.isArray(data) ? data : []);
    return Array.isArray(list) ? list : [];
  };

  const today = new Date();
  const defaultDate = today.toISOString().slice(0, 10);

  const plansForSelection =
    isAdmin && plans.length > 0
      ? plans
      : currentTeacherId != null
        ? plans.filter((p) => Number(p.teacherId) === Number(currentTeacherId))
        : plans;

  const [formState, setFormState] = useState({
    planId: plansForSelection.length > 0 ? String(plansForSelection[0].id) : "",
    generateAll: false,
    classDate: defaultDate,
    classTime: "",
    startDate: defaultDate,
    endDate: defaultDate,
    daysOfWeek: [],
    selectedTeacherId: isAdmin && teachers.length > 0 ? String(teachers[0].id) : "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [planStudents, setPlanStudents] = useState([]);
  const [planStudentsLoading, setPlanStudentsLoading] = useState(false);
  const [addStudentCustomerId, setAddStudentCustomerId] = useState("");
  const [addStudentError, setAddStudentError] = useState("");
  const [addStudentSubmitting, setAddStudentSubmitting] = useState(false);

  const effectivePlanId = formState.planId ? Number(formState.planId) : null;

  useEffect(() => {
    if (!effectivePlanId) {
      setPlanStudents([]);
      return;
    }
    setPlanStudentsLoading(true);
    axios
      .get(`${apiPlanStudent}/studentsByPlan`, { params: { planId: effectivePlanId } })
      .then((res) => setPlanStudents(getPlanStudentList(res)))
      .catch(() => setPlanStudents([]))
      .finally(() => setPlanStudentsLoading(false));
  }, [effectivePlanId]);

  const getCustomerName = (customerId) => {
    const c = customers.find((x) => Number(x.id) === Number(customerId));
    return c ? `${c.name ?? ""} ${c.lastname ?? ""}`.trim() || `Cliente #${customerId}` : `Cliente #${customerId}`;
  };

  const alreadyAddedIds = planStudents.map((s) => Number(s.customerId));
  const customersToAdd = customers.filter((c) => !alreadyAddedIds.includes(Number(c.id)));

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!effectivePlanId || !addStudentCustomerId) {
      setAddStudentError("Selecciona un alumno.");
      return;
    }
    setAddStudentError("");
    setAddStudentSubmitting(true);
    try {
      await axios.post(`${apiPlanStudent}/addPlanStudent`, {
        planId: effectivePlanId,
        customerId: Number(addStudentCustomerId),
      });
      const res = await axios.get(`${apiPlanStudent}/studentsByPlan`, { params: { planId: effectivePlanId } });
      setPlanStudents(getPlanStudentList(res));
      setAddStudentCustomerId("");
      onSuccess?.();
    } catch (err) {
      setAddStudentError(err?.response?.data?.message ?? "No se pudo agregar.");
    } finally {
      setAddStudentSubmitting(false);
    }
  };

  const handleRemoveStudent = async (ps) => {
    try {
      await axios.post(`${apiPlanStudent}/RemovePlanStudent`, { id: ps.id });
      setPlanStudents((prev) => prev.filter((s) => s.id !== ps.id));
      onSuccess?.();
    } catch {
      setAddStudentError("No se pudo quitar al alumno.");
    }
  };

  const plansForDropdown =
    isAdmin && formState.selectedTeacherId
      ? plans.filter((p) => Number(p.teacherId) === Number(formState.selectedTeacherId))
      : currentTeacherId != null
        ? plans.filter((p) => Number(p.teacherId) === Number(currentTeacherId))
        : plans;

  const toggleDay = (dayValue) => {
    setFormState((prev) => {
      const next = prev.daysOfWeek.includes(dayValue)
        ? prev.daysOfWeek.filter((d) => d !== dayValue)
        : [...prev.daysOfWeek, dayValue];
      return { ...prev, daysOfWeek: next };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const planId = formState.planId ? Number(formState.planId) : null;
    if (!planId) {
      setError("Selecciona un plan.");
      return;
    }

    if (formState.generateAll) {
      if (!formState.startDate || !formState.endDate) {
        setError("Indica fecha de inicio y fin.");
        return;
      }
      if (new Date(formState.endDate) < new Date(formState.startDate)) {
        setError("La fecha fin debe ser igual o posterior a la fecha inicio.");
        return;
      }
      if (formState.daysOfWeek.length === 0) {
        setError("Marca al menos un día de la semana.");
        return;
      }
    } else {
      if (!formState.classDate) {
        setError("Indica la fecha de la clase.");
        return;
      }
    }

    setSubmitting(true);
    try {
      if (formState.generateAll) {
        const res = await axios.post(`${apiPlanClass}/generateClasses`, {
          planId,
          startDate: formState.startDate,
          endDate: formState.endDate,
          daysOfWeek: formState.daysOfWeek.slice().sort((a, b) => a - b),
        });
        const list = res?.data?.planClassList ?? res?.data?.planClassesList ?? (Array.isArray(res?.data) ? res.data : []);
        const count = Array.isArray(list) ? list.length : 0;
        setSuccessMessage(count > 0 ? `Se generaron ${count} clases con éxito.` : "Clases generadas con éxito.");
      } else {
        const [y, m, d] = formState.classDate.split("-").map(Number);
        const classDate = formState.classTime
          ? new Date(y, m - 1, d, ...formState.classTime.split(":").map(Number))
          : new Date(y, m - 1, d);
        const payload = {
          planId,
          classDate: classDate.toISOString(),
          status: "SCHEDULED",
        };
        if (formState.classTime) {
          payload.startTime = formState.classTime.length >= 5 ? formState.classTime.slice(0, 5) : formState.classTime;
        }
        await axios.post(`${apiPlanClass}/addPlanClass`, payload);
        setSuccessMessage("La clase se registró con éxito.");
      }
      onSuccess?.();
      setTimeout(() => closeModal(false), 2500);
    } catch (err) {
      const msg =
        err?.response?.data?.message ??
        (typeof err?.response?.data === "string" ? err.response.data : null) ??
        err?.message ??
        "No se pudo registrar.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const closeForm = () => closeModal(false);

  return (
    <div className="register-class-overlay" onClick={closeForm}>
      <div className="register-class-card" onClick={(e) => e.stopPropagation()}>
        <div className="register-class-card__header">
          <h2 className="register-class-card__title">Registrar clase</h2>
          <button type="button" className="register-class-card__close" onClick={closeForm} aria-label="Cerrar">
            <IoIosCloseCircle />
          </button>
        </div>
        <form className="register-class-form" onSubmit={handleSubmit}>
          <div className="register-class-form__grid">
            {isAdmin && teachers.length > 0 && (
              <div className="register-class-form__field register-class-form__field--full">
                <label htmlFor="selectedTeacherId">Profesor</label>
                <select
                  id="selectedTeacherId"
                  value={formState.selectedTeacherId}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      selectedTeacherId: e.target.value,
                      planId: "",
                    }))
                  }
                >
                  <option value="">Selecciona un profesor</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name ?? t.email ?? `Profesor ${t.id}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="register-class-form__field register-class-form__field--full">
              <label htmlFor="planId">Plan</label>
              <select
                id="planId"
                value={formState.planId}
                onChange={(e) => setFormState((prev) => ({ ...prev, planId: e.target.value }))}
                required
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

            <div className="register-class-form__field register-class-form__field--full register-class-form__field--checkbox">
              <label className="register-class-form__checkbox-label">
                <input
                  type="checkbox"
                  checked={formState.generateAll}
                  onChange={(e) => setFormState((prev) => ({ ...prev, generateAll: e.target.checked }))}
                />
                <span>Generar todas las clases</span>
              </label>
            </div>

            {!formState.generateAll ? (
              <>
                <div className="register-class-form__field">
                  <label htmlFor="classDate">Fecha de la clase</label>
                  <input
                    id="classDate"
                    type="date"
                    value={formState.classDate}
                    onChange={(e) => setFormState((prev) => ({ ...prev, classDate: e.target.value }))}
                    required={!formState.generateAll}
                  />
                </div>
                <div className="register-class-form__field">
                  <label htmlFor="classTime">Hora (opcional)</label>
                  <input
                    id="classTime"
                    type="time"
                    value={formState.classTime}
                    onChange={(e) => setFormState((prev) => ({ ...prev, classTime: e.target.value }))}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="register-class-form__field">
                  <label htmlFor="startDate">Fecha inicio</label>
                  <input
                    id="startDate"
                    type="date"
                    value={formState.startDate}
                    onChange={(e) => setFormState((prev) => ({ ...prev, startDate: e.target.value }))}
                    required={formState.generateAll}
                  />
                </div>
                <div className="register-class-form__field">
                  <label htmlFor="endDate">Fecha fin</label>
                  <input
                    id="endDate"
                    type="date"
                    value={formState.endDate}
                    onChange={(e) => setFormState((prev) => ({ ...prev, endDate: e.target.value }))}
                    required={formState.generateAll}
                  />
                </div>
                <div className="register-class-form__field register-class-form__field--full">
                  <span className="register-class-form__days-label">Días de la semana</span>
                  <div className="register-class-form__days">
                    {DAYS.map((d) => (
                      <label key={d.value} className="register-class-form__day-label">
                        <input
                          type="checkbox"
                          checked={formState.daysOfWeek.includes(d.value)}
                          onChange={() => toggleDay(d.value)}
                        />
                        <span>{d.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {effectivePlanId && (
            <div className="register-class-form__students">
              <span className="register-class-form__section-label">Estudiantes del plan</span>
              {planStudentsLoading ? (
                <p className="register-class-form__students-loading">Cargando...</p>
              ) : (
                <>
                  <div className="register-class-form__students-list-wrap">
                    {planStudents.length === 0 ? (
                      <p className="register-class-form__students-empty">No hay alumnos asignados a este plan.</p>
                    ) : (
                      <ul className="register-class-form__students-list">
                        {planStudents.map((ps) => (
                          <li key={ps.id} className="register-class-form__student-row">
                            <span className="register-class-form__student-name">{getCustomerName(ps.customerId)}</span>
                            <button
                              type="button"
                              className="register-class-form__btn-remove"
                              onClick={() => handleRemoveStudent(ps)}
                              title="Quitar del plan"
                            >
                              <IoIosRemove />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <form className="register-class-form__students-add" onSubmit={handleAddStudent}>
                    <div className="register-class-form__students-add-row">
                      <select
                        value={addStudentCustomerId}
                        onChange={(e) => setAddStudentCustomerId(e.target.value)}
                        className="register-class-form__students-add-select"
                      >
                        <option value="">Agregar alumno...</option>
                        {customersToAdd.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} {c.lastname ?? ""}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="register-class-form__btn-add"
                        disabled={addStudentSubmitting || !addStudentCustomerId}
                      >
                        {addStudentSubmitting ? "..." : "Agregar"}
                      </button>
                    </div>
                    {addStudentError && <p className="register-class-form__students-error">{addStudentError}</p>}
                  </form>
                </>
              )}
            </div>
          )}

          {error && <p className="register-class-form__error">{error}</p>}
          {successMessage && (
            <p className="register-class-form__success" role="alert">
              {successMessage}
            </p>
          )}

          <div className="register-class-form__actions">
            <button type="button" className="register-class-form__btn register-class-form__btn--secondary" onClick={closeForm}>
              Cancelar
            </button>
            <button type="submit" className="register-class-form__btn register-class-form__btn--primary" disabled={submitting}>
              {submitting ? "Guardando..." : formState.generateAll ? "Generar clases" : "Registrar clase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { RegisterClass };
