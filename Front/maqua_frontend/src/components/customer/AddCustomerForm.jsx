import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import axios from "axios";

const AddCustomerForm = (props) => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const initialFormState = {
    id: null,
    name: "",
    email: "",
    documentTypeId: 0,
    documentNumber: "",
    address: "",
    phone: "",
    userId: 0,
    paymentPlanId: 0,
  };
  const [customer, setCustomer] = useState(initialFormState);
  const [loading, setShowLoading] = useState(false);

  const handleInputChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (id === "new") return;

    const fetchCustomer = async () => {
      await axios
        .get(`${apiUrl}/getCustomerById?id=${id}`)
        .then((response) => {
          setCustomer(response.data);
        })
        .catch((err) => console.log(err));
    };
    fetchCustomer();
  }, []);



  const addCustomer = () => {
    setShowLoading(true);
    axios
      .post("http://localhost:9009/api/CustomerAPI/addnewcustomer", customer)

      .catch((error) => console.log(error));
    return navigate("/customer");
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
        <form className="mt-3" onSubmit={handleInputChange}>
          <div className="row">
            <div className="form-group col-md-6 mb-3">
              <label>Name</label>
              <input
                placeholder="Ingrese un nombre"
                type="text"
                name="name"
                value={customer.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>email</label>
              <input
                placeholder="Ingrese un correo"
                type="text"
                name="email"
                value={customer.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Document Type id</label>

              <select
                name="documentTypeId"
                value={customer.documentTypeId}
                onChange={handleInputChange}
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
                value={customer.documentNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Address</label>
              <input
                placeholder="Ingrese una dirección"
                type="text"
                name="address"
                value={customer.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Phone</label>
              <input
                placeholder="Ingrese un numero de celular"
                type="number"
                name="phone"
                value={customer.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>user id</label>
              <input
                placeholder="Ingrese un usuario"
                type="number"
                name="userId"
                value={customer.userId}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group col-md-6 mb-3">
              <label>Payment Plan Id</label>
              <input
                placeholder="Ingrese un plan de pago"
                type="number"
                name="paymentPlanId"
                value={customer.paymentPlanId}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group col-12">
            <button className="btn" onClick={addCustomer}>
              Add new customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCustomerForm;
