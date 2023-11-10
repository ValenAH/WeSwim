import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {RegisterStudent} from '../src/components/auth/registration/register-student';
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
        password: "",
    },
  ];

  
describe('CustomerForm Component', () => {
    it('debe renderizar el componente correctamente', () => {
      const { getByText, getByPlaceholderText } = render(<BrowserRouter><RegisterStudent/></BrowserRouter>);
      
      // Verifica que el componente esté renderizado correctamente
      expect(getByText('Nombre completo')).toBeTruthy();
      expect(getByText('Correo')).toBeTruthy();
      expect(getByText('Tipo de documento')).toBeTruthy();
      expect(getByText('No. Documento')).toBeTruthy();
      expect(getByText('Teléfono')).toBeTruthy();
      expect(getByText('Dirección')).toBeTruthy();
      expect(getByText('Sube una foto de perfil (Opcional)')).toBeTruthy();
      expect(getByText('Contraseña')).toBeTruthy();
      expect(getByText('Confirmar Contraseña')).toBeTruthy();
      expect(getByText('Acepto términos y condiciones')).toBeTruthy();
      

      // Verifica que se muestren los clientes en la tabla
    });
    
  
});