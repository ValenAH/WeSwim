import React, { useEffect, useState } from "react";
import { environment } from "../../../environments/environment";
import axios from "axios";

const PricesTable = () => {
    const [paymentPlans, setPaymentPlan] = useState([]);

    useEffect(()=> {
        const fetchData = async () => {
            await axios.get(`${environment.API_BACKEND}paymentPlans/GetPaymentPlans`)
            .then(res => setPaymentPlan(res.data.paymentPlansList))
            .catch(err => console.log(err));
        }
        fetchData();
    },[])
    return (
        <div className="contianer-fluid py-5">
            <div className="container">
                <h2>TABLA DE PRECIOS</h2>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Número de personas</th>
                                <th>Días por semana</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                paymentPlans.map((paymentPlan, index)=>{
                                    return <tr key={index}>
                                        <th>{paymentPlan.peopleQuantity}</th>
                                        <th>{paymentPlan.periodicity}</th>
                                        <th>{paymentPlan.price}</th>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export {PricesTable};