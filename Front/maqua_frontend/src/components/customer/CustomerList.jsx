import React, { useState, useEffect} from "react";
import axios from 'axios';
import "./CustomerList.scss";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


  const CustomerList = () => {
    const apiCustomer = "http://localhost:9009/api/CustomerAPI";
    const navigate=useNavigate();
    const [customers, setCustomer] = useState([]);
    const [openCustomerformadd, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(apiCustomer + "/getAllCustomers")
            .then(res => setCustomer(res.data.customerList))
            .catch(err => console.log(err));
        }
        fetchData();
    }, []);

    const handleDeleteCustomer = async (customer) => {
        await axios.post(apiCustomer + "/customerremove",customer)
        .then(res => {
            console.log(res)
           //actualizar componente
        })
        .catch(err => console.log('No se ha podido eliminar el cliente',err))
    }


  return(
    <div className="table-wrapper container w-100 d-flex justify-content-center flex-column">
    <div className="row justify-content-end">
      <button className="btn col-2" onClick={() => navigate("/customer/new")}>
        Nuevo cliente
      </button>
    </div>
    <div className="table-container mx-auto mt-3">
      <h3 className="text-center my-2">Administrar Clientes</h3>

      <table className="table mx-auto mt-3 text-center ">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Tipo de documento</th>
            <th>Numero de documento</th>
            <th>Dirección</th>
            <th>Telefono</th>
            <th>Id Usuario</th>
            <th>Plan de Pago</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
         {
           customers.map((customer, index) => {
            return <tr key={index}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.documentTypeid}</td>
                <td>{customer.documentNumber}</td>
                <td>{customer.phone}</td>
                <td>{customer.userid}</td>
                <td>{customer.paymentPlanId}</td>
                <td>
                    <span className="actions d-flex justify-content-around">
                        <BsFillPencilFill className="edit-btn" onClick={() => navigate(`/customer/${customer.id}`)}/>
                        <BsFillTrashFill className="delete-btn" onClick={() => handleDeleteCustomer(customer)}/>
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

  

export {CustomerList};
