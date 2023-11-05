import React, { useEffect, useState } from "react";
import axios from 'axios';
import './Teacherform.scss';
import {IoIosCloseCircle} from 'react-icons/io';
import { useNavigate, useParams } from "react-router-dom";

const Teacherform = () => {
    const {id}=useParams();
    const navigate=useNavigate();
    const apiTeachers = "http://localhost:9009/api/teacherCustomAPI";
    const [formState, setFormState] = useState({
        //id: null,
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
    useEffect(()=>{
        if (id==='new')return;
        const fetchTeacher = async ()=>{
            await axios.get(`${apiTeachers}/getTeacherById?id=${id}`)
            .then(response=>{
                setFormState(response.data)
            })
            .catch(error=>console.log(error))
        }
        fetchTeacher();
    },[])
    const handlesubmit = async (e) => {
        e.preventDefault();
        if(id==='new'){
            await axios.post(apiTeachers + "/addnewteacher", formState)
            .catch(err => console.log(err))
            return navigate('/teacher');
        }
        else{
            let data={id:id,...formState}
            await axios.post(apiTeachers + "/updateteacher", data)
            .then(response=>{setFormState(response)})
            .catch(err => console.log(err))
            return navigate('/teacher');
        }
    }

    const handleChangeTeacher = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='form position-relative'>
                <div className='form__close position-absolute'>
                    <IoIosCloseCircle onClick={()=>navigate('/teacher')}/>
                </div>
                <h5 className='text-center'>{id==='new'?'Crear':'Editar'} Profesor</h5>
                <form className='mt-3'>
                    <div className='form-group '>
                        <label htmlFor='name'>Nombre Completo</label>
                        <input name='name' type='text' value={formState.name}  onChange={handleChangeTeacher}/>
                    </div>
                    <div className='form-group col-md-6 mb-3 '>
                        <label htmlFor='email'>Email</label>
                        <input name='email' type='text' value={formState.email}  onChange={handleChangeTeacher}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='documentTypeid'>Tipo de documento</label>
                        <select name='documentTypeid' value={formState.documentTypeid} placeholder='Elige un tipo de documento' onChange={handleChangeTeacher}>
                            <option value={0} disabled hidden>Elige un tipo de documento</option>
                            <option value={1}>Cedula</option>
                            <option value={2}>Tarjeta de Identidad</option>
                            <option value={3}>Pasaporte</option>
                        </select>
                    </div>
                    <div className='form-group '>
                        <label htmlFor='documentNumber'>No. Documento</label>
                        <input name='documentNumber' type='text' value={formState.documentNumber}  onChange={handleChangeTeacher}/>
                    </div>
                    <div className='form-group '>
                        <label htmlFor='phone'>Telefono</label>
                        <input name='phone' type='text' value={formState.phone}  onChange={handleChangeTeacher}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='bankid'>Banco</label>
                        <select name='bankid' value={formState.bankid} placeholder='Elige un Banco' onChange={handleChangeTeacher}>
                            <option value={0} disabled hidden>Elige un Banco</option>
                            <option value={1}>Bancolombia</option>
                            <option value={2}>BBVA</option>
                            <option value={3}>Davivienda</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='accountType'>Tipo de cuenta</label>
                        <select name='accountType' value={formState.accountType} placeholder='Elige Tipo de cuenta' onChange={handleChangeTeacher}>
                                <option value="" disabled hidden>Elige tipo de cuenta</option>
                                <option value="Ahorros">Ahorros</option>
                                <option value="Corriente">Corriente</option>
                        </select>
                    </div>
                    <div className='form-group col-md-6 mb-3 '>
                        <label htmlFor='accountNumber'>No. de Cuenta</label>
                        <input name='accountNumber' type='text' value={formState.accountNumber}  onChange={handleChangeTeacher}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input name='password' value={formState.password} onChange={handleChangeTeacher}/>
                    </div>
                    <button type='submit' className='btn' onClick={handlesubmit} >{id==='new'?'Crear':'Editar'}</button>
                </form>
            </div>
        </div>
    )

}

export {Teacherform};