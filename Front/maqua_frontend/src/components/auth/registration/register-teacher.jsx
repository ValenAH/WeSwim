import React, { useRef, useState, useEffect } from "react";
import './register-teacher.scss';
import logo from "../../../assets/images/logo-maqua.svg";

const RegisterTeacher = () =>{

    return (
        <section className="register-page d-flex">
            <div className="left-container p-5">
                <h3 className="welcome text-center">BIENVENIDO A MAQUA</h3>
            </div>
            <div className="right-container m-3 px-5">
                <div className="d-flex justify-content-between align-items-center">
                    <img src={logo}></img>
                    <div className="d-flex flex-column">
                        <buton className="btn">Registrarse como profesor</buton>
                        <button className="btn__light">Registrarse como estudiante</button>
                    </div>
                </div>
                <h2>Crear cuenta de profesor</h2>
                <form>
                    <div className="row my-3">
                        <div className="col-lg-6 form-group">
                            <label>Nombre completo</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Correo</label>
                            <input type="email"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Tipo de documento</label>
                            <select id="opciones">
                                <option value="1">CC</option>
                                <option value="2">TI</option>
                                <option value="3">Pasaporte</option>
                            </select>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Numero de documento</label>
                            <input ></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Banco</label>
                            <select id="opciones">
                                <option value="1">Bancolombia</option>
                                <option value="2">Davivienda</option>
                                <option value="3">BBVA</option>
                            </select>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Tipo de cuenta</label>
                            <select id="opciones">
                                <option value="1">Ahorros</option>
                                <option value="2">Corriente</option>
                            </select>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Numero de cuenta</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Telefono</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Contraseña</label>
                            <input type="password"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Confirmar Contraseña</label>
                            <input type="password"></input>
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
                        <button className="btn__light mt-5">Crear cuenta</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default RegisterTeacher;