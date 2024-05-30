import React from "react";
import { Gallery } from "./gallery/gallery";
import { SocialMedia } from "./social-media/social-media";
import { PricesTable } from "./pricesTable/pricesTable";
import { NavLink } from "react-router-dom";

const Home = () => {
    const services = [
        {
            url: require('../../../assets/images/Niños.jpg'),
            title: "Clases para niños"
        },
        {
            url: require('../../../assets/images/Niños.jpg'),
            title: "Clases para adultos"
        },
        {
            url: require('../../../assets/images/Acondicionamiento.jpg'),
            title: "Acondicionamiento físico"
        },
        {
            url: require('../../../assets/images/Competencia.jpg'),
            title: "Preparación de nadadores para competencia"
        },
        {
            url: require('../../../assets/images/Autismo.jpg'),
            title: "Autismo y Síndrome de Down"
        },
        {
            url: require('../../../assets/images/Autismo.jpg'),
            title: "Terapias"
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
                                <div className="col-lg-3 m-2 bg-white p-2 rounded-3">
                                    <h5>{service.title}</h5>
                                    <img className="w-100" src={service.url.default} alt=""/>
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
