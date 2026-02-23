import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { environment } from "../../environments/environment";
import "./UserForm.scss";

export const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = (environment.API_BACKEND || "http://localhost:9009/api/").replace(/\/?$/, "");
  const apiUsers = `${baseUrl}/users`;

  const [formState, setFormState] = useState({
    user: "",
    password: "",
    roleId: 0,
  });

  useEffect(() => {
    if (id === "new") return;
    const fetchUser = async () => {
      await axios
        .get(`${apiUsers}/getUserById?id=${id}`)
        .then((response) => {
          setFormState(response.data);
        })
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, []);

  const handleChangeUser = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "new") {
      await axios.post(apiUsers + "/addUser", formState).catch((err) => console.log(err));
      return navigate("/user");
    } else {
      let data = { id: id, ...formState };
      await axios
        .post(apiUsers + "/updateUser", data)
        .then((res) => {
          setFormState(res);
        })
        .catch((err) => console.log(err));
      return navigate("/user");
    }
  };

  const isNew = id === "new";
  const formTitle = isNew ? "Crear usuario" : "Editar usuario";

  return (
    <section className="user-form">
      <div className="user-form__container container">
        <div className="user-form__header">
          <button
            type="button"
            className="user-form__back"
            onClick={() => navigate("/user")}
            title="Volver al listado"
          >
            <IoIosArrowBack />
            Volver
          </button>
        </div>
        <div className="user-form__card">
          <h2 className="user-form__title">{formTitle}</h2>
          <form className="user-form__form" onSubmit={handleSubmit}>
            <div className="user-form__grid">
              <div className="user-form__field">
                <label htmlFor="user">Nombre de usuario</label>
                <input
                  id="user"
                  name="user"
                  type="text"
                  value={formState.user}
                  placeholder="Usuario"
                  onChange={handleChangeUser}
                />
              </div>
              <div className="user-form__field">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  placeholder="Contraseña"
                  onChange={handleChangeUser}
                />
              </div>
              <div className="user-form__field user-form__field--full">
                <label htmlFor="roleId">Rol</label>
                <select
                  id="roleId"
                  name="roleId"
                  value={formState.roleId}
                  onChange={handleChangeUser}
                >
                  <option value={0} disabled hidden>
                    Selecciona un rol
                  </option>
                  <option value={1}>Administrador</option>
                  <option value={2}>Profesor</option>
                  <option value={3}>Estudiante</option>
                </select>
              </div>
            </div>
            <div className="user-form__actions">
              <button
                type="button"
                className="user-form__btn user-form__btn--secondary"
                onClick={() => navigate("/user")}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="user-form__btn user-form__btn--primary"
                disabled={formState.user === ""}
              >
                {isNew ? "Crear" : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
