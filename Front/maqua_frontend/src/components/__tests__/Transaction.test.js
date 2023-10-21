/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TransactionTable from '../transactionhistory/TransactionTable';

// Mock de las transacciones para las pruebas
const transactions = [
  {
    id: 890,
    status: 1,
    quantity: 100,
    paymentMethod: 'Tarjeta',
    date: '2023-10-14T13:00:00',
  },
];

describe('TransactionTable Component', () => {
  it('debe renderizar el componente correctamente', () => {
    const { getByText, getByPlaceholderText } = render(<TransactionTable transactions={transactions} />);
    
    // Verifica que el componente esté renderizado correctamente
    expect(getByText('ID de transacción')).toBeTruthy();
    expect(getByText('Estado')).toBeTruthy();
    expect(getByText('Cantidad')).toBeTruthy();
    expect(getByText('Método de pago')).toBeTruthy();
    expect(getByText('Fecha de creación')).toBeTruthy();

    // Verifica que se muestren las transacciones en la tabla
    //expect(getByText('1')).toBeTruthy();
  });

  it('debe filtrar las transacciones correctamente', () => {
    const { getByText, getByPlaceholderText } = render(<TransactionTable transactions={transactions} />);
    
    const searchInput = getByPlaceholderText('Buscar...');
    
    // Filtra por ID de transacción
    fireEvent.change(searchInput, { target: { value: '890' } });
    expect(getByText('890')).toBeTruthy();
    
    // Filtra por Estado
    //fireEvent.change(searchInput, { target: { value: 'Completado' } });
    //expect(getByText('Completado')).toBeTruthy();
    
    // Filtra por Cantidad
    fireEvent.change(searchInput, { target: { value: '100' } });
    expect(getByText('$ 100')).toBeTruthy();
    
    // Filtra por Método de pago
    fireEvent.change(searchInput, { target: { value: 'Tarjeta' } });
    expect(getByText('Tarjeta')).toBeTruthy();
    
    // Filtra por Fecha de creación
    fireEvent.change(searchInput, { target: { value: 'Oct 14, 2023, 01:00 PM' } });
    expect(getByText('Oct 14, 2023, 01:00 PM')).toBeTruthy();
  });
  
});
