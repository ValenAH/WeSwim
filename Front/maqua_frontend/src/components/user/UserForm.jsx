import React, {useState} from 'react';
import axios from 'axios';
import './UserForm.scss';
import {IoIosCloseCircle} from 'react-icons/io';

export const UserForm = ({closeForm}) => {
    const apiUsers = "http://localhost:9009/api/users";
    const [formState, setFormState] = useState({
        user: "",
        password: "",
        rolId: 0
    })

    const handleAddUser = async (user) => {
        await axios.post(apiUsers + "/addUser", user)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const handleChangeUser = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    // const handleSubmit = async (e) =>{
    //     e.preventDefault();
    //     console.log(formState);
    //     await handleAddUser(formState);
    // }


    return (
        <div className='modal-container d-flex justify-content-center align-items-center'>
            <div className='form position-relative'>
                <div className='form__close position-absolute'>
                    <IoIosCloseCircle onClick={()=>closeForm()}/>
                </div>
                <h5 className='text-center'>Crear usuario</h5>
                <form className='mt-3'>
                    <div className='form-group '>
                        <label htmlFor='user'>Nombre de usuario</label>
                        <input name='user' type='text' value={formState.user}  onChange={handleChangeUser}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input name='password' value={formState.password} onChange={handleChangeUser}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='rolId'>Rol</label>
                        <select name='rolId' value={formState.rolId} onChange={handleChangeUser}>
                            <option value={1}>Administrador</option>
                            <option value={2}>Profesor</option>
                            <option value={3}>Estudiante</option>
                        </select>
                    </div>
                    <button type='submit' className='btn' onClick={()=>handleAddUser(formState)} >Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default UserForm;