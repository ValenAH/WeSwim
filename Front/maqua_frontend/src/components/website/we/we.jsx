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
                            <p>Nosotros somos un grupo de profesores de natación y gimnasia acúatica, con experiencia en la enseñanza de la natación en bebés, niños, adultos, tercera edad y personas con discapacidad fisica y cognitiva. Vamos a su unidad con todos los materiales para la clase.
                                <br />
                                Las clases de natación son para todas las edades, en español e inglés si prefieren, las cuales tienen una duración de 50 minutos a 1 hora.
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