import React, { useState } from "react";
import './Planner.scss';
import {BiSolidUserCircle} from "react-icons/bi";
import { BsFillCalendarCheckFill } from "react-icons/bs"
import { Calendar } from "./calendar/calendar";
import { RegisterClass } from "./register-class/register-class";

const Planner = () => {
    const [openRegisterModal, setOpenRegisterModal] = useState(false);

    const registerClass = () => { 
        setOpenRegisterModal(true)
    }
    const closeRegisterModal= (event) => {
        setOpenRegisterModal(event)
    }

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
                    <h3 className="text-center"><BsFillCalendarCheckFill className="m-3"/>Selecciona una fecha y hora </h3>
                    <div className="row justify-content-center">
                        <button className="btn col-lg-4" onClick={registerClass}>Registrar clase</button>
                        {openRegisterModal && <RegisterClass isOpen={openRegisterModal} closeModal={closeRegisterModal}/>}
                    </div>
                    <div className="mt-3">
                        <Calendar/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Planner;