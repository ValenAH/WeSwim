import React from "react";
import './pricesTable.scss';

const ocean = require('../../../assets/images/Ocean.jpg');

const PricesTable = () => {
    return (
        <div className="position-relative">
            <img className="image" src={ocean.default} alt="" />
            <div className="container">
                <div className="table-div">
                <h2 className="text-white text-center">NUESTRAS TARIFAS</h2>
                    <div>
                        <table className="table mx-5">
                            <thead>
                                <tr>
                                    <th>Número de personas</th>
                                    <th>Días por semana</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {PricesTable};