import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './UserForm.scss';
import {IoIosCloseCircle} from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';

export const UserForm = () => {
    const apiUsers = "http://localhost:9009/api/users";

    const {id} = useParams();

    const [formState, setFormState] = useState({
        user: "",
        password: "",
        rolId: 0
    })

    const navigate = useNavigate();

    useEffect(() => {
        if(id === 'new') return;

        const fetchUser = async () => {
            await axios.get(`${apiUsers}/getUserById?id=${id}`)
                .then(response =>{
                    setFormState(response.data)
                })
                .catch(err => console.log(err))
        };
        fetchUser();
    }, [])

    const handleChangeUser = (e) => {
        setFormState({...formState, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(id=== 'new'){
            await axios.post(apiUsers + "/addUser", formState)
            .catch(err => console.log(err))
            return navigate("/user");
        }else{
            let data = {id: id,...formState}
    
            await axios.post(apiUsers + "/updateUser", data)
            .then(res => {
                setFormState(res)})
            .catch(err => console.log(err))
            return navigate("/user");
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='form position-relative m-5'>
                <div className='form__close position-absolute'>
                    <IoIosCloseCircle className='icon' onClick={()=>navigate('/user')}/>
                </div>
                <h5 className='text-center'>{id === 'new' ? 'Crear': 'Actualizar'} usuario</h5>
                <form className='mt-3' onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='user'>Nombre de usuario</label>
                        <input name='user' type='text' value={formState.user} placeholder='Usuario'  onChange={handleChangeUser}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input name='password' value={formState.password} placeholder='Contraseña' onChange={handleChangeUser}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='rolId'>Rol</label>
                        <select name='rolId' value={formState.rolId} placeholder='Elige un rol' onChange={handleChangeUser}>
                            <option value={0} disabled hidden>Selecciona un rol</option>
                            <option value={1}>Administrador</option>
                            <option value={2}>Profesor</option>
                            <option value={3}>Estudiante</option>
                        </select>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='btn text-center' onClick={handleSubmit}>
                            {id === 'new'? 'Crear':'Actualizar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm;