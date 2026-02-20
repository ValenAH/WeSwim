import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPeopleFill, BsPersonBadgeFill, BsCashStack } from "react-icons/bs";
import "./AdminDashboard.scss";

const cards = [
  {
    title: "Ver clientes",
    description: "Gestionar clientes y ver fecha del último pago",
    icon: BsPeopleFill,
    path: "/customer",
  },
  {
    title: "Ver profesores",
    description: "Administrar el equipo de profesores",
    icon: BsPersonBadgeFill,
    path: "/teacher",
  },
  {
    title: "Transacciones",
    description: "Resumen de ingresos e historial de pagos",
    icon: BsCashStack,
    path: "/transaction",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <section className="admin-dashboard py-5">
      <div className="container">
        <h2 className="admin-dashboard__title text-center mb-5">
          Panel de administración
        </h2>
        <div className="row g-4 justify-content-center">
          {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.path} className="col-12 col-md-6 col-lg-4">
              <button
                type="button"
                className="admin-dashboard__card w-100 h-100"
                onClick={() => navigate(card.path)}
              >
                <Icon className="admin-dashboard__icon" />
                <h3 className="admin-dashboard__card-title">{card.title}</h3>
                <p className="admin-dashboard__card-desc">{card.description}</p>
              </button>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
