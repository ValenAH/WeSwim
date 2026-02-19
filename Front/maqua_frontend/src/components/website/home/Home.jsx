import React from "react";
import "./Home.scss";
import { Gallery } from "./gallery/gallery";
import { SocialMedia } from "./social-media/social-media";
import { Planes } from "./planes/planes";
import { Faq } from "./faq/faq";
import { BsWhatsapp, BsHouseDoor, BsShieldCheck, BsPersonBadge, BsSliders, BsClock, BsGraphUp, BsStarFill } from "react-icons/bs";

const oceanImage = require("../../../assets/images/Ocean.jpg").default;

const testimonials = [
    { quote: "Mis hijos perdieron el miedo al agua en pocas semanas. Las profesoras son muy pacientes y el ambiente es súper seguro.", author: "María G.", role: "Mamá de dos alumnos" },
    { quote: "Llevo tres meses y ya nado mejor que nunca. Las clases son personalizadas y se nota la experiencia del equipo.", author: "Carlos R.", role: "Alumno adulto" },
    { quote: "Excelente atención y flexibilidad para reprogramar. Mi hija disfruta cada clase y ha mejorado mucho su técnica.", author: "Andrea L.", role: "Mamá de alumna" },
    { quote: "Después de mi lesión de rodilla, la terapia acuática fue clave para recuperarme. Pude trabajar sin impacto y hoy me siento mucho mejor.", author: "Roberto M.", role: "Recuperación de lesión" },
];

const units = [
    { name: "Terrazas del Río" },
    { name: "Prado Alto" },
    { name: "El Faro" },
];

const whyMaqua = [
    { icon: BsHouseDoor, title: "Vamos hasta tu unidad residencial", description: "Sin desplazamientos, sin tráfico, sin perder tiempo. Entrenamos en la piscina donde ya vives." },
    { icon: BsShieldCheck, title: "Seguridad como prioridad", description: "Enseñamos técnicas reales de adaptación y flotación, priorizando confianza y control en el agua." },
    { icon: BsPersonBadge, title: "Profesores con experiencia", description: "Clases guiadas por instructores con formación y experiencia en procesos infantiles y adultos." },
    { icon: BsSliders, title: "Proceso personalizado", description: "Cada alumno avanza a su ritmo. Adaptamos la metodología según edad, nivel y objetivos." },
    { icon: BsClock, title: "Horarios flexibles", description: "Nos adaptamos a tu disponibilidad." },
    { icon: BsGraphUp, title: "Seguimiento de tu proceso", description: "Evaluamos avances y ajustamos el proceso para garantizar resultados reales." },
];

const Home = () => {
    return (
        <div>
            <Gallery />
            <div className="container-fluid bg-white py-5">
                <div className="container">
                    <div className="row text-center">
                        <h2>CLASES DE NATACIÓN EN TU UNIDAD</h2>
                        <p>Creemos en la importancia de aprender a nadar y disfrutar del agua en un entorno inclusivo y amigable.
                            <br />Dictamos clases de natación a personas de todas las edades, incluyendo aquellos con discapacidades físicas y cognitivas.
                            <br />Lo mejor de todo es que nuestros profesores están capacitados para enseñar dos idiomas: inglés y español.
                            <br />¡Únete a nosotros y sumérgete en la diversión de aprender a nadar!
                        </p>
                    </div>
                </div>
            </div>

            <section
                className="container-fluid py-5 why-maqua-section"
                style={{ backgroundImage: `url(${oceanImage})` }}
            >
                <div className="container">
                    <h2 className="why-maqua-section__title text-center">¿Por qué elegir a MAQUA?</h2>
                    <div className="row g-4 mt-3">
                        {whyMaqua.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="col-12 col-md-6 col-lg-4">
                                    <div className="why-maqua-card h-100">
                                        <div className="why-maqua-card__icon"><Icon aria-hidden /></div>
                                        <h3 className="why-maqua-card__title">{item.title}</h3>
                                        <p className="why-maqua-card__description">{item.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <div id="testimonios" className="container-fluid py-5 bg-white conocenos-section">
                <div className="container">
                    <div className="row justify-content-center mb-4">
                        <div className="col-12 text-center">
                            <h2 className="conocenos-section__title">CONOCE NUESTRAS CLASES</h2>
                            <a href="https://www.instagram.com/maqua.oficial/reels/" target="_blank" rel="noopener noreferrer" className="conocenos-section__cta">Ver reels en Instagram</a>
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="col-12 col-sm-6 col-lg-3">
                                <div className="testimonial-card h-100">
                                    <div className="testimonial-card__stars" aria-label="5 de 5 estrellas">
                                        {[1, 2, 3, 4, 5].map((i) => (<BsStarFill key={i} aria-hidden />))}
                                    </div>
                                    <p className="testimonial-card__quote">"{testimonial.quote}"</p>
                                    <div className="testimonial-card__author">{testimonial.author}</div>
                                    <div className="testimonial-card__role">{testimonial.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section id="unidades" className="container-fluid py-5 unidades-section">
                <div className="container">
                    <h2 className="unidades-section__title text-center">Unidades donde prestamos servicio</h2>
                    <p className="unidades-section__subtitle text-center">Otros vecinos ya están tomando clases</p>
                    <div className="row g-4 justify-content-center mt-3">
                        {units.map((unit, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <div className="unidad-card">
                                    <span className="unidad-card__name">{unit.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Planes />
            <Faq />
            <SocialMedia />

            <a
                href="https://wa.me/573052587069"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-float position-fixed rounded-circle p-2 d-flex justify-content-center align-items-center text-decoration-none"
                title="Contactar por WhatsApp"
                aria-label="Abrir WhatsApp"
            >
                <BsWhatsapp className="fs-1 text-white" />
            </a>
        </div>
    );
};

export { Home };
