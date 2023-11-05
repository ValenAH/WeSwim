/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios"; 
import { TeacherList } from '../src/components/teacher/TeacherList';
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

  describe('TeacherList Component', () => {
    it('debe renderizar el componente correctamente', () => {
      const { getByText } = render(<BrowserRouter><TeacherList/></BrowserRouter>);
      
      // Verifica que el componente esté renderizado correctamente
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

})