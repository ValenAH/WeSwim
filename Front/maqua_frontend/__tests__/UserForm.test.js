import React from 'react';
import { render,fireEvent, getByRole } from '@testing-library/react';
import { toHaveAttribute } from '@testing-library/jest-dom';
import { UserForm } from '../src/components/user/UserForm';
import { BrowserRouter } from 'react-router-dom';

describe('UserForm component', ()=> {
    it('The component render properly', () =>{
        const {getByText, getByPlaceholderText} = render(<BrowserRouter><UserForm/></BrowserRouter>)

        expect(getByText('Nombre de usuario')).toBeTruthy();
        expect(getByText('Contraseña')).toBeTruthy();

        const userInput = getByPlaceholderText('Usuario');
        const passwordInput = getByPlaceholderText('Contraseña');

        expect(userInput).toBeTruthy();
        expect(userInput).toHaveAttribute('type','text');
        expect(passwordInput).toBeTruthy();
        expect(passwordInput).toHaveAttribute('type','text');
    })

    it('Button should be disabled for empty user', async () =>{
        const {getByRole, getByPlaceholderText} = render(<BrowserRouter><UserForm/></BrowserRouter>)

        const userInput = getByPlaceholderText('Usuario');
        fireEvent.change(userInput, {'target':{'value': ''}})
        const btn = getByRole('button', {name: 'Actualizar'})
        expect(btn).toHaveAttribute('disabled');

        fireEvent.change(userInput, {'target':{'value': 'valen'}})
        expect(btn).not.toHaveAttribute('disabled');
    })
})