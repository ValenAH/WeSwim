import React from "react";
import "./Home.scss";
import { Gallery } from "./gallery/gallery";
import { SocialMedia } from "./social-media/social-media";
import { PricesTable } from "./pricesTable/pricesTable";
import { NavLink } from "react-router-dom";

const Home = () => {
    const services = [
        {
            url: require('../../../assets/images/Niños.jpg'),
            title: "Clases para niños",
            show: false,
            message: "¡Diversión y seguridad en el agua! Inscribe a tus hijos en nuestras clases de natación para niños y descubre el mundo acuático juntos."
        },
        {
            url: require('../../../assets/images/Adultos.jpeg'),
            title: "Clases para adultos",
            show: false,
            message: "Nunca es tarde para aprender a nadar. Únete a nuestras clases de natación para adultos y disfruta de un nuevo estilo de vida saludable."
        },
        {
            url: require('../../../assets/images/Acondicionamiento.jpg'),
            title: "Acondicionamiento físico",
            show: true,
            message: "Ponte en forma con nuestras clases de acondicionamiento físico en el agua. ¡Ejercicio de bajo impacto, alta efectividad!"
        },
        {
            url: require('../../../assets/images/Competencia.jpg'),
            title: "Competencias",
            show: true,
            message: "Lleva tu rendimiento al siguiente nivel. Únete a nuestro programa de preparación de nadadores para competencia y alcanza tus metas."
        },
        {
            url: require('../../../assets/images/Autismo.jpg'),
            title: "Autismo y Síndrome de Down",
            show: true,
            message: "Natación inclusiva y terapéutica. Ofrecemos clases especializadas para personas con discapacidades cognitivas."
        },
        {
            url: require('../../../assets/images/Autismo.jpg'),
            title: "Terapias",
            show: true,
            message: "Descubre los beneficios de la terapia acuática. Mejoramos tu bienestar físico y emocional a través del poder del agua."
        }
    ]

    return(
        <div>
            <Gallery/>
            <div className="container-fluid bg-white py-5">
                <div className="container">
                    <div className="row text-center">
                        <h2>CLASES DE NATACIÓN EN TU UNIDAD</h2>
                        <p>Creemos en la importancia de aprender a nadar y disfrutar del agua en un entorno inclusivo y amigable.
                            <br/>Dictamos clases de natación a personas de todas las edades, incluyendo aquellos con discapacidades físicas y cognitivas.
                            <br/>Lo mejor de todo es que nuestros profesores están capacitados para enseñar dos idiomas: inglés y español.
                            <br/>¡Únete a nosotros y sumérgete en la diversión de aprender a nadar!
                        </p>
                    </div>
                </div>
            </div>
            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row justify-content-between">
                        <h1 className="text-center">NUESTROS SERVICIOS</h1>
                        {services.map(service =>{
                            return (
                                <div className="card col-lg-3 m-lg-2 bg-white p-2 rounded-3">
                                    <h5 className="my-2">{service.title}</h5>
                                    <div className="image-container">
                                        <img className="w-100" src={service.url.default} alt=""/> 
                                    </div>
                                        
                                    <hr className="m-0"></hr>
                                        <div className="message justify-content-center h-100">
                                        <div className="d-flex align-items-center p-2">
                                            <p className="text-center">{service.message}</p>
                                        </div>
                                    </div>                          
                                </div> 
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="container-fluid py-5 bg-white">
                <div className="container">
                    <div className="row justify-content-around">
                        <div className="m-2 p-5 rounded-3">
                            <NavLink to="/classes">
                                <h2>CONOCE NUESTRAS CLASES</h2>
                            </NavLink>                
                        </div>
                    </div>
                </div>
            </div>
            <PricesTable/>
            <SocialMedia/>
        </div>
    )
}
export {Home};
