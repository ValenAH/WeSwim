import React from "react";
import "./TeacherTable.scss";
import {BsFillPencilFill,BsFillTrashFill} from "react-icons/bs";

const TeacherTable = (props) => (
  <div className="table-wrapper container w-100 d-flex justify-content-center flex-column">
     <div className="table mx-auto mt-3">
     <h3 className="text-center my-2">Administrar Profesores</h3>
    <table  >
      <thead >
        <tr >
        <th>id</th>
        <th className="w-100 text-center">name</th>
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
      <tbody className="table mx-auto mt-3">
        {undefined !== props.teachers && props.teachers.length > 0 ? (
          props.teachers.map((teacher) => (
            <tr key={teacher.id.toString()}>
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
              <BsFillPencilFill
                className="icon icon--edit"
                onClick={() => {
                  props.editRow(teacher);
                }}
              ></BsFillPencilFill>
               <BsFillTrashFill
                className="icon icon--delete"
                onClick={() => props.deleteTeacher(teacher.id)}
              ></BsFillTrashFill>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No teacher</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
    </div>
  );
  
  export default TeacherTable;
  