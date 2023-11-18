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
                        <h2>CLASES DE NATACIÓN A DOMICILIO EN MEDELLÍN</h2>
                        <p>Creemos en la importancia de aprender a nadar y disfrutar del agua en un entorno inclusivo y amigable.
                            <br/>Dictamos clases de natación a personas de todas las edades y capacidades, incluyendo aquellos con discapacidades físicas y cognitivas.
                            <br/>Lo mejor de todo es que nuestros profesores están capacitados para enseñar dos idiomas: inglés y español.
                            <br/>¡Únete a nosotros y sumérgete en la diversión de aprender a nadar!
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
