import React, { useState, useEffect } from "react";
import "./Customer.scss";
import CustomerTable from "./CustomerTable";
import EditCustomerForm from "./EditCustomerForm";
import axios from "axios";

const Customer = () => {
  const CustomerData = [
    {
      id: 111,
      name: "mmuriel",
      email: "mmuriel@correo.iue.edu.co",
      documentTypeId: 33,
      documentNumber: "1001577",
      address: "Calle 2A",
      phone: "302369859",
      userId: 1,
      paymentPlanId: 30,
    },
  ];
  const [customers, setCustomer] = useState(CustomerData);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:9009/";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl + "api/CustomerAPI/getAllCustomers");
      setCustomer(result.data.customerList);
    };
    fetchData();
  }, []);



  const deleteCustomer = (id) => {
    setCustomer(customers.filter((customer) => customer.id !== id));
    const data = {
      id: id,
      name: "",
      email: "",
      documentTypeId: "",
      documentNumber: "",
      address: "",
      phone: "",
      userId: "",
      paymentPlanId: "",
    };
    axios
      .post("http://localhost:9009/api/CustomerAPI/customerremove", data)
      .then((result) => {
        //console.log(result);
      })
      .catch((error) => setShowLoading(false));
  };

  const [editing, setEditing] = useState(false);

  const initialFormState = {
    id: null,
    name: "",
    email: "",
    documentTypeId: null,
    documentNumber: "",
    address: "",
    phone: "",
    userId: null,
    paymentPlanId: null,
  };

  const [currentCustomer, setCurrentCustomer] = useState(initialFormState);

  const editRow = (customer) => {
    setEditing(true);
    setCurrentCustomer({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      documentTypeId: customer.documentTypeId,
      documentNumber: customer.documentNumber,
      address: customer.address,
      phone: customer.phone,
      userId: customer.userId,
      paymentPlanId: customer.paymentPlanId,
    });
  };

  const updateCustomer = (id, updatedCustomer) => {
    setEditing(false);
    setCustomer(
      customers.map((customer) =>
        customer.id === id ? updatedCustomer : customer
      )
    );
    const data = {
      id: updatedCustomer.id,
      name: updatedCustomer.name,
      email: updatedCustomer.email,
      documentTypeId: updatedCustomer.documentTypeId,
      documentNumber: updatedCustomer.documentNumber,
      address: updatedCustomer.address,
      phone: updatedCustomer.phone,
      userId: updatedCustomer.userId,
      paymentPlanId: updatedCustomer.paymentPlanId,
    };
    axios
      .post("http://localhost:9009/api/CustomerAPI/updatecustomer", data)
      .then((result) => {
        //console.log("Updated");
      })
      .catch((error) => setShowLoading(false));
  };

  return (
    <div className="container">
           <div className="flex-row">


        <div className="flex-large">
          <CustomerTable
            customers={customers}
            deleteCustomer={deleteCustomer}
            editRow={editRow}
          />
        </div>
      </div>
    </div>
  );
};

export default Customer;
