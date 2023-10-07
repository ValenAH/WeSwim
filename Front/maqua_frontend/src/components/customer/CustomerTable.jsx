import React from "react";

const CustomerTable = (props) => (
    <table>
      <thead>
        <tr>
        <th>id</th>
        <th>name</th>
        <th>email</th>
        <th>documentTypeid</th>
        <th>documentNumber</th>
        <th>address</th>
        <th>phone</th>
        <th>userId</th>
        <th>paymentPlanId</th>
        </tr>
      </thead>
      <tbody>
        {undefined !== props.customers && props.customers.length > 0 ? (
          props.customers.map((customer) => (
            <tr key={customer.id.toString()}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.documentTypeid}</td>
              <td>{customer.documentNumber}</td>
              <td>{customer.address}</td>
              <td>{customer.phone}</td>
              <td>{customer.userId}</td>
              <td>{customer.paymentPlanId}</td>
              <td>
                <button
                  onClick={() => {
                    props.editRow(customer);
                  }}
                  className="button muted-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => props.deleteCustomer(customer.id)}
                  className="button muted-button"
                >
                  Delete
                </button>
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
  );
  
  export default CustomerTable;
  