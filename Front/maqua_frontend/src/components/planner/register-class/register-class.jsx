import React from "react";
import {AiFillPlusCircle} from 'react-icons/ai';
import './register-class.scss';

const RegisterClass = () => {
    return (
        <div className="modal-container d-flex justify-content-center align-items-center">
            <div className="register-container p-5 rounded">
                <h2>REGISTRAR CLASE</h2>
                <hr/>
                <form>
                  <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Selecciona un estudiante</label>
                        <select>
                            <option selected hidden>Buscar</option>
                            <option>Roberto</option>
                            <option>Natalia</option>
                        </select>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center my-md-2">
                        <AiFillPlusCircle/>
                        <span>Agregar estudiante</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 form-group">
                        <label>Fecha inicial</label>
                        <input type="date"/>
                    </div>
                    <div className="col-lg-6 form-group">
                        <label>Veces por semana</label>
                        <input type="number"/>
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn ">Registrar</button>
                  </div>
                </form>

            </div>
        </div>
    )
}

export {RegisterClass};