import React from "react";

const ContactForm = ()=> {
    return (
        <div className="bg-white py-5">
            <div className="container">
                <h2>Contáctanos</h2>
                <p>Para obtener más información, diligencia el siguiente formulario. Nos pondremos en contacto lo más pronto posible</p>
                <form>
                    <div className="row">
                        <div className="col-lg-4 form-group">
                            <label>Nombre</label>
                            <input/>
                        </div>
                        <div className="col-lg-3 form-group">
                            <label>Teléfono</label>
                            <input/>
                        </div>
                        <div className="col-lg-3 form-group">
                            <label>Correo electrónico</label>
                            <input/>
                        </div>
                        <div className="col-lg-2">
                            <button className="btn">Enviar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export {ContactForm};