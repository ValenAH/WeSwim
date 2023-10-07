import React, { useState } from "react";

const AddCustomerForm = (props) => {

const initialFormState = { id: null, name: "", email: "",documentTypeid:0,documentNumber: ""
                    ,address:"",phone:"",userid:0,paymentPlanId:0};
const [customer, setCustomer] = useState(initialFormState);

const handleInputChange = (event) => {
  const { name, value } = event.target;
        //console.log(event);
  setCustomer({ ...customer, [name]: value });
};

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (
          !customer.name ||
          !customer.email ||
          !customer.documentTypeid ||
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
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={customer.name}
        onChange={handleInputChange}
      />

      <label>email</label>
      <input
        type="text"
        name="email"
        value={customer.email}
        onChange={handleInputChange}
      />

      <label>Document Type id</label>
      <input
        type="number"
        name="documentTypeid"
        value={customer.documentTypeid}
        onChange={handleInputChange}
      />

      <label>Document Number</label>
      <input
        type="number"
        name="documentNumber"
        value={customer.documentNumber}
        onChange={handleInputChange}
      />

      <label>Address</label>
      <input
        type="text"
        name="address"
        value={customer.address}
        onChange={handleInputChange}
      />

      <label>Phone</label>
      <input
        type="number"
        name="phone"
        value={customer.phone}
        onChange={handleInputChange}
      />

      <label>user id</label>
      <input
        type="number"
        name="userid"
        value={customer.userid}
        onChange={handleInputChange}
      />

      <label>Payment Plan Id</label>
      <input
        type="number"
        name="paymentPlanId"
        value={customer.paymentPlanId}
        onChange={handleInputChange}
      />

      <button>Add new customer</button>
    </form>
  );
};
export default AddCustomerForm;
