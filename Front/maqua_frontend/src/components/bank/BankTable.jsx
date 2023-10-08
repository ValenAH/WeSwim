import React from "react";

const BankTable = (props) => {
  return (
    <table className="table table-hover mt-3">
      <thead className="table-light">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Contact Email</th>
          <th scope="col">Location</th>
          <th scope="col">Account Type</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.banks && props.banks.length > 0 ? (
          props.banks.map((bank) => (
            <tr key={bank.id.toString()}>
              <td>{bank.id}</td>
              <td>{bank.nameBank}</td>
              <td>{bank.contactEmail}</td>
              <td>{bank.location}</td>
              <td>{bank.typeAccount}</td>
              <td>
                <button
                  onClick={() => props.editRow(bank)}
                  className="btn btn-warning btn-sm mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => props.deleteBank(bank.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={6}>No banks found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BankTable;

