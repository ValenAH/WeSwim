import React from "react";

const TeacherTable = (props) => (
    <table>
      <thead>
        <tr>
        <th>id</th>
        <th>name</th>
        <th>email</th>
        <th>documentTypeid</th>
        <th>documentNumber</th>
        <th>Phone</th>
        <th>userid</th>
        <th>Bankid</th>
        <th>AccountType</th>
        <th>AccountNumber</th>
        </tr>
      </thead>
      <tbody>
        {undefined !== props.teachers && props.teachers.length > 0 ? (
          props.teachers.map((teacher) => (
            <tr key={teacher.id.toString()}>
              <td>{teacher.id}</td>
              <td>{teacher.name}</td>
              <td>{teacher.email}</td>
              <td>{teacher.documentTypeid}</td>
              <td>{teacher.documentNumber}</td>
              <td>{teacher.Phone}</td>
              <td>{teacher.userid}</td>
              <td>{teacher.Bankid}</td>
              <td>{teacher.AccountType}</td>
              <td>{teacher.AccountNumber}</td>
              <td>
                <button
                  onClick={() => {
                    props.editRow(teacher);
                  }}
                  className="button muted-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => props.deleteTeacher(teacher.id)}
                  className="button muted-button"
                >
                  Delete
                </button>
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
  );
  
  export default TeacherTable;
  