import React from "react";
import { Gallery } from "./gallery/gallery";
import { ContactForm } from "./contact-form/contact-form";
import { SocialMedia } from "./social-media/social-media";
import { PricesTable } from "./pricesTable/pricesTable";

const Home = () => {
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
                    <div className="row text-center">
                        <h2>¿QUIÉNES SOMOS?</h2>
                        <p>Nosotros somos un grupo de profesores de natación y gimnasia acústica, con experiencia en la enseñanza de la natación en bebés, niños, adultos, tercera edad y personas con discapacidad fisica y cognitiva. Vamos a su unidad con todos los materiales para la clase.
                            <br />
                            Las clases de natación son para todas las edades, en español e inglés si prefieren. Las cuales tienen una duración de 50 minutos a 1 hora.
                        </p>
                    </div>
                </div>
            </div>
            <PricesTable/>
            <ContactForm/>
            <SocialMedia/>
        </div>
    )
}
export {Home};
