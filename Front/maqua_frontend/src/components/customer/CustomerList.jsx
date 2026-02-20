import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerList.scss";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/Auth";
import { environment } from "../../environments/environment";

const getListFromResponse = (res) => {
  const data = res?.data;
  if (!data) return [];
  if (Array.isArray(data)) return data;
  const list =
    data.customerList ??
    data.CustomerList ??
    data.customer_list ??
    data.customers;
  if (Array.isArray(list)) return list;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const firstValue = Object.values(data)[0];
    if (Array.isArray(firstValue)) return firstValue;
  }
  return [];
};

const CustomerList = () => {
  const baseUrl = (environment.API_BACKEND || "").replace(/\/?$/, "");
  const apiCustomer = `${baseUrl}/CustomerAPI`;
  const navigate = useNavigate();
  const auth = useAuth();
  const [customers, setCustomer] = useState([]);
  const roleId = auth.user?.role_Id != null ? Number(auth.user.role_Id) : null;
  const isAdmin = roleId === 1;
  const isProfessor = roleId === 2;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isProfessor && auth.user?.id) {
          const res = await axios.get(`${apiCustomer}/customersByTeacher`, {
            params: { userId: auth.user.id },
          });
          setCustomer(getListFromResponse(res));
        } else {
          const res = await axios.get(`${apiCustomer}/getCustomers`);
          setCustomer(getListFromResponse(res));
        }
      } catch (err) {
        console.error("Error cargando clientes:", err?.response?.status, err?.message, err?.response?.data);
        setCustomer([]);
      }
    };
    fetchData();
  }, [apiCustomer, isAdmin, isProfessor, auth.user?.id]);

  const handleDeleteCustomer = async (customer) => {
    try {
      await axios.post(apiCustomer + "/customerremove", customer);
      setCustomer((prev) => prev.filter((c) => c.id !== customer.id));
    } catch (err) {
      console.log("No se ha podido eliminar el cliente", err);
    }
  };

  const title = isProfessor ? "Mis alumnos" : "Administrar clientes";

  return (
    <section className="customer-list">
      <div className="customer-list__container container">
        <div className="customer-list__header">
          <h2 className="customer-list__title">{title}</h2>
          {isAdmin && (
            <button
              type="button"
              className="customer-list__btn-new"
              onClick={() => navigate("/customer/new")}
            >
              Nuevo cliente
            </button>
          )}
        </div>
        <div className="customer-list__card">
          <div className="customer-list__table-wrap">
            <table className="customer-list__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Correo</th>
                  <th>Tipo doc.</th>
                  <th>Nº documento</th>
                  <th>Dirección</th>
                  <th>Teléfono</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer, index) => (
                  <tr key={customer.id ?? index}>
                    <td>{customer.id}</td>
                    <td>{customer.name ?? "—"}</td>
                    <td>{customer.lastname ?? "—"}</td>
                    <td>{customer.email ?? "—"}</td>
                    <td>{customer.documentTypeId ?? customer.documentTypeid ?? "—"}</td>
                    <td>{customer.documentNumber ?? "—"}</td>
                    <td>{customer.address ?? "—"}</td>
                    <td>{customer.phone ?? "—"}</td>
                    <td>
                      <span className="customer-list__actions">
                        <button
                          type="button"
                          className="customer-list__action customer-list__action--edit"
                          onClick={() => navigate(`/customer/${customer.id}`)}
                          title="Editar"
                        >
                          <BsFillPencilFill />
                        </button>
                        {isAdmin && (
                          <button
                            type="button"
                            className="customer-list__action customer-list__action--delete"
                            onClick={() => handleDeleteCustomer(customer)}
                            title="Eliminar"
                          >
                            <BsFillTrashFill />
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CustomerList };
