import React, { useState, useEffect } from "react";

const EditCustomerForm = (props) => {
  const [customer, setCustomer] = useState(props.currentCustomer);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  useEffect(() => {
    setCustomer(props.currentCustomer);
  }, [props]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateCustomer(customer.id, customer);
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
        name="paymentplantid"
        value={customer.paymentPlanId}
        onChange={handleInputChange}
      />

      <button>Update Customer</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditCustomerForm;
