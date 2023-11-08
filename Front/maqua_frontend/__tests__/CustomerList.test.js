import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {CustomerList} from '../src/components/customer/CustomerList';
import { BrowserRouter } from 'react-router-dom';



const customers = [
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
      const { getByText, getByPlaceholderText } = render(<BrowserRouter><CustomerList/></BrowserRouter>);
      
      // Verifica que el componente esté renderizado correctamente
      expect(getByText('Id')).toBeTruthy();
      expect(getByText('Nombre')).toBeTruthy();
      expect(getByText('Correo')).toBeTruthy();
      expect(getByText('Tipo de documento')).toBeTruthy();
      expect(getByText('Numero de documento')).toBeTruthy();
      expect(getByText('Dirección')).toBeTruthy();
      expect(getByText('Telefono')).toBeTruthy();
      expect(getByText('Id Usuario')).toBeTruthy();
      expect(getByText('Plan de Pago')).toBeTruthy();
      expect(getByText('Acciones')).toBeTruthy();


      // Verifica que se muestren los clientes en la tabla
    });
    
  
});