import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomerForm from '../src/components/customer/CustomerForm'


const transactions = [
    {
        name: 'Maria',
        email: 'mimv@gmail.com',
        documentTypeId: 1,
        documentNumber: 1001587456,
        address: 'Calle 25',
        phone: '302369854',
        userId: 3,
        paymentPlanId: 30,
    },
  ];

  
describe('CustomerForm Component', () => {
    it('debe renderizar el componente correctamente', () => {
      const { getByText, getByPlaceholderText } = render(<CustomerForm customers={customers} />);
      
      // Verifica que el componente esté renderizado correctamente
      expect(getByText('id')).toBeTruthy();
      expect(getByText('name')).toBeTruthy();
      expect(getByText('email')).toBeTruthy();
      expect(getByText('documentTypeId')).toBeTruthy();
      expect(getByText('documentNumber')).toBeTruthy();
      expect(getByText('address')).toBeTruthy();
      expect(getByText('phone')).toBeTruthy();
      expect(getByText('userId')).toBeTruthy();
      expect(getByText('paymentPlanId')).toBeTruthy();


      // Verifica que se muestren los clientes en la tabla
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