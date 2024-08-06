import React, { useState, useEffect } from "react";
import { environment } from "../../../environments/environment";
import axios from 'axios';
import {AiFillPlusCircle} from 'react-icons/ai';
import './register-class.scss';
import {IoIosCloseCircle} from 'react-icons/io';
import {BiSolidUserMinus} from 'react-icons/bi';

const RegisterClass = ({closeModal}) => {
    const [days, setDays] = useState(['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])
    const [customers, setCustomer] = useState([]);
    const [students, setStudent] = useState([{customerId: ""}])
    const [paymentPlanId, setPaymentPlanId] = useState(0);
    const [plan, setPlan] = useState({paymentPlanId, date: new Date()});
    let periodicity = 0;

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(environment.API_BACKEND + "customers/getAllCustomers")
            .then(res => setCustomer(res.data.customerList))
            .catch(err => console.log(err));
        }
        fetchData();
    }, []);


    const handleStudentChange = (e) =>{
        console.log(e, students)
        //setStudent({...students, [e.target.name]: e.target.value})
    }

    const definePaymentPlan = async (e) => {
        e.preventDefault();
        await axios
            .get(environment.API_BACKEND + `paymentPlans/addNewPlan/definePaymentPlan?students=${students.length}&periodicity=${periodicity}`)
            .then(response => setPlan(response))
            .catch((err) => console.log(err));
        return plan
    }

    const handleDaysChange = (event) =>{
        if (event.target.checked){
            periodicity++;
        }else{
            periodicity--
        }
    }

    const registerClass = async () => {
        const plan = definePaymentPlan()
        await axios
            .post(environment.API_BACKEND + `plans/addPlan`, plan)
            .catch((err) => console.log(err));
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
                    <div className="col-lg-12">
                        <div className="row">
                        <div className="col-lg-7 d-flex align-items-start my-md-2">
                            <input type="text" className="container-border rounded p-2 w-100" placeholder="Buscar estudiante"/>
                        </div>
                        <div className="col-lg-5">
                            <div className="btn__light d-flex align-items-center text-nowrap mb-0">
                                <AiFillPlusCircle/>
                                <span>Crear estudiante</span>
                            </div>
                        </div>
                        </div>
                        
                        {
                            customers.map((student,index)=> {
                                return (
                                <div className="container-border d-flex align-items-center justify-content-between rounded p-2 my-1" key={index}>                                  
                                    <span>{student.name}</span>
                                    <div className=" text-center">
                                        <input type="checkbox" className="" />
                                    </div>  
                                </div>
                                )
                            })
                        }
                    </div>
                  </div>
                  <hr/>
                  <div className="row">
                        <div className="col-lg-6 d-flex flex-column">
                            <label>Fecha de inicio</label>
                            <input type="date" className="container-border rounded p-2"/>
                        </div>
                  </div>
                  <div className="row">
                    <span>Días de clase</span>
                    <div className="col-lg-12">
                    <div className="row container-border rounded p-2 mx-1">
                        {
                            days.map((day,index)=> {
                                return (
                                    <div className="col-lg-3 d-flex gap-1" key={index}>
                                        <input type="checkbox" value={day} onChange={handleDaysChange}/>
                                        <label>{day}</label>
                                    </div>
                                )
                            })
                        }
                        
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