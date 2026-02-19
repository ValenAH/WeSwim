import React from "react";
import "./planes.scss";

const plans = [
    { title: "Plan explorador", description: "Ideal para iniciar y perder el miedo.", frequency: "1 clase semanal", price: "" },
    { title: "Plan campeón", description: "Mejoras técnica y resistencia.", frequency: "2 clases semanales", price: "" },
    { title: "Plan Élite", description: "Acelera tus resultados.", frequency: "3 clases semanales", price: "" },
];

const Planes = () => {
    return (
        <div id="prices" className="planes-section">
            <div className="planes-section__content">
                <div className="container">
                    <h2 className="planes-section__title text-center">NUESTROS PLANES</h2>
                    <p className="planes-section__intro text-center">Elige el plan ideal para avanzar con seguridad y confianza</p>
                    <div className="row g-4 justify-content-center mt-3">
                        {plans.map((plan) => (
                            <div key={plan.title} className="col-12 col-md-6 col-lg-4">
                                <div className="planes-card h-100">
                                    <h3 className="planes-card__title">{plan.title}</h3>
                                    <p className="planes-card__description">{plan.description}</p>
                                    <p className="planes-card__frequency">{plan.frequency}</p>
                                    <div className="planes-card__price">{plan.price || "—"}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="planes-section__disclaimer mt-4 text-center">
                        *Recibe un 10% de descuento en tu primera mensualidad enviándonos por WhatsApp el código <strong>MAQUA-WEBSITE</strong> al agendar tu clase de prueba.
                    </p>
                </div>
            </div>
        </div>
    );
};

export { Planes };
