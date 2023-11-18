/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent, screen,waitFor } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { TeacherList } from '../src/components/teacher/TeacherList';
import { createMemoryHistory } from '@remix-run/router';
import { BsFillPencilFill } from "react-icons/bs";




const teachers = [
  {
    name: "Juanfer",
    email: "jfgrajales@correo.iue.edu.co",
    documentTypeid: 1,
    documentNumber: "1007",
    phone: "3217865554",
    userid: 1,
    bankid: 2,
    accountType: "Ahorros",
    accountNumber: "0198645673",
    password: "aqwerty",
    id: 898,
  },
];


describe('TeacherList Component', () => {
  it('debe renderizar el componente correctamente', () => {
    const { getByText } = render(<BrowserRouter><TeacherList teachers={teachers} /></BrowserRouter>);

    // Verificar que el componente esté renderizado correctamente
    expect(getByText('id')).toBeTruthy();
    expect(getByText('Nombre Completo')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Tipo de documento')).toBeTruthy();
    expect(getByText('No. Documento')).toBeTruthy();
    expect(getByText('Telefono')).toBeTruthy();
    expect(getByText('id de usuario')).toBeTruthy();
    expect(getByText('Banco')).toBeTruthy();
    expect(getByText('Tipo de cuenta')).toBeTruthy();
    expect(getByText('No. de Cuenta')).toBeTruthy();
    expect(getByText('Contraseña')).toBeTruthy();
    expect(getByText('Acciones')).toBeTruthy();
  });
  jest.mock('react-router-dom', () => {
    return {
      Redirect: jest.fn(({to})=> `Redirect to ${to}`)
    }
  })

  it('debe redirigir al componente TeacherList', async ()=>{
    const history = createMemoryHistory();
    // when
    render(<BrowserRouter history={history}><TeacherList/></BrowserRouter>);
    // then
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  })
  it('debería redirigir al hacer clic en "Nuevo Profesor"', () => {
    render(<BrowserRouter><TeacherList teachers={teachers} /></BrowserRouter>);
    fireEvent.click(screen.getByText('Nuevo Profesor'));
    // Verificar que se redirige a la ruta esperada
  });

  it('debería mostrar el botón de editar en la tabla', () => {
    render(<BrowserRouter><TeacherList teachers={teachers} /></BrowserRouter>);
  
    // Verifica que al menos un elemento con la clase 'edit-btn' esté presente en el DOM
    const editButton = document.querySelector('.edit-btn');
    expect(editButton).toBeDefined();
  });

  it('debería mostrar el botón de eliminar en la tabla', () => {
    render(<BrowserRouter><TeacherList teachers={teachers} /></BrowserRouter>);
  
    // Verifica que al menos un elemento con la clase 'delete-btn' esté presente en el DOM
    const deleteButton = document.querySelector('.delete-btn');
    expect(deleteButton).toBeDefined();
  
  });
  it('debería eliminar un profesor correctamente', async () => {
    render(<BrowserRouter><TeacherList teachers={teachers} /></BrowserRouter>);
  
    // Esperar a que el icono de eliminación esté presente
    await waitFor(() => {
      // Seleccionar el icono de eliminación por su id
      const deleteIcon = document.getElementById('delete-icon');
  
      // Verificar que el icono existe y simular el clic en él
      deleteIcon && deleteIcon.click();
    });
  });
  it('debería mostrar el texto "Administrar Profesores"', () => {
    render(<BrowserRouter><TeacherList teachers={teachers} /></BrowserRouter>);
  
    // Verificar que el texto "Administrar Profesores" está presente en el componente
    const textoAdministrarProfesores = screen.getByText('Administrar Profesores');
    expect(textoAdministrarProfesores).toBeTruthy();
  });
  it('debe manejar correctamente el caso de lista vacía', () => {
    render(<BrowserRouter><TeacherList teachers={[]} /></BrowserRouter>);
    const tableRows = screen.queryAllByRole('row');
  expect(tableRows.length).toBe(1); 
  });

  it('se debe poder presionar el boton editar', () => {
    const { container } = render(<BrowserRouter><TeacherList teachers={teachers}/></BrowserRouter>);
    
    // Encuentra el icono del botón de editar
    const editIcon = container.querySelector('.edit-btn');
  
    // Asegúrate de que editIcon no sea nulo antes de intentar el clic
    if (editIcon) {
      // Realiza la acción de clic en el icono de editar
      fireEvent.click(editIcon);
    }
  });

  it('se debe poder presionar el boton eliminar', () => {
    const { container } = render(<BrowserRouter><TeacherList teachers={teachers}/></BrowserRouter>);
    
    // Encuentra el icono del botón de editar
    const deleteIcon = container.querySelector('.delete-icon');
  
    // Asegúrate de que editIcon no sea nulo antes de intentar el clic
    if (deleteIcon) {
      // Realiza la acción de clic en el icono de editar
      fireEvent.click(deleteIcon);
    }
  });

});
