import React, { useRef, useState, useEffect } from "react";
import "./register-student.scss";
import logo from "../../../assets/images/logo-maqua.svg";

const RegisterStudent = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    rolId: 0,
  });
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    documentTypeId: "",
    documentNumber: "",
    address: "",
    phone: "",
    paymentPlanId: "",
  });

  const handleUserChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCustomerChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar una solicitud POST al servidor Spring Boot para guardar los datos
      const response = await fetch("/api/registerCustomer/saveRegister", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userData, customer: customerData }),
      });

      if (response.ok) {
        // Manejar la respuesta exitosa
      } else {
        // Manejar errores si es necesario
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="registration-page d-flex">
      <div className="left-container p-5">
        <h3 className="welcome text-center">BIENVENIDO A MAQUA</h3>
      </div>
      <div className="right-container m-3 px-5">
        <div className="d-flex justify-content-between align-items-center">
          <img src={logo}></img>
          <div className="d-flex flex-column">
            <button className="btn">Registrarse como Profesor</button>
            <button className="btn__light">Registrarse como Estudiante</button>
          </div>
        </div>
        <h1>Crear cuenta de estudiante</h1>
        <form onSubmit={handleSubmit}>
          <div className="row my-3">
            <div className="col-lg-6 form-group">
              <label>Nombre completo</label>
              <input
                placeholder="Ingrese un nombre"
                type="text"
                name="name"
                onChange={handleCustomerChange}
              ></input>
            </div>
            <div className="col-lg-6 form-group">
              <label>Cédula</label>
              <input
                placeholder="Ingrese un numero de documento"
                type="number"
                name="documentNumber"
                onChange={handleCustomerChange}
              ></input>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-lg-6 form-group">
              <label>Correo</label>
              <input
                placeholder="Ingrese un correo"
                type="text"
                name="email"
                onChange={handleCustomerChange}
              ></input>
            </div>
            <div className="col-lg-6 form-group">
              <label>Teléfono</label>
              <input
                placeholder="Ingrese un numero de celular"
                type="number"
                name="phone"
                onChange={handleCustomerChange}
              ></input>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-lg-6 form-group">
              <label>Dirección</label>
              <input
                placeholder="Ingrese una dirección"
                type="text"
                name="address"
                onChange={handleCustomerChange}
              ></input>
            </div>
            <div className="col-lg-6 form-group">
              <label>Sube una foto de perfil (Opcional)</label>
              <input type="file"></input>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-lg-6 form-group">
              <label>Contraseña</label>
              <input
              placeholder="Ingrese una Contraseña"
              type="password"
              name="password"
              onChange={handleUserChange}
            ></input>
            </div>
            <div className="col-lg-6 form-group">
              <label>Confirmar Contraseña</label>
              <input
              placeholder="Confirme la Contraseña"
              type="password"
              name="password"
              onChange={handleUserChange}
            ></input>
            </div>
          </div>
          <div className="my-5 text-center">
            <div>
              <input className="m-2" type="checkbox"></input>
              <label>Acepto términos y condiciones</label>
            </div>
            <button className="btn__light mt-5">Crear cuenta</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterStudent;
