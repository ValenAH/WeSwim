import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";
import { environment } from "../../environments/environment";

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
  }, [])

  const handlesubmit = async (e) => {
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

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="form position-relative m-5">
        <div className="form__close position-absolute">
          <IoIosCloseCircle
            className="icon"
            onClick={() => navigate("/customer")}
          />
        </div>
        <h5 className="text-center">
          {id === "new" ? "Crear" : "Actualizar"} Cliente
        </h5>
        <form className="mt-3">
          <div className="row">
            <div className="form-group col-md-6 mb-3">
              <label>Nombre</label>
              <input
                placeholder="Ingrese el nombre"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Apellido</label>
              <input
                placeholder="Ingrese el apellido"
                type="text"
                name="lastname"
                value={formState.lastname}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Correo</label>
              <input
                placeholder="Ingrese un correo"
                type="text"
                name="email"
                value={formState.email}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Document Type id</label>

              <select
                name="documentTypeId"
                value={formState.documentTypeId}
                onChange={handleChangeCustomer}
              >
                <option value={0} hidden>
                  Selecciona un tipo de documento
                </option>
                <option value={1}>Cedula</option>
                <option value={2}>Trajeta de Identidad</option>
                <option value={3}>Cedula de Extranjeria</option>
              </select>
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Document Number</label>
              <input
                placeholder="Ingrese un numero de documento"
                type="number"
                name="documentNumber"
                value={formState.documentNumber}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Address</label>
              <input
                placeholder="Ingrese una dirección"
                type="text"
                name="address"
                value={formState.address}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Teléfono</label>
              <input
                placeholder="Ingrese un número de celular"
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleChangeCustomer}
              />
            </div>
          </div>

          <div className="form-group col-12">
            <button className="btn" onClick={handlesubmit}>
              {id === "new" ? "Crear" : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export {CustomerForm} ;
