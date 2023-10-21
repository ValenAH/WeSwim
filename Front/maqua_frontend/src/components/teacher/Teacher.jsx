import React, { useState, useEffect } from "react";
import './Teacher.scss';
import TeacherTable from "./TeacherTable";
import AddTeacherForm from "./AddTeacherForm";
import EditTeacherForm from "./EditTeacherForm";
import axios from "axios";

const Teacher = () => {

    const TeacherData = [
        
        {
            id: 222,
            name: "fernando",
            email: "jfgrajales@correo.iue.edu.co",
            documentTypeid: 33,
            documentNumber: "1007",
            userid: 2,
            bankid: 3,
            phone: "321",
            accountType: "ahorros",
            accountNumber: "987654"
        }
        
      ];
      const [teachers, setTeachers] = useState(TeacherData);
      const [showLoading, setShowLoading] = useState(true);
      const apiUrl = "http://localhost:9009/api/teacherCustomAPI";


  
      useEffect(() => {
        const fetchData = async () => {
           await axios.get("http://localhost:9009/api/teacherCustomAPI/getAllTeachers")
          .then(result => setTeachers(result.data.teacherList))
          .catch(err => console.log(err));
        };
        fetchData();
      }, []);
  
    
    
      const addTeacher = (teacher) => {
        setShowLoading(true);
        const data = {
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          documentTypeid : teacher.documentTypeid,
          documentNumber: teacher.documentNumber,
          phone: teacher.phone,
          userid: teacher.userid,
          bankid: teacher.bankid,
          accountType: teacher.accountType,
          accountNumber: teacher.accountNumber,
          password: teacher.password

        };
        axios
          .post("http://localhost:9009/api/teacherCustomAPI/addnewteacher", data)
          .then((result) => {
            setTeachers([...teachers, result.data]);
          })
          .catch((error) => setShowLoading(false));
      };
    
      const deleteTeacher = (id) => {
        setTeachers(teachers.filter((teacher) => teacher.id !== id));
        const data = {
          id: id,
          name: "",
          email: "",
          documentTypeid : "",
          documentNumber: "",
          phone: "",
          userid: "",
          bankid: "",
          accountType: "",
          accountNumber: "",
          password:""
        };
        axios
          .post("http://localhost:9009/api/teacherCustomAPI/teacherremove", data)
          .then((result) => {
          })
          .catch((error) => setShowLoading(false));
      };
    
      const [editing, setEditing] = useState(false);
    
      const initialFormState = {
        id: null,
        name: "",
        email: "",
        documentTypeid : null,
        documentNumber: "",
        phone: "",
        userid: null,
        bankid: null,
        accountType: "",
        accountNumber: "",
        password: ""
      };
    
      const [currentTeacher, setCurrentTeacher] = useState(initialFormState);
    
      const editRow = (teacher) => {
        setEditing(true);
        setCurrentTeacher({
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            documentTypeid : teacher.documentTypeid,
            documentNumber: teacher.documentNumber,
            phone: teacher.phone,
            userid: teacher.userid,
            bankid: teacher.bankid,
            accountType: teacher.accountType,
            accountNumber: teacher.accountNumber,
            password: teacher.password
        });
      };
    
      const updateTeacher = (id, updatedTeacher) => {
        setEditing(false);
        setTeachers(
          teachers.map((teacher) =>
            teacher.id === id ? updatedTeacher : teacher
          )
        );
        const data = {
          id: updatedTeacher.id,
          name: updatedTeacher.name,
          email: updatedTeacher.email,
          documentTypeid : updatedTeacher.documentTypeid,
          documentNumber: updatedTeacher.documentNumber,
            phone: updatedTeacher.phone,
            userid: updatedTeacher.userid,
            bankid: updatedTeacher.bankid,
            accountType: updatedTeacher.accountType,
            accountNumber: updatedTeacher.accountNumber,
            password: updatedTeacher.password
        };
        axios
          .post("http://localhost:9009/api/teacherCustomAPI/updateteacher", data)
          .then((result) => {
          })
          .catch((error) => setShowLoading(false));
      };
    
      return (
        <div className="container">
          <h1>CRUD App with Hooks</h1>
          <div className="flex-row">
            <div className="flex-large">
              {editing ? (
                <div>
                  <h2>Edit Teacher</h2>
                  <EditTeacherForm
                    setEditing={setEditing}
                    currentTeacher={currentTeacher}
                    updateTeacher={updateTeacher}
                  />
                </div>
              ) : (
                <div>
                  <h2>Add teacher</h2>
                  <AddTeacherForm addTeacher={addTeacher} />
                </div>
              )}
            </div>
    
            <div className="flex-large">
              <h2>View Teachers</h2>
              <TeacherTable
                teachers={teachers}
                deleteTeacher={deleteTeacher}
                editRow={editRow}
              />
            </div>
          </div>
        </div>
      );
    };
    
    export default Teacher;
    
   

