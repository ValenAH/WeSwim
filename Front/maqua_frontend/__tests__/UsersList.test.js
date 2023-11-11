/** @jest-environment jsdom */
import React from 'react';
import { render,waitFor,fetchMock } from '@testing-library/react';
import { UsersList } from '../src/components/user/UsersList';
import { BrowserRouter } from 'react-router-dom';
import { createMemoryHistory } from '@remix-run/router';

// Mock de los usuarios para pruebas
const fakeUsers = [
  {
      "id": 29,
      "password": "345",
      "rolId": 2,
      "user": "juan"
  },
  {
      "id": 30,
      "password": "678",
      "rolId": 1,
      "user": "valen"
  }
]

  describe('UsersList Component', () => {
    it('debe renderizar el componente correctamente', () => {
      const { getByText } = render(<BrowserRouter><UsersList /></BrowserRouter>);
      
      // Verifica que el componente esté renderizado correctamente
      expect(getByText('Administrar usuarios')).toBeTruthy();
      expect(getByText('Nombre de usuario')).toBeTruthy();
      expect(getByText('Contraseña')).toBeTruthy();
      expect(getByText('Rol')).toBeTruthy();
      expect(getByText('Acciones')).toBeTruthy();
    });

    jest.mock('react-router-dom', () => {
      return {
        Redirect: jest.fn(({to})=> `Redirect to ${to}`)
      }
    })

    it('debe redirigir al componente userList', async ()=>{
      const history = createMemoryHistory();
      // when
      render(<BrowserRouter history={history}><UsersList/></BrowserRouter>);
      // then
      await waitFor(() => {
        expect(history.location.pathname).toBe('/');
      });
    })
})