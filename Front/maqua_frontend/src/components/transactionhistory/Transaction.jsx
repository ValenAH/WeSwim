import React, { useState, useEffect } from "react";

import TransactionTable from "./TransactionTable";
import axios from "axios";

const Transaction = () => {

  const TransactionData = [
    {
      "id": 1,
      "status": 1,
      "quantity": 100000,
      "paymentMethod": "Credit Card",
      "date": "2023-10-12T00:00:00.000+00:00",
      "idUser": "1000752722"
    }
  ];

  const [transactions, setTransactions] = useState(TransactionData);
  const apiUrl = "http://localhost:9009/api/transactionAPI";

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(apiUrl + "/getAllTransactions")
        .then(result => setTransactions(result.data.transactionList))
        .catch(err => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Resumen de ingresos</h1>
      <div className="flex-row">
        <div className="flex-large">
          <TransactionTable
            transactions={transactions}
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
