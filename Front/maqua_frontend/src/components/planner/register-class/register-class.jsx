import React, { useState } from "react";
import axios from "axios";
import { IoIosCloseCircle } from "react-icons/io";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiSolidUserMinus } from "react-icons/bi";
import "./register-class.scss";
import { environment } from "../../../environments/environment";

const RegisterClass = ({ closeModal, onSuccess, plans = [], customers = [], teachers = [], isAdmin = false, teacherId: currentTeacherId }) => {
  const baseUrl = (environment.API_BACKEND || "").replace(/\/?$/, "");
  const apiPlanClass = `${baseUrl}/planClassAPI`;

  const today = new Date();
  const defaultDate = today.toISOString().slice(0, 10);
  const defaultTime = "09:00";

  const [formState, setFormState] = useState({
    classDate: defaultDate,
    classTime: defaultTime,
    selectedTeacherId: isAdmin && teachers.length > 0 ? String(teachers[0].id) : "",
    frequencyPerWeek: "1",
    students: [{ customerId: "" }],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const plansForSelectedTeacher = isAdmin && formState.selectedTeacherId
    ? plans.filter((p) => Number(p.teacherId) === Number(formState.selectedTeacherId))
    : currentTeacherId
      ? plans.filter((p) => Number(p.teacherId) === Number(currentTeacherId))
      : plans;

  const addStudent = () => {
    setFormState((prev) => ({
      ...prev,
      students: [...prev.students, { customerId: "" }],
    }));
  };

  const removeStudent = (index) => {
    if (formState.students.length <= 1) return;
    setFormState((prev) => ({
      ...prev,
      students: prev.students.filter((_, i) => i !== index),
    }));
  };

  const updateStudent = (index, customerId) => {
    setFormState((prev) => ({
      ...prev,
      students: prev.students.map((s, i) => (i === index ? { ...s, customerId } : s)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const planId = plansForSelectedTeacher.length > 0 ? plansForSelectedTeacher[0].id : null;
    if (!planId) {
      setError(isAdmin ? "No hay planes para el profesor seleccionado." : "No hay planes disponibles.");
      return;
    }
    const dateStr = formState.classDate;
    const timeStr = formState.classTime;
    const [y, m, d] = dateStr.split("-").map(Number);
    const [hh, mm] = timeStr.split(":").map(Number);
    const classDate = new Date(y, m - 1, d, hh, mm);

    setSubmitting(true);
    try {
      await axios.post(`${apiPlanClass}/addPlan`, {
        classDate: classDate.toISOString(),
        planId: Number(planId),
      });
      onSuccess?.();
    } catch (err) {
      setError(err?.response?.data?.message || "No se pudo registrar la clase.");
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
                  onChange={(e) => setFormState((prev) => ({ ...prev, selectedTeacherId: e.target.value }))}
                  required={isAdmin}
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
            <div className="register-class-form__field">
              <label htmlFor="classDate">Fecha inicio</label>
              <input
                id="classDate"
                type="date"
                value={formState.classDate}
                onChange={(e) => setFormState((prev) => ({ ...prev, classDate: e.target.value }))}
                required
              />
            </div>
            <div className="register-class-form__field">
              <label htmlFor="classTime">Hora</label>
              <input
                id="classTime"
                type="time"
                value={formState.classTime}
                onChange={(e) => setFormState((prev) => ({ ...prev, classTime: e.target.value }))}
                required
              />
            </div>
            <div className="register-class-form__field register-class-form__field--full">
              <label htmlFor="frequencyPerWeek">Frecuencia de las clases</label>
              <select
                id="frequencyPerWeek"
                value={formState.frequencyPerWeek}
                onChange={(e) => setFormState((prev) => ({ ...prev, frequencyPerWeek: e.target.value }))}
                required
              >
                <option value="">Selecciona la frecuencia</option>
                <option value="1">1 vez por semana</option>
                <option value="2">2 veces por semana</option>
                <option value="3">3 veces por semana</option>
              </select>
            </div>
          </div>

          <div className="register-class-form__section">
            <label className="register-class-form__section-label">Estudiantes (opcional)</label>
            {formState.students.map((student, index) => (
              <div key={index} className="register-class-form__student-row">
                <div className="register-class-form__field register-class-form__field--grow">
                  <select
                    value={student.customerId}
                    onChange={(e) => updateStudent(index, e.target.value)}
                  >
                    <option value="">Selecciona un estudiante</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.lastname ?? ""}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="register-class-form__btn-remove"
                  onClick={() => removeStudent(index)}
                  title="Quitar estudiante"
                  disabled={formState.students.length <= 1}
                >
                  <BiSolidUserMinus />
                </button>
              </div>
            ))}
            <button type="button" className="register-class-form__btn-add" onClick={addStudent}>
              <AiFillPlusCircle />
              Agregar estudiante
            </button>
          </div>

          {error && <p className="register-class-form__error">{error}</p>}

          <div className="register-class-form__actions">
            <button type="button" className="register-class-form__btn register-class-form__btn--secondary" onClick={closeForm}>
              Cancelar
            </button>
            <button type="submit" className="register-class-form__btn register-class-form__btn--primary" disabled={submitting}>
              {submitting ? "Registrando..." : "Registrar clase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { RegisterClass };
