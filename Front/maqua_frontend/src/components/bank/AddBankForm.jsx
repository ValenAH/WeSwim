import React, { useState } from "react";

const AddBankForm = (props) => {
  const initialFormState = { id: null, nameBank: "", contactEmail: "", location: "", typeAccount: "" };
  const [bank, setBank] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBank({ ...bank, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!bank.nameBank || !bank.contactEmail || !bank.location || !bank.typeAccount) return;
        props.addBank(bank);
        setBank(initialFormState);
      }}
      className="form-row"
    >
      <div className="row">
        <div className="form-group col-md-6 mb-3">
            <label htmlFor="nameBank">Bank Name</label>
            <input
            type="text"
            name="nameBank"
            value={bank.nameBank}
            onChange={handleInputChange}
            className="form-control"
            required
            />
        </div>
        <div className="form-group col-md-6 mb-3">
            <label htmlFor="email">Contact Email</label>
            <input
            type="email"
            name="contactEmail"
            value={bank.contactEmail}
            onChange={handleInputChange}
            className="form-control"
            required
            />
        </div>
        <div className="form-group col-md-6 mb-3">
            <label htmlFor="location">Location</label>
            <input
            type="text"
            name="location"
            value={bank.location}
            onChange={handleInputChange}
            className="form-control"
            required
            />
        </div>
        <div className="form-group col-md-6 mb-3">
            <label htmlFor="typeAccount">Account Type</label>
            <input
            type="text"
            name="typeAccount"
            value={bank.typeAccount}
            onChange={handleInputChange}
            className="form-control"
            required
            />
        </div>
      </div>
      <div className="form-group col-12">
        <button type="submit" className="btn btn-primary">
          Add New Bank
        </button>
      </div>
    </form>
  );
};

export default AddBankForm;
