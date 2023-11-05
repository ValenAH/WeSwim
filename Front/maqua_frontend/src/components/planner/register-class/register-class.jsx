import React, { useState } from "react";
import {AiFillPlusCircle} from 'react-icons/ai';
import './register-class.scss';
import {IoIosCloseCircle} from 'react-icons/io';
import {BiSolidUserMinus} from 'react-icons/bi';

const RegisterClass = ({closeModal}) => {
    const [students, setStudent] = useState([{customerId: ""}])

    const addStudentField = ()=> {
        setStudent([...students,{customerId: ""} ])
    }

    const deleteStudentField = (i) => {
        if(students.length != 1){
            const data = [...students];
            data.splice(i,1);
            setStudent(data);
        }
    }

    const closeForm = () => {
        closeModal(false)
    }
    return (
        <div className="modal-container d-flex justify-content-center align-items-center">
            <div className="register-container p-5 rounded ">
                <div className="position-relative">
                    <h2 className="m-0">REGISTRAR CLASE</h2>
                    <div className='register-container__close position-absolute'>
                        <IoIosCloseCircle className='icon' onClick={closeForm}/>
                    </div>
                </div>
                <hr/>
                <form>
                  <div className="row">
                    <div className="col-lg-7">
                        {
                            students.map((student,index)=> {
                                return (
                                <div className="d-flex align-items-center">
                                    <div className="form-group studentField" key={index}>
                                        <label>Selecciona un estudiante</label>
                                        <select value={student.customerId}>
                                            <option value={0} selected hidden>Buscar</option>
                                            <option value={1}>Roberto</option>
                                            <option value={2}>Natalia</option>
                                        </select>
                                    </div>
                                    <div className="icon-container text-center">
                                        <BiSolidUserMinus className="icon-container__minusIcon" onClick={deleteStudentField}/>
                                    </div>
                                </div>
                                )
                            })
                        }
                    </div>
                    <div className="col-lg-5 d-flex align-items-start my-md-2" onClick={addStudentField}>
                        <div className="btn__light d-flex align-items-center text-nowrap">
                            <AiFillPlusCircle/>
                            <span>Agregar estudiante</span>
                        </div>
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                    <span>Días de clase</span>
                    <div className="col-lg-12">
                    <div className="row days-container rounded mx-1 p-2">
                        <div className="col-lg-3 d-flex  gap-1">
                            <input type="checkbox"/>
                            <label>Lunes</label>
                        </div>
                        <div className="col-lg-3 d-flex gap-1">
                            <input type="checkbox"/>
                            <label>Martes</label>
                        </div>
                        <div className="col-lg-3 d-flex gap-1">
                            <input type="checkbox"/>
                            <label>Miercoles</label>
                        </div>
                        <div className="col-lg-3 d-flex gap-1">
                            <input type="checkbox"/>
                            <label>Jueves</label>
                        </div>
                        <div className="col-lg-3 d-flex gap-1">
                            <input type="checkbox"/>
                            <label>Viernes</label>
                        </div>
                        <div className="col-lg-3 d-flex gap-1">
                            <input type="checkbox"/>
                            <label>Sábado</label>
                        </div>
                        <div className="col-lg-3 d-flex gap-1">
                            <input type="checkbox"/>
                            <label>Domingo</label>
                        </div>
                    </div>
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