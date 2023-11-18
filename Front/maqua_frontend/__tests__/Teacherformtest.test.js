/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Teacherform } from '../src/components/teacher/Teacherform';
import { BrowserRouter } from 'react-router-dom';



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

  describe('Teacherform Component', () => {
    it('debe renderizar el componente correctamente', () => {
      const { getByText } = render(<BrowserRouter><Teacherform/></BrowserRouter>);
      
      // Verifica que el componente esté renderizado correctamente
      expect(getByText('Nombre Completo')).toBeTruthy();
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('Tipo de documento')).toBeTruthy();
      expect(getByText('No. Documento')).toBeTruthy();
      expect(getByText('Telefono')).toBeTruthy();
      expect(getByText('Banco')).toBeTruthy();
      expect(getByText('Tipo de cuenta')).toBeTruthy();
      expect(getByText('No. de Cuenta')).toBeTruthy();
      expect(getByText('Contraseña')).toBeTruthy();
    });
    it('debe cerrar el formulario al hacer clic en el ícono de cierre', () => {
      const { container } = render(<BrowserRouter><Teacherform/></BrowserRouter>);
    
      const closeButtonContainer = container.querySelector('.form__close'); 
      const closeButton = closeButtonContainer.querySelector('svg');
    
      fireEvent.click(closeButton);
    });
    it('debe renderizar el componente correctamente con el botón correspondiente', () => {
      const { getByText } = render(<BrowserRouter><Teacherform/></BrowserRouter>);
    
  // Verifica que el botón se renderiza correctamente para "Crear" o "Editar"
  const buttonText = getByText((content, element) => {
    return element.tagName.toLowerCase() === 'button' && (content === 'Crear' || content === 'Editar');
  });

  expect(buttonText).toBeTruthy();
    });

    it('debería renderizar el componente correctamente y enviar el formulario', async () => {
      const { getByText, getByLabelText } = render(
        <BrowserRouter>
          <Teacherform />
        </BrowserRouter>
      );
  
      // Verifica que el botón se renderiza correctamente
      const buttonText = getByText((content, element) => {
        return element.tagName.toLowerCase() === 'button' && (content === 'Crear' || content === 'Editar');
      });
      expect(buttonText).toBeTruthy();
  
      // Simula la entrada de datos en los campos del formulario
      fireEvent.change(getByLabelText('Nombre Completo'), { target: { value: 'John Doe' } });
      fireEvent.change(getByLabelText('Email'), { target: { value: 'john@example.com' } });
      fireEvent.change(getByLabelText('Tipo de documento'), { target: { value: '1' } });
      fireEvent.change(getByLabelText('No. Documento'), { target: { value: '6543' } });
      fireEvent.change(getByLabelText('Telefono'), { target: { value: '1234' } });
      fireEvent.change(getByLabelText('Banco'), { target: { value: '3' } });
      fireEvent.change(getByLabelText('Tipo de cuenta'), { target: { value: 'Ahorros' } });
      fireEvent.change(getByLabelText('No. de Cuenta'), { target: { value: '654783' } });
      fireEvent.change(getByLabelText('Contraseña'), { target: { value: '6543' } });
      // ... Simula cambios en otros campos ...
  
      // Simula el clic en el botón de enviar
      fireEvent.click(buttonText);
  
      // Agrega una espera para asegurarse de que la lógica asíncrona se complete
      await waitFor(() => {
        expect(window.location.pathname).toBe('/teacher'); // Ajusta la ruta según tu aplicación
      });
    });

    it('debe mostrar el título correcto', () => {
      const { getByText } = render(<BrowserRouter><Teacherform/></BrowserRouter>);
    
      // Verifica que el título se renderiza correctamente para "Crear" o "Editar"
      const titleText = getByText((content, element) => {
        return element.tagName.toLowerCase() === 'h5' && (content === 'Crear Profesor' || content === 'Editar Profesor');
      });
    
      expect(titleText).toBeTruthy();
    });

    it('debería permitir la entrada de datos en los campos del formulario', () => {
      const { getByLabelText } = render(<BrowserRouter><Teacherform/></BrowserRouter>);
    
      // Simula la entrada de datos en los campos del formulario
      fireEvent.change(getByLabelText('Nombre Completo'), { target: { value: 'John Doe' } });
      fireEvent.change(getByLabelText('Email'), { target: { value: 'john@example.com' } });
      fireEvent.change(getByLabelText('Tipo de documento'), { target: { value: '1' } });
      fireEvent.change(getByLabelText('No. Documento'), { target: { value: '123456789' } });
      fireEvent.change(getByLabelText('Telefono'), { target: { value: '1234567890' } });
      fireEvent.change(getByLabelText('Banco'), { target: { value: '1' } });
      fireEvent.change(getByLabelText('Tipo de cuenta'), { target: { value: 'Ahorros' } });
      fireEvent.change(getByLabelText('No. de Cuenta'), { target: { value: '9876543210' } });
      fireEvent.change(getByLabelText('Contraseña'), { target: { value: 'password123' } });
    
      // Verifica que los campos del formulario se actualizan correctamente
      expect(getByLabelText('Nombre Completo').value).toBe('John Doe');
      expect(getByLabelText('Email').value).toBe('john@example.com');
      expect(getByLabelText('Tipo de documento').value).toBe('1');
      expect(getByLabelText('No. Documento').value).toBe('123456789');
      expect(getByLabelText('Telefono').value).toBe('1234567890');
      expect(getByLabelText('Banco').value).toBe('1');
      expect(getByLabelText('Tipo de cuenta').value).toBe('Ahorros');
      expect(getByLabelText('No. de Cuenta').value).toBe('9876543210');
      expect(getByLabelText('Contraseña').value).toBe('password123');
    });
    it('debería permitir editar un profesor existente', async () => {
      // Simular la edición de un profesor existente
      const { getByLabelText, getByText } = render(<BrowserRouter><Teacherform id="existingTeacherId" /></BrowserRouter>);
    
      // Modificar el nombre del profesor existente
      fireEvent.change(getByLabelText('Nombre Completo'), { target: { value: 'Jane Doe' } });
    
      // Verificar que el nombre se ha actualizado
      expect(getByLabelText('Nombre Completo').value).toBe('Jane Doe');
    
      // Simular el clic en el botón de editar
      fireEvent.click(getByText('Editar'));
    });

    it('debería permitir crear un nuevo profesor', async () => {
      const { getByText, getByLabelText } = render(
        <BrowserRouter>
          <Teacherform id="new" />
        </BrowserRouter>
      );
  
      // Verifica que el botón se renderiza correctamente
      const buttonText = getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === 'button' &&
          (content === 'Crear' || content === 'Editar')
        );
      });
      expect(buttonText).toBeTruthy();
  
      // Simula la entrada de datos en los campos del formulario
      fireEvent.change(getByLabelText('Nombre Completo'), {
        target: { value: 'Nuevo Profesor' },
      });
      fireEvent.change(getByLabelText('Email'), {
        target: { value: 'nuevo.profesor@example.com' },
      });
      fireEvent.change(getByLabelText('Tipo de documento'), {
        target: { value: '1' },
      });
      fireEvent.change(getByLabelText('No. Documento'), {
        target: { value: '123456789' },
      });
      // ... Simula cambios en otros campos ...
  
      // Simula el clic en el botón de enviar
      fireEvent.click(buttonText);
    });



})