import React from "react";

const Team = ()=> {
    const teachers = [
        {
            name: "Mateo Ortiz Vargas",
            image: require("../../../../assets/images/ProfesorSantiago.jpeg"),
            description: "Creador de MAQUA,tiene 10 de experiencia en la ensañanza de la natación.",
        },
        {
            name: "Santiago Osorio",
            image: require("../../../../assets/images/ProfesorSantiago.jpeg"),
            description: "Tiene experiencia en salvamento",
        },
        {
            name: "Laura Tamayo",
            image: require("../../../../assets/images/ProfesoraLaura.jpeg"),
            description: "Nadadora, selección antioquia",
        }
    ]

    return (
        <div>
            <div className="container-fluid bg-white py-5">
                <div className="container">
                    <div className="row text-center">
                        <h2>NUESTRO EQUIPO</h2>
                        { teachers.map(teacher => {
                            return (
                                <div className="d-flex">
                                    <div className="w-30">
                                        <img className="w-100" src={teacher.image.default} alt="" />
                                    </div>
                                    <div className="w-70">
                                        <h2>{teacher.name}</h2>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Team};