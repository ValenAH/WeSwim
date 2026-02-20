import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import "./UsersList.scss";
import { useNavigate } from "react-router-dom";
import { environment } from "../../environments/environment";

const ROLES = { 1: "Administrador", 2: "Profesor", 3: "Estudiante" };

const UsersList = () => {
  const userUrl = `${environment.API_BACKEND}users`;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(userUrl + "/getAllUsers");
        const list = res.data?.usersList ?? res.data?.userList ?? [];
        setUsers(Array.isArray(list) ? list : []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userUrl]);

  const handleDeleteUser = async (user) => {
    try {
      await axios.post(userUrl + "/removeUser", user);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      console.log("No se ha podido eliminar el usuario", err);
    }
  };

  const displayUsername = (user) => user?.username ?? user?.user ?? "—";
  const displayRole = (user) => {
    const id = user?.roleId ?? user?.rolId;
    return ROLES[id] ?? id ?? "—";
  };

  return (
    <section className="users-list">
      <div className="users-list__container container">
        <div className="users-list__header">
          <h2 className="users-list__title">Administrar usuarios</h2>
          <button
            type="button"
            className="users-list__btn-new"
            onClick={() => navigate("/user/new")}
          >
            Nuevo usuario
          </button>
        </div>
        <div className="users-list__card">
          <div className="users-list__table-wrap">
            <table className="users-list__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre de usuario</th>
                  <th>Contraseña</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{displayUsername(user)}</td>
                    <td className="users-list__password">{user?.password ? "••••••••" : "—"}</td>
                    <td>{displayRole(user)}</td>
                    <td>
                      <span className="users-list__actions">
                        <button
                          type="button"
                          className="users-list__action users-list__action--edit"
                          onClick={() => navigate(`/user/${user.id}`)}
                          title="Editar"
                        >
                          <BsFillPencilFill />
                        </button>
                        <button
                          type="button"
                          className="users-list__action users-list__action--delete"
                          onClick={() => handleDeleteUser(user)}
                          title="Eliminar"
                        >
                          <BsFillTrashFill />
                        </button>
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

export { UsersList };
