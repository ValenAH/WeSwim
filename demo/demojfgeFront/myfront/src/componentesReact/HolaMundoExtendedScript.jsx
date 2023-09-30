import React from "react";

const HolaMundoExtendedScript = () => {
const Hello = 'Hola Mundo!';
const isTrue = true;
    return(
        <div className="HolaMundo">
            <h1>{Hello}</h1>
            <h2>Curso Esencial</h2>

        <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?w=2000" 
        alt="react" />

        {isTrue ?  <h4>Esto es verdad</h4> :  <h5>Esto es falso</h5> }
        {isTrue && <h4>Soy verdad</h4>}
       

        </div>

    );


};

export default HolaMundoExtendedScript