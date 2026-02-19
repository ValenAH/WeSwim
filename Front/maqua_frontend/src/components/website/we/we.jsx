import React from "react";
import { Team } from "./team/team";

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
            <Team/>
        </div>
    )
}
export {We};