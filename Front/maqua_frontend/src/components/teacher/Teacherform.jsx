import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { environment } from "../../environments/environment";
import "./Teacherform.scss";

const Teacherform = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = (environment.API_BACKEND || "http://localhost:9009/api/").replace(/\/?$/, "");
  const apiTeachers = `${baseUrl}/teacherCustomAPI`;
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    documentTypeid: 0,
    documentNumber: "",
    phone: "",
    userid: 1,
    bankid: 0,
    accountType: "",
    accountNumber: "",
    password: "",
  });

  useEffect(() => {
    if (id === "new") return;
    const fetchTeacher = async () => {
      await axios
        .get(`${apiTeachers}/getTeacherById?id=${id}`)
        .then((response) => {
          setFormState(response.data);
        })
        .catch((error) => console.log(error));
    };
    fetchTeacher();
  }, [id, apiTeachers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "new") {
      await axios.post(apiTeachers + "/addnewteacher", formState).catch((err) => console.log(err));
      return navigate("/teacher");
    } else {
      let data = { id: id, ...formState };
      await axios
        .post(apiTeachers + "/updateteacher", data)
        .then((response) => {
          setFormState(response);
        })
        .catch((err) => console.log(err));
      return navigate("/teacher");
    }
  };

  const handleChangeTeacher = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const isNew = id === "new";
  const formTitle = isNew ? "Crear profesor" : "Editar profesor";

  return (
    <section className="teacher-form">
      <div className="teacher-form__container container">
        <div className="teacher-form__header">
          <button
            type="button"
            className="teacher-form__back"
            onClick={() => navigate("/teacher")}
            title="Volver al listado"
          >
            <IoIosArrowBack />
            Volver
          </button>
        </div>
        <div className="teacher-form__card">
          <h2 className="teacher-form__title">{formTitle}</h2>
          <form className="teacher-form__form" onSubmit={handleSubmit}>
            <div className="teacher-form__grid">
              <div className="teacher-form__field">
                <label htmlFor="name">Nombre completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formState.name}
                  placeholder="Ingrese el nombre completo"
                  onChange={handleChangeTeacher}
                />
              </div>
              <div className="teacher-form__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  placeholder="Ingrese el correo"
                  onChange={handleChangeTeacher}
                />
              </div>
              <div className="teacher-form__field">
                <label htmlFor="documentTypeid">Tipo de documento</label>
                <select
                  id="documentTypeid"
                  name="documentTypeid"
                  value={formState.documentTypeid}
                  onChange={handleChangeTeacher}
                >
                  <option value={0} disabled hidden>
                    Selecciona un tipo de documento
                  </option>
                  <option value={1}>Cédula</option>
                  <option value={2}>Tarjeta de identidad</option>
                  <option value={3}>Pasaporte</option>
                </select>
              </div>
              <div className="teacher-form__field">
                <label htmlFor="documentNumber">Nº documento</label>
                <input
                  id="documentNumber"
                  name="documentNumber"
                  type="text"
                  value={formState.documentNumber}
                  placeholder="Ingrese el número de documento"
                  onChange={handleChangeTeacher}
                />
              </div>
              <div className="teacher-form__field">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  placeholder="Ingrese el teléfono"
                  onChange={handleChangeTeacher}
                />
              </div>
              <div className="teacher-form__field">
                <label htmlFor="bankid">Banco</label>
                <select
                  id="bankid"
                  name="bankid"
                  value={formState.bankid}
                  onChange={handleChangeTeacher}
                >
                  <option value={0} disabled hidden>
                    Selecciona un banco
                  </option>
                  <option value={1}>Bancolombia</option>
                  <option value={2}>BBVA</option>
                  <option value={3}>Davivienda</option>
                </select>
              </div>
              <div className="teacher-form__field">
                <label htmlFor="accountType">Tipo de cuenta</label>
                <select
                  id="accountType"
                  name="accountType"
                  value={formState.accountType}
                  onChange={handleChangeTeacher}
                >
                  <option value="" disabled hidden>
                    Selecciona tipo de cuenta
                  </option>
                  <option value="Ahorros">Ahorros</option>
                  <option value="Corriente">Corriente</option>
                </select>
              </div>
              <div className="teacher-form__field">
                <label htmlFor="accountNumber">Nº de cuenta</label>
                <input
                  id="accountNumber"
                  name="accountNumber"
                  type="text"
                  value={formState.accountNumber}
                  placeholder="Ingrese el número de cuenta"
                  onChange={handleChangeTeacher}
                />
              </div>
              <div className="teacher-form__field teacher-form__field--full">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  placeholder="Ingrese la contraseña"
                  onChange={handleChangeTeacher}
                />
              </div>
            </div>
            <div className="teacher-form__actions">
              <button
                type="button"
                className="teacher-form__btn teacher-form__btn--secondary"
                onClick={() => navigate("/teacher")}
              >
                Cancelar
              </button>
              <button type="submit" className="teacher-form__btn teacher-form__btn--primary">
                {isNew ? "Crear" : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export { Teacherform };
