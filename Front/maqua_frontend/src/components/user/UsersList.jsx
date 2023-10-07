import React, { useState, useEffect} from "react";
import UserForm from './UserForm';
import axios from 'axios';
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs"
import './UsersList.scss';

const UsersList = () => {
    const userUrl = "http://localhost:9009/api/users";

    const [users, setUser] = useState([]);
    const [openUserForm, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(userUrl + "/getAllUsers")
            .then(res => setUser(res.data.usersList))
            .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const handleDeleteUser = async (user) => {
        await axios.post(userUrl + "/removeUser",user)
        .then(res => {
            console.log(res)
           //actualizar componente
        })
        .catch(err => console.log('No se ha podido eliminar el usuario',err))
    } 

    return (
    <div className="table-wrapper container w-100 d-flex justify-content-center flex-column">
        <div className="row justify-content-end">
            <button className='btn col-2' onClick={() =>setOpen(true)}>Nuevo usuario</button>
        </div>
        {openUserForm && <UserForm closeForm={()=>{
        setOpen(false)
        }}/>
        }
        <div className="table mx-auto mt-3">
            <h3 className="text-center my-2">Administrar usuarios</h3>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th className="w-100 text-center">Nombre de usuario</th>
                        <th>Contraseña</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        users.map((user, index) => {
                            return <tr key={index}>
                                <td>{user.id}</td>
                                <td>{user.user}</td>
                                <td>{user.password}</td>
                                <td>{user.rolId}</td>
                                <td>
                                    <span className="actions d-flex justify-content-around">
                                        <BsFillPencilFill className="edit-btn"/>
                                        <BsFillTrashFill className="delete-btn" onClick={()=> handleDeleteUser(user)}/>
                                    </span>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default UsersList;