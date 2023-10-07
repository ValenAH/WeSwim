import React from "react";
import './profile.scss';
import {BiSolidUserCircle} from "react-icons/bi";

const Profile = () =>{

    return (
        <div className="profile-page my-5 mx-auto d-flex justify-content-center align-items-center rounded p-3">
                <div className="left-container text-center p-3">
                    <div>
                        <BiSolidUserCircle className="profile__icon rounded"></BiSolidUserCircle>
                        <h2 className="my-3"> Valentina Alzate Hincapié</h2>
                        <h5>24 años</h5>
                    </div>
                    <div className="d-flex justify-content-between mt-5 gap-2">                        
                        <div>
                            <h1>21</h1>
                            <p>Clases mensuales</p>
                        </div>
                        <div>
                            <h1>15</h1>
                            <p>Reposiciones</p>
                        </div>
                        <div>
                            <h1>21</h1>
                            <p>Estudiantes asignados</p>
                        </div>
                    </div>
                </div>
                <div className="right-container p-5">
                    <div className="d-flex justify-content-between ">
                        <h2>Información Básica</h2>
                        <div className="d-flex align-items-center gap-2">
                            <button className="btn__light m-0">Guardar</button>
                            <button className="btn m-0">Cancelar</button>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col-lg-12 form-group">
                            <label>Nombre completo</label>
                            <input></input>
                        </div>
                        <div className="col-lg-12 form-group">
                            <label>Dirección</label>
                            <input></input>
                        </div>
                    </div>
                    <div className="row">                     
                        <div className="col-lg-6 form-group">
                            <label>Teléfono</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Dirección</label>
                            <input></input>
                        </div>
                    </div>
                    <div className="row">                     
                        <div className="col-lg-6 form-group">
                            <label>Cuenta Bancaria</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Tipo de cuenta</label>
                            <select>
                                <option>Ahorros</option>
                                <option>Corriente</option>
                            </select>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Profile;