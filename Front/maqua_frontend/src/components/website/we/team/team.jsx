import React from "react";
import './team.scss';

const Team = ()=> {
    const teachers = [
        {
            name: "Mateo Ortiz Vargas",
            image: require("../../../../assets/images/ProfesorMateo.jpg"),
        },
        {
            name: "Santiago Osorio",
            image: require("../../../../assets/images/ProfesorSantiago.jpg"),
        },
        {
            name: "Laura Tamayo",
            image: require("../../../../assets/images/ProfesoraLaura.jpg"),
        }
    ]

    return (
        <div>
            <div className="container-fluid bg-white py-5">
                <div className="container">
                    <div className="row">
                        <h2>NUESTRO EQUIPO</h2>
                        <div className="teacher-container col-lg-12 rounded d-lg-flex my-3 p-5 gap-3">
                            <div className="col-lg-3 col-md-12">
                                <img className="w-100" src={teachers[0].image.default} alt="" />
                            </div>
                            <div className="col-lg-9 col-md-12 p-2">
                                <h2>{teachers[0].name}</h2>
                                <p className="fs-12">Soy el creador de MAQUA, llevo más de 10 años de experiencia en la enseñanza de la natación, he dedicado mi vida a perfeccionar técnicas y metodologías 
                                    para ayudar a mis estudiantes a alcanzar su máximo potencial en el agua. Durante mi carrera, he tenido el privilegio de 
                                    trabajar con una amplia variedad de nadadores, desde principiantes hasta atletas avanzados, adaptando mi enfoque a 
                                    las necesidades individuales de cada persona.
                                    <br />
                                    Realicé una certificación en Fitness Acuático la cuál me permite ofrecer un enfoque integral al entrenamiento, combinando 
                                    ejercicios aeróbicos y de resistencia en el medio acuático para mejorar la salud y el rendimiento físico. Además, como 
                                    nadador profesional, he competido a nivel nacional e internacional, representando a la Selección Antioquia de Natación 
                                    con gran orgullo y dedicación. 
                                    <br />
                                    <br />
                                    Mi pasión por la natación se refleja en cada sesión de entrenamiento, inspirando a mis estudiantes a superar sus límites y alcanzar nuevas metas.
                                </p>
                            </div>
                        </div>
                        <div className="teacher-container col-lg-12 rounded d-lg-flex my-3 p-5 gap-3">
                            <div className="col-lg-3 col-md-12">
                                <img className="w-100" src={teachers[1].image.default} alt="" />
                            </div>
                            <div className="col-lg-9 col-md-12 p-2">
                                <h2>{teachers[1].name}</h2>
                                <p className="fs-12">Tengo 30 años y he sido nadador desde muy joven. 
                                    Mi pasión por la natación comenzó en los semilleros de Comfama, donde recibí una sólida formación acuática. 
                                    A medida que aprendía los diferentes estilos y modalidades, mi amor por la natación crecía cada vez más. 
                                    <br/>
                                    Estuve fuera de la ntación durante un tiempo, exploré otras disciplinas deportivas, especialmente en las artes marciales, donde adquirí 
                                    nuevos conocimientos y habilidades. Años después, regresé a la natación, trayendo conmigo una rica experiencia en 
                                    búsqueda, rescate y salvamento acuático, gracias a mi formación en la Defensa Civil Colombiana y mi paso por el 
                                    cuerpo de Infantería de Marina.
                                    <br />
                                    <br />
                                    Actualmente, pertenezco al equipo Makos, que ha sido fundamental en mi desarrollo como jugador de underwater. 
                                    Estoy comprometido a compartir mi experiencia y conocimientos para ayudar a otros a alcanzar sus metas en la natación. 
                                    ¡Espero verte en la piscina!
                                </p>
                            </div>
                        </div>
                        <div className="teacher-container col-lg-12 rounded d-lg-flex my-3 p-5 gap-3">
                            <div className="col-lg-3 col-md-12">
                                <img className="w-100" src={teachers[2].image.default} alt="" />
                            </div>
                            <div className="col-lg-9 col-md-12 p-2">
                                <h2>{teachers[2].name}</h2>
                                <p className="fs-12">Mi pasión por el agua comenzó a los 5 años, cuando mis padres nos inscribieron a mi hermana y a mí en clases de natación. 
                                    A los 8 años, ingresé al club deportivo H2O, que se convirtió en mi segundo hogar y donde mi amor por la natación se transformó en una pasión competitiva. 
                                    Comencé a representar al club en festivales y competencias, descubriendo mis estilos y capacidades. 
                                    A los 13 años, me federé, enfrentándome a los mejores nadadores del país y conociendo muchos lugares en Colombia.
                                    <br />
                                    En 2020, iba a ser parte de la selección Antioquia, pero la pandemia lo impidió. 
                                    A pesar de esto, mis 12 años en la natación me han dado grandes amigos y un profundo autoconocimiento. 
                                    La natación ha sido un desafío tanto físico como mental, pero ha sido la mejor decisión de mi vida. 
                                    <br />
                                    <br />
                                    Soy lo que soy gracias a la natación, y espero compartir mi experiencia para inspirar y ayudar a otros. 
                                    Únete a mí y descubre cómo este maravilloso deporte puede transformar tu vida. ¡Nos vemos en la piscina!`
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {Team};