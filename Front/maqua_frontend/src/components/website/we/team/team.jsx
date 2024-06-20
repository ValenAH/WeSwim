import React from "react";
import './team.scss';

const Team = ()=> {
    const teachers = [
        {
            name: "Mateo Ortiz Vargas",
            image: require("../../../../assets/images/ProfesorMateo.jpg"),
            description: `Creador de MAQUA, tiene 10 de experiencia en la ensañanza de la natación. Certificado en Fitness Acuático. Nadador Profesional, Selección Antioquia de Natación`,
        },
        {
            name: "Santiago Osorio",
            image: require("../../../../assets/images/ProfesorSantiago.jpg"),
            description: "Tiene experiencia en salvamento",
        },
        {
            name: "Laura Tamayo",
            image: require("../../../../assets/images/ProfesoraLaura.jpg"),
            description: "Nadadora, selección antioquia",
        }
    ]

    return (
        <div>
            <div className="container-fluid bg-white py-5">
                <div className="container">
                    <div className="row">
                        <h2>NUESTRO EQUIPO</h2>
                        { teachers.map(teacher => {
                            return (
                                <div className="teacher-container col-lg-12 rounded d-lg-flex my-3 p-5 gap-3">
                                    <div className="col-lg-3 col-md-12">
                                        <img className="w-100" src={teacher.image.default} alt="" />
                                    </div>
                                    <div className="col-lg-8 col-md-12 p-2">
                                        <h2>{teacher.name}</h2>
                                        <p>{teacher.description}</p>
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