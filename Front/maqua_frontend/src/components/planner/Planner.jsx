import React from "react";
import './Planner.scss';
import {BiSolidUserCircle} from "react-icons/bi";

const Planner = () => {


    return (
        <section className="planner py-5">
            <div className="container d-flex">
                <div className="w-50">
                    <h3>Hola Profesor, estás son las clases de hoy</h3>
                    <div className="d-flex gap-2">
                        <div className="d-flex flex-column justify-content-center">                           
                            <div>
                                <BiSolidUserCircle className="profile-icon"></BiSolidUserCircle>
                            </div>                           
                            <span>Kevin Ramírez</span>
                        </div>
                        <div className="d-flex flex-column justify-content-center">
                            <div>
                                <BiSolidUserCircle className="profile-icon"></BiSolidUserCircle>
                            </div>  
                            <span>Roberto</span>
                        </div>
                    </div>
                    <h2 className="my-1">Clase de natación Grupal</h2>
                </div>
                <div className="w-50">
                    <h3 className="text-center">Selecciona una fecha y hora</h3>
                    <div className="row justify-content-end">
                        <button className="btn col-3">Registrar clase</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Planner;