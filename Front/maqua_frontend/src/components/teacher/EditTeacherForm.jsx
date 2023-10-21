import React, { useState, useEffect } from "react";

const EditTeacherForm = (props) => {
  const [teacher, setTeacher] = useState(props.currentTeacher);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTeacher({ ...teacher, [name]: value });
  };

  useEffect(() => {
    setTeacher(props.currentTeacher);
  }, [props]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateTeacher(teacher.id, teacher);
      }}
    >
      <label>Name</label>
      <input
        type="text"
        name="name"
        value={teacher.name}
        onChange={handleInputChange}
      />
      
      <label>email</label>
      <input
        type="text"
        name="email"
        value={teacher.email}
        onChange={handleInputChange}
      />

<label>Document Type id</label>
      <input
        type="number"
        name="documentTypeid"
        value={teacher.documentTypeid}
        onChange={handleInputChange}
      />

<label>Document Number</label>
      <input
        type="number"
        name="documentNumber"
        value={teacher.documentNumber}
        onChange={handleInputChange}
      />
      
      <label>Phone</label>
      <input
        type="number"
        name="phone"
        value={teacher.phone}
        onChange={handleInputChange}
      />

<label>Bank id</label>
      <input
        type="number"
        name="bankid"
        value={teacher.bankid}
        onChange={handleInputChange}
      />

<label>Account Type </label>
      <input
        type="text"
        name="accountType"
        value={teacher.accountType}
        onChange={handleInputChange}
      />
      <label>Account Number</label>
      <input
        type="number"
        name="accountNumber"
        value={teacher.accountNumber}
        onChange={handleInputChange}
      />
      <label>Contraseña</label>
      <input
        type="text"
        name="password"
        value={teacher.password}
        onChange={handleInputChange}
      />

      <button>Update Teacher</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditTeacherForm;
