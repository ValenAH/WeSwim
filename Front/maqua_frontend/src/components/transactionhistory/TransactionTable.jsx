import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
//import './Transaction.scss';

const statusMap = {
  0: 'Completado',
  1: 'En progreso',
  2: 'Rechazado',
};

const statusColors = {
  0: '#edffea',
  1: '#fff6e9',
  2: '#edc7c7',
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
  return `${formattedDate}`;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(amount);
};

const TransactionTable = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRowSelection = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const clearSelectedRows = () => {
    setSelectedRows([]);
  };

  const filteredTransactions = props.transactions.filter((transaction) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      transaction.id.toString().includes(searchTermLower) ||
      statusMap[transaction.status].toLowerCase().includes(searchTermLower) ||
      formatCurrency(transaction.quantity).toLowerCase().includes(searchTermLower) ||
      transaction.paymentMethod.toLowerCase().includes(searchTermLower) ||
      formatDate(transaction.date).toLowerCase().includes(searchTermLower)
    );
  });  

  const exportData = props.transactions
    .filter((transaction) => selectedRows.includes(transaction.id.toString()))
    .map((transaction) => {
      return {
        'ID de transacción': transaction.id,
        'Estado': statusMap[transaction.status],
        'Cantidad': formatCurrency(transaction.quantity),
        'Método de pago': transaction.paymentMethod,
        'Fecha de creación': formatDate(transaction.date),
      };
    });

  const csvData = exportData.length > 0 ? exportData : [{ 'No hay transacciones seleccionadas': '' }];

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedRows.length > 0 && (
          <CSVLink
            data={csvData}
            filename="transactions.csv"
            className="btn btn-success"
            onClick={clearSelectedRows}
          >
            Exportar seleccionados
          </CSVLink>
        )}
      </div>

      <table className="table table-hover mt-3">
        <thead className="table-light">
          <tr>
            <th scope="col">ID de transacción</th>
            <th scope="col">Estado</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Método de pago</th>
            <th scope="col">Fecha de creación</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction) => (
              <tr className='tr-transactions' key={transaction.id.toString()}>
                <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(transaction.id.toString())}
                  onChange={() => toggleRowSelection(transaction.id.toString())}
                />
                {transaction.id}
              </td>
              
                <td>
                  <span className='p-2 rounded'  style={{ backgroundColor: statusColors[transaction.status] }}>
                  {statusMap[transaction.status]}
                  </span>
                </td>
                <td>{formatCurrency(transaction.quantity)}</td>
                <td>{transaction.paymentMethod}</td>
                <td>{formatDate(transaction.date)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No hay transacciones</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;


