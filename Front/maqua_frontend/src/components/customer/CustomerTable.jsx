import React from "react";
import "./CustomerTable.scss";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";



  const CustomerTable = (props) => {
    const navigate = useNavigate();
    return (
    <div className="table-wrapper container w-100 d-flex justify-content-center flex-column">
      <div className="row justify-content-end">
        <button className="btn col-2" onClick={() => navigate("/customer/new")}>
          Nuevo usuario
        </button>
      </div>
      <div className="table-container mx-auto mt-3">
        <h3 className="text-center my-2">Administrar Clientes</h3>

        <table className="table mx-auto mt-3 text-center ">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>email</th>
              <th>documentTypeId</th>
              <th>documentNumber</th>
              <th>address</th>
              <th>phone</th>
              <th>userId</th>
              <th>paymentPlanId</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {undefined !== props.customers && props.customers.length > 0 ? (
              props.customers.map((customer) => (
                <tr key={customer.id.toString()}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.documentTypeId}</td>
                  <td>{customer.documentNumber}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.userId}</td>
                  <td>{customer.paymentPlanId}</td>
                  <td>
                    <BsFillPencilFill
                      className="icon icon--edit"
                      onClick={() => navigate(`/customer/${customer.id}`)}/>
                      
               

                    <BsFillTrashFill
                      className="icon icon--delete"
                      onClick={() => props.deleteCustomer(customer.id)}
                    ></BsFillTrashFill>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>No Customer</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    );
  }

export default CustomerTable;
