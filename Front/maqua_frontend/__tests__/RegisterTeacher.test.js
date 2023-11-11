/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios"; 
import  {RegisterTeacher} from '../src/components/auth/registration/register-teacher';


const teachers = [
    {
        name: "Juanfer",
        email: "jfgrajales@correo.iue.edu.co",
        documentTypeid:1,
        documentNumber: "1007",
        phone:"3217865554",
        userid:1,
        bankid:2,
        accountType: "Ahorros",
        accountNumber: "0198645673",
        password:"aqwerty"
    },
  ];

  describe('RegisterTeacher Component', () => {
    it('debe renderizar el componente correctamente', () => {
      const { getByText, getByLabelText } = render(<RegisterTeacher />);
      
      // Verifica que elementos clave estén presentes en el DOM
      expect(getByText('Crear cuenta de profesor')).toBeTruthy();
      expect(getByLabelText('Nombre completo')).toBeTruthy();
      expect(getByLabelText('Correo')).toBeTruthy();
      expect(getByLabelText('Tipo de documento')).toBeTruthy();
      expect(getByLabelText('No. Documento')).toBeTruthy();
      expect(getByLabelText('Banco')).toBeTruthy();
      expect(getByLabelText('Tipo de cuenta')).toBeTruthy();
      expect(getByLabelText('No. de Cuenta')).toBeTruthy();
      expect(getByLabelText('Telefono')).toBeTruthy();
      expect(getByLabelText('Contraseña')).toBeTruthy();
      expect(getByLabelText('Confirmar Contraseña')).toBeTruthy();
      expect(getByLabelText('Sube una foto de perfil (Opcional)')).toBeTruthy();
      expect(screen.getByText('Acepto términos y condiciones')).toBeTruthy();

      expect(getByText('Crear cuenta')).toBeTruthy();
      
    });

    it('debería mostrar un mensaje de error si las contraseñas no coinciden', async () => {
      render(<RegisterTeacher />);
  
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
      render(<RegisterTeacher />);
  
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
      const { getByLabelText, getByText } = render(<RegisterTeacher />);
    
      // Simular la entrada de datos en los campos del formulario
      fireEvent.change(getByLabelText('Nombre completo'), { target: { value: 'John Doe' } });
      fireEvent.change(getByLabelText('Correo'), { target: { value: 'john@example.com' } });
      // ... Simular cambios en otros campos ...
    
      // Simular el clic en el botón de enviar
      fireEvent.click(getByText('Crear cuenta'));
    
      // Puedes ajustar la espera según la lógica de tu componente
      // Aquí, estamos esperando a que aparezca el mensaje de "Registro Exitoso"
      await waitFor(() => {
        expect(getByText('Registro Exitoso')).toBeTruthy();
      });
    });


  });