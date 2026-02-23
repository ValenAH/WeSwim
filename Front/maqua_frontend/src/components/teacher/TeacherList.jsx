import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeacherList.scss";
import { BsFillPencilFill, BsFillTrashFill, BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { environment } from "../../environments/environment";

const getListFromResponse = (res) => {
  const data = res?.data;
  if (!data) return [];
  if (Array.isArray(data)) return data;
  const list = data.teacherList ?? data.TeacherList ?? data.teacher_list ?? data.teachers;
  if (Array.isArray(list)) return list;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const firstValue = Object.values(data)[0];
    if (Array.isArray(firstValue)) return firstValue;
  }
  return [];
};

const DOCUMENT_TYPE_NAMES = {
  1: "Cédula",
  2: "Tarjeta de identidad",
  3: "Pasaporte",
};

const TeacherList = () => {
  const baseUrl = (environment.API_BACKEND || "").replace(/\/?$/, "");
  const teacherUrl = `${baseUrl}/teacherCustomAPI`;
  const navigate = useNavigate();
  const [teachers, setTeacher] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(teacherUrl + "/getAllTeachers");
        setTeacher(getListFromResponse(res));
      } catch (err) {
        console.log(err);
        setTeacher([]);
      }
    };
    fetchData();
  }, [teacherUrl]);

  const handleDeleteTeacher = async (teacher) => {
    try {
      await axios.post(teacherUrl + "/teacherremove", teacher);
      setTeacher((prev) => prev.filter((t) => t.id !== teacher.id));
    } catch (err) {
      console.log("No se ha podido eliminar el profesor", err);
    }
  };

  return (
    <section className="teacher-list">
      <div className="teacher-list__container container">
        <div className="teacher-list__header">
          <h2 className="teacher-list__title">Administrar profesores</h2>
          <button
            type="button"
            className="teacher-list__btn-new"
            onClick={() => navigate("/teacher/new")}
          >
            Nuevo profesor
          </button>
        </div>
        <div className="teacher-list__card">
          <div className="teacher-list__table-wrap">
            <table className="teacher-list__table">
              <thead>
                <tr>
                  <th>Nombre completo</th>
                  <th>Email</th>
                  <th>Tipo doc.</th>
                  <th>Nº documento</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher, index) => (
                  <tr key={teacher.id ?? index}>
                    <td>{teacher.name ?? "—"}</td>
                    <td>{teacher.email ?? "—"}</td>
                    <td>{DOCUMENT_TYPE_NAMES[teacher.documentTypeid] ?? teacher.documentTypeid ?? "—"}</td>
                    <td>{teacher.documentNumber ?? "—"}</td>
                    <td>{teacher.phone ?? "—"}</td>
                    <td>
                      <span className="teacher-list__actions">
                        <button
                          type="button"
                          className="teacher-list__action teacher-list__action--view"
                          onClick={() => navigate(`/teacher/${teacher.id}/details`)}
                          title="Ver detalles"
                        >
                          <BsEye />
                        </button>
                        <button
                          type="button"
                          className="teacher-list__action teacher-list__action--edit"
                          onClick={() => navigate(`/teacher/${teacher.id}`)}
                          title="Editar"
                        >
                          <BsFillPencilFill />
                        </button>
                        <button
                          type="button"
                          className="teacher-list__action teacher-list__action--delete"
                          onClick={() => handleDeleteTeacher(teacher)}
                          title="Eliminar"
                        >
                          <BsFillTrashFill />
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export { TeacherList };
