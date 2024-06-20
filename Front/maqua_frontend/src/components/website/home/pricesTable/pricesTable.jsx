import React from "react";
import './pricesTable.scss';

const ocean = require('../../../../assets/images/Ocean.jpg');

const PricesTable = () => {
    return (
        <div id="prices" className="position-relative">
            <img className="image" src={ocean.default} alt="" />
            <div className="container">
                <div className="table-div">
                    <h2 className="mt-md-5 text-white text-center">NUESTRAS TARIFAS</h2>
                    <p className="text-white">Los precios establecidos corresponden a la mensualidad <u>por persona</u>. Las clases tienen una duración de 50 minutos a 1 hora.</p>
                    <div className="mt-lg-5 table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>CLASES SEMANALES</th>
                                    <th>1 nadador</th>
                                    <th>2 nadadores</th>
                                    <th>3 nadadores o más</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>$ 230.000</td>
                                    <td>$ 190.000</td>
                                    <td>$ 170.000</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <th>$ 380.000</th>
                                    <th>$ 280.000</th>
                                    <th>$ 260.000</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-lg-5 text-white">*Recibe un 10% de descuento en tu primera mensualidad enviándonos por WhatsApp el siguiente código MAQUA-WEBSITE al momento de agendar tu clase de prueba.</p>
                </div>
            </div>
        </div>
    )
}

export { PricesTable };