import React, { useState } from "react";

const AddTeacherForm = (props) => {

const initialFormState = { id: null, name: "", email: "",documentTypeid:0,documentNumber: "",
                    phone:"",userid:1,bankid:0, accountType: "",accountNumber: "",password:""};
const [teacher, setTeacher] = useState(initialFormState);

const handleInputChange = (event) => {
  const { name, value } = event.target;
        //console.log(event);
  setTeacher({ ...teacher, [name]: value });
};

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!teacher.name || !teacher.email || !teacher.documentTypeid || !teacher.documentNumber
            || !teacher.phone || !teacher.userid || !teacher.bankid || !teacher.accountType 
            || !teacher.accountNumber || !teacher.password )
          return;

        props.addTeacher(teacher);
        setTeacher(initialFormState);
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
      <label>Contraseña </label>
      <input
        type="password"
        name="password"
        value={teacher.password}
        onChange={handleInputChange}
      />
    

      <button className="btn">Add new Teacher</button>
    </form>
  );
};
export default AddTeacherForm;
