import React from 'react';
const HolaMundoExtendedScript = () => {
    const Hello = 'Hola Mundo!';
    const isTrue = true;
    return(
        <div className="HolaMundo">
            <h1>{Hello}</h1>
            <h2>Curso Escencial</h2>

            <img 
            src="https://image.freepik.com/vector-gratis/fondo-tecnologia-cara-inteligencia-artificial-futurista_1017-18295.jpg" 
            alt="react"/>

            {isTrue ? <h4>Esto es Verdad</h4> : <h5>Es falso</h5>}
            {isTrue && <h4>Soy Verdad</h4> }
        </div>
    );
};

export default HolaMundoExtendedScript