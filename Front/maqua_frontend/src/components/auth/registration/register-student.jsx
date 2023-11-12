import React, { useRef, useState, useEffect } from "react";
import "./register-student.scss";
import { Modal } from "react-bootstrap";
import logo from "../../../assets/images/logo-maqua.svg";
import axios from "axios";
import { Gallery } from "./gallery/gallery";


const RegisterStudent = () => {
  const apiCustomer = "http://localhost:9009/api/CustomerAPI";
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    documentTypeId: "",
    documentNumber: "",
    address: "",
    phone: "",
    paymentPlanId: "",
    userid: 1,
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = "http://localhost:8080";
  };
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.password !== passwordConfirmation) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await axios.post(
        apiCustomer + "/addnewcustomer",
        formState
      );
      console.log(response.data);
      openModal();
      setFormState({
        name: "",
        email: "",
        documentTypeId: 0,
        documentNumber: "",
        address: "",
        phone: "",
        userid: 1,
        paymentPlanId: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeCustomer = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangePasswordConfirmation = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  return (
    <section className="registration-page d-flex">
      <div className="left-container p-5">
        <h3 className="welcome text-center">BIENVENIDO A MAQUA</h3>
      </div>
      <div className="right-container m-3 px-5">
        <div className="d-flex justify-content-between align-items-center">
          <img src={logo}></img>
        </div>
        <h1>Crear cuenta de estudiante</h1>
        <form>
          <div className="row my-3">
            <div className="col-lg-6 form-group">
              <label htmlFor="name">Nombre completo</label>
              <input id="name"
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="col-lg-6 form-group">
              <label htmlFor="email">Correo</label>
              <input id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="col-lg-6 form-group">
              <label htmlFor="documentTypeId">Tipo de documento</label>
              <select id="documentTypeid"
                name="documentTypeId"
                value={formState.documentTypeId}
                placeholder="Elige un Tipo de Documento"
                onChange={handleChangeCustomer}
              >
                <option value={0} disabled hidden>
                  Selecciona un tipo de Documento
                </option>
                <option value={1}>Cedula</option>
                <option value={2}>Tarjeta de Identidad</option>
                <option value={3}>Pasaporte</option>
              </select>
            </div>
            <div className="col-lg-6 form-group">
              <label htmlFor="documentNumber">No. Documento</label>
              <input id="documentNumber"
                name="documentNumber"
                type="text"
                value={formState.documentNumber}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="col-lg-6 form-group">
              <label  htmlFor='phone'>Teléfono</label>
              <input id="phone"
                name="phone"
                type="text"
                value={formState.phone}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="col-lg-6 form-group">
              <label htmlFor='address'>Dirección</label>
              <input id="address"
                name="address"
                type="text"
                value={formState.address}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="col-lg-6 form-group">
              <label htmlFor="profilepicture">Sube una foto de perfil (Opcional)</label>
              <input id="profilepicture" type="file"></input>
            </div>

            <div className="col-lg-6 form-group">
              <label htmlFor="password">Contraseña</label>
              <input id="password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChangeCustomer}
              />
            </div>
            <div className="col-lg-6 form-group">
              <label htmlFor="passwordConfirmation">Confirmar Contraseña</label>
              <input id="passwordConfirmation"
                type="password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={handleChangePasswordConfirmation}
              ></input>
            </div>

            <div>{error && <p className="error-message">{error}</p>}</div>
          </div>

          <div className="my-5 text-center">
            <div>
              <input className="m-2" type="checkbox"></input>
              <label onClick={handleShow}>Acepto términos y condiciones</label>
            </div>
            <button
              type="submit"
              className="btn__light mt-5"
              onClick={handleSubmit}
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Registro Exitoso"
        className="custom-modal d-flex justify-content-center"
      >
        <h2>Registro Exitoso</h2>
        <p>Tu registro ha sido completado con éxito y puedes iniciar sesión</p>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </section>
  );
};

export {RegisterStudent};
