import React, { useRef, useState, useEffect } from "react";
import Modal from 'react-modal';
import './register-teacher.scss';
import logo from "../../../assets/images/logo-maqua.svg";
import axios from 'axios';
import { Gallery } from "./gallery/gallery";

const RegisterTeacher = () =>{
    const apiTeachers = "http://localhost:9009/api/teacherCustomAPI";
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        documentTypeid:0,
        documentNumber: "",
        phone:"",
        userid:1,
        bankid:0,
        accountType: "",
        accountNumber: "",
        password:""
    })
    const [isModalOpen, setIsModalOpen] = useState(false);

            const openModal = () => {
                setIsModalOpen(true);
            }
            const closeModal = () => {
                setIsModalOpen(false);
                window.location.href = 'http://localhost:8080'; 
              }
            const [passwordConfirmation, setPasswordConfirmation] = useState("");
            const [error, setError] = useState("");


    const handlesubmit = async (e) => {
        e.preventDefault();
        if (formState.password !== passwordConfirmation) {
            console.log("Las contraseñas no coinciden");
            setError("Las contraseñas no coinciden");
            return;
          }
        try {
          const response = await axios.post(apiTeachers + "/addnewteacher", formState);
          console.log(response.data);
          openModal();
          setFormState({
            name: "",
            email: "",
            documentTypeid: 0,
            documentNumber: "",
            phone: "",
            userid: 1,
            bankid: 0,
            accountType: "",
            accountNumber: "",
            password: ""
          });
        } catch (err) {
          console.log(err);
        }
      };
    const handleChangeTeacher = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const handleChangePasswordConfirmation = (e) => {
        setPasswordConfirmation(e.target.value);
    }

    return (
        <section className="register-page d-flex">
            <div className="left-container p-5">
                <h3 className="welcome text-center">BIENVENIDO A MAQUA</h3>
                <div>
                    <Gallery/>
                </div>
            </div>
            <div className="right-container m-3 px-5">
                <div className="d-flex justify-content-between align-items-center">
                    <img src={logo}></img>
                </div>
                <h2>Crear cuenta de profesor</h2>
                <form>
                    <div className="row my-3">
                        <div className="col-lg-6 form-group">
                            <label>Nombre completo</label>
                            <input name='name' type='text' value={formState.name}  onChange={handleChangeTeacher}/>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Correo</label>
                            <input name='email' type='email' value={formState.email}  onChange={handleChangeTeacher}/>
                        </div>
                        <div className="col-lg-6 form-group">
                        <label htmlFor='documentTypeid'>Tipo de documento</label>
                        <select name='documentTypeid' value={formState.documentTypeid} placeholder='Elige un Tipo de Documento' onChange={handleChangeTeacher}>
                            <option value={0} disabled hidden>Selecciona un tipo de Documento</option>
                            <option value={1}>Cedula</option>
                            <option value={2}>Tarjeta de Identidad</option>
                            <option value={3}>Pasaporte</option>
                        </select>
                        </div>
                        <div className="col-lg-6 form-group">
                        <label htmlFor='documentNumber'>No. Documento</label>
                        <input name='documentNumber' type='text' value={formState.documentNumber}  onChange={handleChangeTeacher}/>
                        </div>
                        <div className="col-lg-6 form-group">
                        <label htmlFor='bankid'>Banco</label>
                        <select name='bankid' value={formState.bankid} placeholder='Elige un Banco' onChange={handleChangeTeacher}>
                            <option value={0} disabled hidden>Selecciona un Banco</option>
                            <option value={1}>Bancolombia</option>
                            <option value={2}>BBVA</option>
                            <option value={3}>Davivienda</option>
                        </select>
                        </div>
                        <div className="col-lg-6 form-group">
                        <label htmlFor='accountType'>Tipo de cuenta</label>
                        <select name='accountType' value={formState.accountType} placeholder='Elige un Tipo de Cuenta' onChange={handleChangeTeacher}>
                                <option value="" disabled hidden>Selecciona un Tipo de Cuenta</option>
                                <option value="Ahorros">Ahorros</option>
                                <option value="Corriente">Corriente</option>
                        </select>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label htmlFor='accountNumber'>No. de Cuenta</label>
                            <input name='accountNumber' type='text' value={formState.accountNumber}  onChange={handleChangeTeacher}/>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label htmlFor='phone'>Telefono</label>
                            <input name='phone' type='text' value={formState.phone}  onChange={handleChangeTeacher}/>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label htmlFor='password'>Contraseña</label>
                            <input type="password" name='password' value={formState.password} onChange={handleChangeTeacher}/>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Confirmar Contraseña</label>
                            <input type="password" name="passwordConfirmation"
                                value={passwordConfirmation}
                                onChange={handleChangePasswordConfirmation}>
                            </input>
                        </div>
                        <div>
                        {error && <p className="error-message">{error}</p>}
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Sube una foto de perfil (Opcional)</label>
                            <input type="file"></input>
                        </div>
                    </div>
                    <div className="my-5 text-center">
                    <div>
                <input className="m-2" type="checkbox"></input>
                    <label>Acepto términos y condiciones</label>
                    </div>
                          <button type="submit" className="btn__light mt-5" onClick={handlesubmit}>
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
    )
}

export default RegisterTeacher;