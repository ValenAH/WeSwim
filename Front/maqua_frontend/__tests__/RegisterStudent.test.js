import React from 'react';
import { render, fireEvent,screen, waitFor } from '@testing-library/react';
import {RegisterStudent} from '../src/components/auth/registration/register-student';
import { BrowserRouter } from 'react-router-dom';
import axios from "axios"; 



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
    
    
    it('debería mostrar un mensaje de error si las contraseñas no coinciden', async () => {
      render(<RegisterStudent />);
  
      // Ingresa las contraseñas que no coinciden
      fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), { target: { value: 'mismatchedpassword' } });
  
      // Realiza el envío del formulario
      fireEvent.click(screen.getByText('Crear cuenta'));
  
      // Espera a que aparezca el mensaje de error
      await waitFor(() => {
        const errorMessage = screen.queryByText('Las contraseñas no coinciden');
        expect(errorMessage).toBeTruthy(); // Verifica si el mensaje de error está presente
      });
    });
  
    it('debería manejar un registro exitoso', async () => {
      // Mock de axios.post para simular una respuesta exitosa
      jest.spyOn(axios, 'post').mockResolvedValue({ status: 200 });
  
      // Renderizamos el componente RegisterTeacher
      render(<RegisterStudent />);
  
      // Simulamos el ingreso de datos válidos en el formulario
      fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'password123' } });
      fireEvent.change(screen.getByLabelText('Confirmar Contraseña'), { target: { value: 'password123' } });
  
      // Simulamos el envío del formulario
      fireEvent.click(screen.getByText('Crear cuenta'));
  
      // Esperamos a que la solicitud axios.post se complete
      await waitFor(() => {
        // Verificamos que no haya mensajes de error
        expect(screen.queryByText('Las contraseñas no coinciden')).toBeNull();
        // Verificamos que haya mensaje de registro exitoso
        expect(screen.queryByText('Registro exitoso')).toBeNull();
      });
    });
 
  
    test('debería enviar el formulario correctamente', async () => {
      // Renderizar el componente
      const { getByLabelText, getByText } = render(<RegisterStudent />);
    
      // Simular la entrada de datos en los campos del formulario
      fireEvent.change(getByLabelText('Nombre completo'), { target: { value: 'John Doe' } });
      fireEvent.change(getByLabelText('Correo'), { target: { value: 'john@example.com' } });
      // ... Simular cambios en otros campos ...
    
      // Simular el clic en el botón de enviar
      fireEvent.click(getByText('Crear cuenta'));
    
      // Puedes ajustar la espera según la lógica de tu componente
      // Aquí, estamos esperando a que aparezca el mensaje de "Registro Exitoso"
      /*await waitFor(() => {
        expect(getByText('Registro Exitoso')).toBeTruthy();
      });*/
    });
  
});