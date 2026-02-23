import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { environment } from "../../environments/environment";
import "./CustomerForm.scss";

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = (environment.API_BACKEND || "http://localhost:9009/api/").replace(/\/?$/, "");
  const apiCustomer = `${baseUrl}/CustomerAPI`;
  const [formState, setFormState] = useState({
    name: "",
    lastname: "",
    email: "",
    documentTypeId: "",
    documentNumber: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (id === "new") return;
    const fetchCustomer = async () => {
      await axios
        .get(`${apiCustomer}/getCustomerById?id=${id}`)
        .then((response) => {
          setFormState(response.data);
        })
        .catch((err) => console.log(err));
    };
    fetchCustomer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id === "new") {
      await axios
        .post(apiCustomer + "/addnewcustomer", formState)
        .catch((err) => console.log(err));
      return navigate("/customer");
    } else {
      let data = { id: id, ...formState };
      await axios
        .post(apiCustomer + "/updatecustomer", data)
        .then((response) => {
          setFormState(response);
        })
        .catch((err) => console.log(err));
      return navigate("/customer");
    }
  };

  const handleChangeCustomer = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const isNew = id === "new";
  const formTitle = isNew ? "Crear cliente" : "Editar cliente";

  return (
    <section className="customer-form">
      <div className="customer-form__container container">
        <div className="customer-form__header">
          <button
            type="button"
            className="customer-form__back"
            onClick={() => navigate("/customer")}
            title="Volver al listado"
          >
            <IoIosArrowBack />
            Volver
          </button>
        </div>
        <div className="customer-form__card">
          <h2 className="customer-form__title">{formTitle}</h2>
          <form className="customer-form__form" onSubmit={handleSubmit}>
            <div className="customer-form__grid">
              <div className="customer-form__field">
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  placeholder="Ingrese el nombre"
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChangeCustomer}
                />
              </div>
              <div className="customer-form__field">
                <label htmlFor="lastname">Apellido</label>
                <input
                  id="lastname"
                  placeholder="Ingrese el apellido"
                  type="text"
                  name="lastname"
                  value={formState.lastname}
                  onChange={handleChangeCustomer}
                />
              </div>
              <div className="customer-form__field">
                <label htmlFor="email">Correo</label>
                <input
                  id="email"
                  placeholder="Ingrese un correo"
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChangeCustomer}
                />
              </div>
              <div className="customer-form__field">
                <label htmlFor="documentTypeId">Tipo de documento</label>
                <select
                  id="documentTypeId"
                  name="documentTypeId"
                  value={formState.documentTypeId}
                  onChange={handleChangeCustomer}
                >
                  <option value={0} hidden>
                    Selecciona un tipo de documento
                  </option>
                  <option value={1}>Cédula</option>
                  <option value={2}>Tarjeta de identidad</option>
                  <option value={3}>Cédula de extranjería</option>
                </select>
              </div>
              <div className="customer-form__field">
                <label htmlFor="documentNumber">Nº documento</label>
                <input
                  id="documentNumber"
                  placeholder="Ingrese un número de documento"
                  type="number"
                  name="documentNumber"
                  value={formState.documentNumber}
                  onChange={handleChangeCustomer}
                />
              </div>
              <div className="customer-form__field">
                <label htmlFor="address">Dirección</label>
                <input
                  id="address"
                  placeholder="Ingrese una dirección"
                  type="text"
                  name="address"
                  value={formState.address}
                  onChange={handleChangeCustomer}
                />
              </div>
              <div className="customer-form__field customer-form__field--full">
                <label htmlFor="phone">Teléfono</label>
                <input
                  id="phone"
                  placeholder="Ingrese un número de celular"
                  type="tel"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChangeCustomer}
                />
              </div>
            </div>
            <div className="customer-form__actions">
              <button type="button" className="customer-form__btn customer-form__btn--secondary" onClick={() => navigate("/customer")}>
                Cancelar
              </button>
              <button type="submit" className="customer-form__btn customer-form__btn--primary">
                {isNew ? "Crear" : "Actualizar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export { CustomerForm };
