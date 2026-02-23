import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { environment } from "../../environments/environment";
import "./TeacherDetails.scss";

const DOCUMENT_TYPE_NAMES = {
  1: "Cédula",
  2: "Tarjeta de identidad",
  3: "Pasaporte",
};

const BANK_NAMES = {
  1: "Bancolombia",
  2: "BBVA",
  3: "Davivienda",
};

const TeacherDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = (environment.API_BACKEND || "http://localhost:9009/api/").replace(/\/?$/, "");
  const apiTeachers = `${baseUrl}/teacherCustomAPI`;
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`${apiTeachers}/getTeacherById?id=${id}`);
        setTeacher(res.data);
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar los datos del profesor.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTeacher();
  }, [id, apiTeachers]);

  if (loading) {
    return (
      <section className="teacher-details">
        <div className="teacher-details__container container">
          <div className="teacher-details__header">
            <button type="button" className="teacher-details__back" onClick={() => navigate("/teacher")}>
              <IoIosArrowBack />
              Volver
            </button>
          </div>
          <div className="teacher-details__card">
            <p className="teacher-details__loading">Cargando...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !teacher) {
    return (
      <section className="teacher-details">
        <div className="teacher-details__container container">
          <div className="teacher-details__header">
            <button type="button" className="teacher-details__back" onClick={() => navigate("/teacher")}>
              <IoIosArrowBack />
              Volver
            </button>
          </div>
          <div className="teacher-details__card">
            <p className="teacher-details__error">{error ?? "Profesor no encontrado."}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="teacher-details">
      <div className="teacher-details__container container">
        <div className="teacher-details__header">
          <button
            type="button"
            className="teacher-details__back"
            onClick={() => navigate("/teacher")}
            title="Volver al listado"
          >
            <IoIosArrowBack />
            Volver
          </button>
        </div>
        <div className="teacher-details__card">
          <h2 className="teacher-details__title">Detalles del profesor</h2>
          <dl className="teacher-details__list">
            <div className="teacher-details__row">
              <dt>Nombre completo</dt>
              <dd>{teacher.name ?? "—"}</dd>
            </div>
            <div className="teacher-details__row">
              <dt>Email</dt>
              <dd>{teacher.email ?? "—"}</dd>
            </div>
            <div className="teacher-details__row">
              <dt>Tipo de documento</dt>
              <dd>{DOCUMENT_TYPE_NAMES[teacher.documentTypeid] ?? teacher.documentTypeid ?? "—"}</dd>
            </div>
            <div className="teacher-details__row">
              <dt>Nº documento</dt>
              <dd>{teacher.documentNumber ?? "—"}</dd>
            </div>
            <div className="teacher-details__row">
              <dt>Teléfono</dt>
              <dd>{teacher.phone ?? "—"}</dd>
            </div>
            <div className="teacher-details__row">
              <dt>Banco</dt>
              <dd>{BANK_NAMES[teacher.bankid] ?? teacher.bankid ?? "—"}</dd>
            </div>
            <div className="teacher-details__row">
              <dt>Tipo de cuenta</dt>
              <dd>{teacher.accountType ?? "—"}</dd>
            </div>
            <div className="teacher-details__row">
              <dt>Nº de cuenta</dt>
              <dd>{teacher.accountNumber ?? "—"}</dd>
            </div>
          </dl>
          <div className="teacher-details__actions">
            <button
              type="button"
              className="teacher-details__btn teacher-details__btn--primary"
              onClick={() => navigate(`/teacher/${id}`)}
            >
              Editar profesor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TeacherDetails };
