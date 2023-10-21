import React, { useState } from "react";

const AddCustomerForm = (props) => {
  const initialFormState = {
    id: null,
    name: "",
    email: "",
    documentTypeId: 0,
    documentNumber: "",
    address: "",
    phone: "",
    userid: 0,
    paymentPlanId: 0,
  };
  const [customer, setCustomer] = useState(initialFormState);

  const handleInputChange = (event) => {
    
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };


  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (
          !customer.name ||
          !customer.email ||
          !customer.documentTypeId ||
          !customer.documentNumber ||
          !customer.address ||
          !customer.phone ||
          !customer.userid ||
          !customer.paymentPlanId
        )
          return;

        props.addCustomer(customer);
        setCustomer(initialFormState);
      }}
      className="form-row"
    >
      <div className="row">
        <div className="form-group col-md-6 mb-3">
          <label>Name</label>
          <input placeholder="Ingrese un nombre"
            type="text"
            name="name"
            value={customer.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6 mb-3">
          <label>email</label>
          <input placeholder="Ingrese un correo"
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
            <option value={0} hidden>Selecciona un tipo de documento</option>
            <option value={1}>Cedula</option>
            <option value={2}>Trajeta de Identidad</option>
            <option value={3}>Cedula de Extranjeria</option>
            
          </select>
        </div>
        <div className="form-group col-md-6 mb-3">
          <label>Document Number</label>
          <input placeholder="Ingrese un numero de documento"
            type="number"
            name="documentNumber"
            value={customer.documentNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6 mb-3">
          <label>Address</label>
          <input placeholder="Ingrese una dirección"
            type="text"
            name="address"
            value={customer.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6 mb-3">
          <label>Phone</label>
          <input placeholder="Ingrese un numero de celular"
            type="number"
            name="phone"
            value={customer.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6 mb-3">
          <label>user id</label>
          <input placeholder="Ingrese un usuario"
            type="number"
            name="userid"
            value={customer.userid}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group col-md-6 mb-3">
          <label>Payment Plan Id</label>
          <input placeholder="Ingrese un plan de pago"
            type="number"
            name="paymentPlanId"
            value={customer.paymentPlanId}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group col-12">
        <button className="btn">Add new customer</button>
      </div>
    </form>
  );
};
export default AddCustomerForm;
