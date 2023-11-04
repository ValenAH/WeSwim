import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";

const CustomerForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiCustomer = "http://localhost:9009/api/CustomerAPI";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    documentTypeId: 0,
    documentNumber: "",
    address: "",
    phone: "",
    userId: 0,
    paymentPlanId: 0,
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
              <label>Name</label>
              <input
                placeholder="Ingrese un nombre"
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>email</label>
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
              <label>Phone</label>
              <input
                placeholder="Ingrese un numero de celular"
                type="number"
                name="phone"
                value={formState.phone}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>user id</label>
              <input
                placeholder="Ingrese un usuario"
                type="number"
                name="userId"
                value={formState.userId}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Payment Plan Id</label>
              <input
                placeholder="Ingrese un plan de pago"
                type="number"
                name="paymentPlanId"
                value={formState.paymentPlanId}
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
