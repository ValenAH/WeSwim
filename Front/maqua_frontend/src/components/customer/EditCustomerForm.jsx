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
      <div className="row">
      <div className="form-group col-md-6 mb-3">
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={customer.name}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-group col-md-6 mb-3">
      <label>email</label>
      <input
        type="text"
        name="email"
        value={customer.email}
        onChange={handleInputChange}
      />
        </div>
        <div className="form-group col-md-6 mb-3">
      <label>Document Type id</label>
      <input
        type="number"
        name="documentTypeId"
        value={customer.documentTypeId}
        onChange={handleInputChange}
      />
</div>
<div className="form-group col-md-6 mb-3">
      <label>Document Number</label>
      <input
        type="number"
        name="documentNumber"
        value={customer.documentNumber}
        onChange={handleInputChange}
      />
</div>
<div className="form-group col-md-6 mb-3">
      <label>Address</label>
      <input
        type="text"
        name="address"
        value={customer.address}
        onChange={handleInputChange}
      />
</div>
<div className="form-group col-md-6 mb-3">
      <label>Phone</label>
      <input
        type="number"
        name="phone"
        value={customer.phone}
        onChange={handleInputChange}
      />
</div>

<div className="form-group col-md-6 mb-3">
      <label>Payment Plan Id</label>
      <input
        type="number"
        name="paymentplantid"
        value={customer.paymentPlanId}
        onChange={handleInputChange}
      />
      </div>
</div>
<div className="form-group col-12">
      <button type="submit" className="btn btn-primary">Update Customer</button>
      <button type="submit" className="btn btn-primary"
        onClick={() => props.setEditing(false)}
      >
        Cancel
      </button>
      </div>
    </form>
  );
};

export default EditCustomerForm;
