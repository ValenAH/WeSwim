import React, { useState } from "react";
import axios from 'axios';
import './Teacherformadd.scss';
import {IoIosCloseCircle} from 'react-icons/io';

export const Teacherformadd = ({closeForm}) => {
    const apiTeachers = "http://localhost:9009/api/teacherCustomAPI";
    const [formState, setFormState] = useState({
        id: null,
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

    const handleAddTeacher = async (teacher) => {
        await axios.post(apiTeachers + "/addnewteacher", teacher)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const handleChangeTeacher = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='modal-container d-flex justify-content-center align-items-center'>
            <div className='form position-relative'>
                <div className='form__close position-absolute'>
                    <IoIosCloseCircle onClick={()=>closeForm()}/>
                </div>
                <h5 className='text-center'>Crear Profesor</h5>
                <form className='mt-3'>
                    <div className='form-group '>
                        <label htmlFor='name'>Nombre Completo</label>
                        <input name='name' type='text' value={formState.name}  onChange={handleChangeTeacher}/>
                    </div>
                    <div className='form-group '>
                        <label htmlFor='email'>Email</label>
                        <input name='email' type='text' value={formState.email}  onChange={handleChangeTeacher}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='documentTypeid'>Tipo de documento</label>
                        <select name='documentTypeid' value={formState.documentTypeid} onChange={handleChangeTeacher}>
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
                        <select name='bankid' value={formState.bankid} onChange={handleChangeTeacher}>
                            <option value={1}>Bancolombia</option>
                            <option value={2}>BBVA</option>
                            <option value={3}>Davivienda</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='accountType'>Tipo de cuenta</label>
                        <select name='accountType' value={formState.accountType} onChange={handleChangeTeacher}>
                                <option value="Ahorros">Ahorros</option>
                                <option value="Corriente">Corriente</option>
                        </select>
                    </div>
                    <div className='form-group '>
                        <label htmlFor='accountNumber'>No. de Cuenta</label>
                        <input name='accountNumber' type='text' value={formState.accountNumber}  onChange={handleChangeTeacher}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input name='password' value={formState.password} onChange={handleChangeTeacher}/>
                    </div>
                    <button type='submit' className='btn' onClick={()=>handleAddTeacher(formState)} >Enviar</button>
                </form>
            </div>
        </div>
    )

}

export default Teacherformadd;