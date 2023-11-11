/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { UsersList } from '../src/components/user/UsersList';
import { BrowserRouter } from 'react-router-dom';

// Mock de los usuarios para pruebas
const users = [
    {
        user: "Valentina",
        password: "123",
        rolId: 1
    },
  ];

  describe('UsersList Component', () => {
    it('debe renderizar el componente correctamente', () => {
      const { getByText } = render(<BrowserRouter><UsersList /></BrowserRouter>);
      
      // Verifica que el componente esté renderizado correctamente
      expect(getByText('Nombre de usuario')).toBeTruthy();
      expect(getByText('Contraseña')).toBeTruthy();
      expect(getByText('Rol')).toBeTruthy();
    });



})