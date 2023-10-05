import React, {useState} from 'react';
import axios from 'axios';
import './UserForm.scss';

export const UserForm = ({closeForm}) => {
    const apiUsers = "http://localhost:9009/api/users";
    const [formState, setFormState] = useState({
        user: "",
        password: "",
        rolId: ""
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
        <div className='modal-container' onClick={(e)=>{if (e.target.className==="modal-container")closeForm()}}>
            <div className='modal'>
                <form>
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