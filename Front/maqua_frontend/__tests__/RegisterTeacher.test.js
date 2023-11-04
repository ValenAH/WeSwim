/** @jest-environment jsdom */
import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios"; 



jest.mock('react-modal', () => {
    return {
      setAppElement: () => {},
      afterOpen: () => {},
      beforeClose: () => {},
      setHideAppElement: () => {},
      injectGlobal: () => {},
      defaultStyles: {},
    };
  });
  import RegisterTeacher from '../src/components/auth/registration/register-teacher';

const mockResponse = {
  data: "Registro exitoso",
};

describe("RegisterTeacher Component", () => {
  it("renders without errors", () => {
    const { container } = render(<RegisterTeacher />);
    expect(container).toMatchSnapshot();
  });

  it("handles form submission and opens a modal on success", async () => {
    const { getByText, getByRole } = render(<RegisterTeacher />);

    // llenar los campos necesarios
    fireEvent.change(getByRole("textbox", { name: "name" }), {
      target: { value: "Test User" },
    });
    fireEvent.change(getByRole("textbox", { name: "email" }), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByRole("combobox", { name: "documentTypeid" }), {
      target: { value: "1" },
    });
    fireEvent.change(getByRole("textbox", { name: "documentNumber" }), {
      target: { value: "123456789" },
    });
    fireEvent.change(getByRole("textbox", { name: "phone" }), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByRole("combobox", { name: "bankid" }), {
      target: { value: "1" },
    });
    fireEvent.change(getByRole("combobox", { name: "accountType" }), {
      target: { value: "Ahorros" },
    });
    fireEvent.change(getByRole("textbox", { name: "accountNumber" }), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByRole("textbox", { name: "password" }), {
      target: { value: "password123" },
    });
    fireEvent.change(getByRole("textbox", { name: "passwordConfirmation" }), {
      target: { value: "password123" },
    });

    // exitosamente
    axios.post.mockResolvedValue(mockResponse);

    // completar el formulario
    fireEvent.click(getByText("Crear cuenta"));

    // Wait for the modal to appear
    await waitFor(() => {
      expect(getByText("Registro Exitoso")).toBeInTheDocument();
    });
  });

  it("handles form submission and displays an error message on failure", async () => {
    const { getByText, getByRole } = render(<RegisterTeacher />);

    // Fill in form fields
    fireEvent.change(getByRole("textbox", { name: "name" }), {
      target: { value: "Test User" },
    });
    fireEvent.change(getByRole("textbox", { name: "email" }), {
      target: { value: "test@example.com" },
    });

    // Mock a failed API call
    axios.post.mockRejectedValue(new Error("API call failed"));

    // Submit the form
    fireEvent.click(getByText("Crear cuenta"));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(getByText("Las contraseñas no coinciden")).toBeInTheDocument();
    });
  });
});