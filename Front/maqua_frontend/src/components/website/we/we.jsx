import React from "react";
import "./we.scss";
import { Team } from "./team/team";

const services = [
    { url: require('../../../assets/images/Niños.jpg'), title: "Clases para niños", show: false, message: "¡Diversión y seguridad en el agua! Inscribe a tus hijos en nuestras clases de natación para niños y descubre el mundo acuático juntos." },
    { url: require('../../../assets/images/Adultos.jpeg'), title: "Clases para adultos", show: false, message: "Nunca es tarde para aprender a nadar. Únete a nuestras clases de natación para adultos y disfruta de un nuevo estilo de vida saludable." },
    { url: require('../../../assets/images/Acondicionamiento.jpg'), title: "Acondicionamiento físico", show: true, message: "Ponte en forma con nuestras clases de acondicionamiento físico en el agua. ¡Ejercicio de bajo impacto, alta efectividad!" },
    { url: require('../../../assets/images/Competencia.jpg'), title: "Competencias", show: true, message: "Lleva tu rendimiento al siguiente nivel. Únete a nuestro programa de preparación de nadadores para competencia y alcanza tus metas." },
    { url: require('../../../assets/images/Autismo.jpg'), title: "Autismo y Síndrome de Down", show: true, message: "Natación inclusiva y terapéutica. Ofrecemos clases especializadas para personas con discapacidades cognitivas." },
    { url: require('../../../assets/images/Terapias.jpg'), title: "Terapias", show: true, message: "Descubre los beneficios de la terapia acuática. Mejoramos tu bienestar físico y emocional a través del poder del agua." },
];

const We = () => {
    return (
        <div>
            <div className="container-fluid bg-white">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="my-2 bg-white mt-5 rounded-3">
                            <h2>¿QUIÉNES SOMOS?</h2>
                            <p>Somos un equipo de expertos en natación y gimnasia acuática, especializados en la enseñanza a bebés, niños, adultos, personas mayores y con discapacidad física o cognitiva.
                                Ofrecemos clases personalizadas y adaptadas a cada grupo, asegurando una experiencia segura y efectiva. Proporcionamos todos los materiales necesarios para cada sesión, llevándolos a tu unidad.
                                Nuestro objetivo es fomentar la confianza y habilidades acuáticas en todos nuestros estudiantes.
                                <br />
                                ¡Únete a nosotros y descubre el placer de nadar y ejercitarte en el agua!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="servicios" className="container-fluid py-5 servicios-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <h1 className="text-center">NUESTROS SERVICIOS</h1>
                        {services.map((service, index) => (
                            <div key={index} className="card col-lg-3 m-lg-2 bg-white p-2 rounded-3">
                                <h5 className="my-2 text-center">{service.title}</h5>
                                <div className="image-container">
                                    <img className="w-100" src={service.url.default} alt="" />
                                </div>
                                <hr className="m-0" />
                                <div className="message justify-content-center h-100">
                                    <div className="d-flex align-items-center p-2">
                                        <p className="text-center">{service.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Team />
        </div>
    );
};
export { We };
