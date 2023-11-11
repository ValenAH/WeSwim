import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {CustomerForm} from '../src/components/customer/CustomerForm';
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
      const { getByText, getByPlaceholderText } = render(<BrowserRouter><CustomerForm /></BrowserRouter>);
      
      // Verifica que el componente esté renderizado correctamente
      expect(getByText('Name')).toBeTruthy();
      expect(getByText('email')).toBeTruthy();
      expect(getByText('Document Type id')).toBeTruthy();
      expect(getByText('Document Number')).toBeTruthy();
      expect(getByText('Address')).toBeTruthy();
      expect(getByText('Phone')).toBeTruthy();
      expect(getByText('user id')).toBeTruthy();
      expect(getByText('Payment Plan Id')).toBeTruthy();


      // Verifica que se muestren los clientes en la tabla
      expect(getByPlaceholderText('Ingrese un nombre')).toBeTruthy();
      expect(getByPlaceholderText('Ingrese un correo')).toBeTruthy();
      expect(getByPlaceholderText('Ingrese un numero de documento')).toBeTruthy();
      expect(getByPlaceholderText('Ingrese una dirección')).toBeTruthy();
      expect(getByPlaceholderText('Ingrese un numero de celular')).toBeTruthy();
      expect(getByPlaceholderText('Ingrese un usuario')).toBeTruthy();
      expect(getByPlaceholderText('Ingrese un plan de pago')).toBeTruthy();
    });
    
  
});