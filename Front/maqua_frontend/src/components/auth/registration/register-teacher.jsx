import React, { useRef, useState, useEffect } from "react";
import './register-teacher.scss';
import logo from "../../../assets/images/logo-maqua.svg";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";



const RegisterTeacher = () =>{
    
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <section className="register-page d-flex">
            <div className="left-container p-5">
                <h3 className="welcome text-center">BIENVENIDO A MAQUA</h3>
            </div>
            <div className="right-container m-3 px-5">
                <div className="d-flex justify-content-between align-items-center">
                    <img src={logo}></img>
                    <div className="d-flex flex-column">
                        <buton className="btn">Registrarse como profesor</buton>
                        <button className="btn__light">Registrarse como estudiante</button>
                    </div>
                </div>
                <h2>Crear cuenta de profesor</h2>
                <form>
                    <div className="row my-3">
                        <div className="col-lg-6 form-group">
                            <label>Nombre completo</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Correo</label>
                            <input type="email"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Tipo de documento</label>
                            <select id="opciones">
                                <option value="1">CC</option>
                                <option value="2">TI</option>
                                <option value="3">Pasaporte</option>
                            </select>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Numero de documento</label>
                            <input ></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Banco</label>
                            <select id="opciones">
                                <option value="1">Bancolombia</option>
                                <option value="2">Davivienda</option>
                                <option value="3">BBVA</option>
                            </select>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Tipo de cuenta</label>
                            <select id="opciones">
                                <option value="1">Ahorros</option>
                                <option value="2">Corriente</option>
                            </select>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Numero de cuenta</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Telefono</label>
                            <input></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Contraseña</label>
                            <input type="password"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Confirmar Contraseña</label>
                            <input type="password"></input>
                        </div>
                        <div className="col-lg-6 form-group">
                            <label>Sube una foto de perfil (Opcional)</label>
                            <input type="file"></input>
                        </div>
                    </div>
                    <div className="my-5 text-center">
                        <div>
                            <input className="m-2" type="checkbox"></input>
                            <label onClick={handleShow}>Acepto términos y condiciones</label>
                        </div>
                        <button className="btn__light mt-5">Crear cuenta</button>
                    </div>
                </form>
            </div>

            <Modal show={showModal} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header >
          <Modal.Title>Términos y Condiciones</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <p>

¡Bienvenido a WeSwim! Estamos emocionados de que hayas decidido unirte a nuestro programa de clases de natación personalizadas. Antes de comenzar, te pedimos que leas atentamente los siguientes términos y condiciones que rigen nuestra relación con los estudiantes. Al inscribirte en nuestras clases, aceptas cumplir con estos términos y condiciones.
<br /><br />
1. Descripción de WeSwim:<br />
WeSwim es un servicio que ofrece clases de natación personalizadas para todas las edades, ya sea para individuos o grupos. Nuestras clases son impartidas por instructores altamente calificados y experimentados, con el objetivo de promover la seguridad y el aprendizaje efectivo de la natación.
<br /><br />
2. Pago:<br />
2.1. Pago por Clase: Las clases de WeSwim se pagan individualmente por clase. El estudiante deberá realizar el pago por consignación o transferencia bancaria antes de la fecha programada de la clase. Los detalles bancarios para el pago se proporcionarán al momento de la reserva.
<br /><br />
3. Programación de Clases:
<br />
3.1. Reservas: Las clases deben programarse con anticipación. Los estudiantes pueden hacerlo poniéndose en contacto con nuestro equipo a través de los canales de comunicación proporcionados. Recomendamos programar las clases con la mayor anticipación posible para garantizar la disponibilidad del instructor.
<br />
3.2. Confirmación: WeSwim confirmará la fecha y hora de la clase después de recibir la reserva y el pago correspondiente. La confirmación se enviará al estudiante por correo electrónico o mensaje de texto.
<br /><br />
4. Piscina:
<br />
4.1. Responsabilidad del Estudiante: Los estudiantes deben proporcionar la piscina en la que se llevará a cabo la clase. Esta piscina debe cumplir con los requisitos de seguridad y estar adecuadamente mantenida. WeSwim no se hace responsable de la seguridad o el mantenimiento de la piscina proporcionada por el estudiante.
<br />
4.2. Requisitos de la Piscina: La piscina debe estar en buenas condiciones de limpieza y desinfección. Además, debe tener una profundidad y espacio adecuado para llevar a cabo las lecciones de natación de manera segura.
<br /><br />
5. Información del Estudiante:
<br />
5.1. Base de Datos: WeSwim mantendrá una base de datos de la información del estudiante, incluyendo nombre, edad, nivel de habilidad, información de contacto y registros de clases. Esta información se utilizará para gestionar las clases y mantener un registro de progreso del estudiante.
<br />
5.2. Privacidad: Respetamos la privacidad de nuestros estudiantes. Toda la información proporcionada se mantendrá confidencial y no se compartirá con terceros sin el consentimiento del estudiante, excepto en casos requeridos por la ley.
<br /><br />
6. Cancelaciones y Reembolsos:
<br />
6.1. Cancelaciones por Parte del Estudiante: Los estudiantes pueden cancelar una clase programada con al menos 24 horas de anticipación. En caso de cancelación dentro de las 24 horas previas a la clase, el estudiante no será elegible para un reembolso.
<br />
6.2. Cancelaciones por Parte de WeSwim: En caso de que WeSwim deba cancelar una clase debido a circunstancias imprevistas, se ofrecerá al estudiante la opción de reprogramar la clase o recibir un reembolso completo.
<br /><br />
7. Seguridad:
<br />
7.1. Seguridad en la Piscina: La seguridad del estudiante es de suma importancia. Los estudiantes deben seguir las instrucciones del instructor y tomar medidas de seguridad adecuadas durante la clase. WeSwim no se hace responsable de lesiones o accidentes que puedan ocurrir durante las clases.
<br /><br />
8. Cambios en los Términos y Condiciones:
WeSwim se reserva el derecho de realizar cambios en estos términos y condiciones en cualquier momento. Los estudiantes serán notificados de cualquier cambio mediante la publicación de una versión actualizada en nuestro sitio web.
<br /><br />
9. Contacto:
Si tienes alguna pregunta o necesitas aclaraciones sobre estos términos y condiciones, no dudes en contactarnos a través de los medios de comunicación proporcionados en nuestro sitio web.
<br />
Al inscribirte en las clases de WeSwim, aceptas cumplir con estos términos y condiciones. Gracias por confiar en nosotros para ayudarte a alcanzar tus objetivos de natación. ¡Esperamos verte en la piscina pronto!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
        </section>
    )
}

export default RegisterTeacher;