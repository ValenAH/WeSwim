import React, { useState, useEffect} from "react";
import axios from 'axios';
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs"
import './TeacherList.scss';
import { useNavigate } from "react-router-dom";

const TeacherList = () => {
    const TeacherUrl = "http://localhost:9009/api/teacherCustomAPI";
    const navigate=useNavigate();
    const [teachers, setTeacher] = useState([]);
    const [openTeacherformadd, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(TeacherUrl + "/getAllTeachers")
            .then(res => setTeacher(res.data.teacherList))
            .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const handleDeleteTeacher = async (teacher) => {
        await axios.post(TeacherUrl + "/teacherremove",teacher)
        .then(res => {
            console.log(res)
           //actualizar componente
        })
        .catch(err => console.log('No se ha podido eliminar el profesor',err))
    } 
    return (
        <div className="table-wrapper container w-100 d-flex justify-content-center flex-column">
            <div className="row justify-content-end">
                <button className='btn col-2' onClick={()=>navigate('/teacher/new')}>Nuevo Profesor</button>
            </div>
            <div className="table mx-auto mt-3">
                <h3 className="text-center my-2">Administrar Profesores</h3>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th >name</th>
                            <th>email</th>
                            <th>documentTypeid</th>
                            <th>documentNumber</th>
                            <th>Phone</th>
                            <th>userid</th>
                            <th>Bankid</th>
                            <th>AccountType</th>
                            <th>AccountNumber</th>
                            <th>Password</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            teachers.map((teacher, index) => {
                                return <tr key={index}>
                                    <td>{teacher.id}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.documentTypeid}</td>
                                    <td>{teacher.documentNumber}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.userid}</td>
                                    <td>{teacher.bankid}</td>
                                    <td>{teacher.accountType}</td>
                                    <td>{teacher.accountNumber}</td>
                                    <td>{teacher.password}</td>
                                    <td>
                                        <span className="actions d-flex justify-content-around">
                                            <BsFillPencilFill className="edit-btn" onClick={() => navigate(`/teacher/${teacher.id}`)}/>
                                            <BsFillTrashFill className="delete-btn" onClick={() => handleDeleteTeacher(teacher)}/>
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
export default TeacherList;