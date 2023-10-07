import React, { useRef, useState, useEffect } from "react";
import './register-teacher.scss';
import logo from "../../../assets/images/logo-maqua.svg";

const RegisterTeacher = () =>{

    return (
        <section className="register-page d-flex">
            <div className="left-container">
                <h3 className="welcome text-center">BIENVENIDO A MAQUA</h3>
            </div>
            <div className="right-container m-5">
                <div className="d-flex justify-content-around align-items-center">
                    <img src={logo}></img>
                    <div className="d-flex flex-column">
                        <buton className="btn">Registrar profesor</buton>
                        <button className="btn__light">Registrar cliente</button>
                    </div>
                </div>
                <h2>Crear cuenta de profesor</h2>
                <form>
                    <div className="row">
                        <div className="col-lg-6 form-group">
                            <label>Nombre completo</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Cédula</label>
                            <input></input>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default RegisterTeacher;