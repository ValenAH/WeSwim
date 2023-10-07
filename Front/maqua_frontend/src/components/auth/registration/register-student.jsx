import React, { useRef, useState, useEffect } from "react";
import "./register-student.scss";
import logo from "../../../assets/images/logo-maqua.svg";

const RegisterStudent = () =>{

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
                <form>
                    <div className="row my-3">
                        <div className="col-lg-6 form-group">
                            <label>Nombre completo</label>
                            <input type="text"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Cédula</label>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-lg-6 form-group">
                            <label>Correo</label>
                            <input type="text"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Teléfono</label>
                            <input type="text"></input>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-lg-6 form-group">
                            <label>Dirección</label>
                            <input type="text"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Sube una foto de perfil (Opcional)</label>
                            <input type="file"></input>
                        </div>
                    </div>
                    <div className="row my-3">
                        <div className="col-lg-6 form-group">
                            <label>Contraseña</label>
                            <input type="text"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Confirmar Contraseña</label>
                            <input type="text"></input>
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

export default RegisterStudent;