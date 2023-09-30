package com.demo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@SpringBootTest
@AutoConfigureMockMvc
class DemoJgpApplicationTests {

	@Autowired
	private MockMvc mockMvc;
	// (Escenario)
	// (Given) some context
	// (When) some action is carried out
	// (Then) a particular set of observable consequences should obtain

	/*
	 * Un ejemplo: Retiro de un Cajero Dado que mi cuenta bancaria tiene crédito y
	 * no hice retiros recientemente, Cuando intento retirar una cantidad menor que
	 * el límite de mi tarjeta, Entonces el retiro debe completarse sin errores ni
	 * advertencias. // JBehave, RSpec o Cucumber
	 * https://openwebinars.net/blog/que-es-gherkin/
	 */
			
	// Escenario 1: Realizo el llamado a la URL me saluda con mi nombre
	// GIVEN: Dado que el servicio puede ser llamado desde una URL enviando mi
	// nombre
	// WHEN: Cuando invoco la URL
	// THEN: El servicio responde el Saludo con mi nombre: Hello, Juan!
	@Test
	void Test0ValidarSaludo() throws Exception{
		//GIVEN:
		RequestBuilder request = get("/greeting").param("name", "IUE");	
		
		//WHEN:
		ResultMatcher requestExpected = jsonPath("$.content")
										.value("Hello, IUE!");	
		//THEN:
		this.mockMvc.perform(request)
				.andExpect(requestExpected);
	}
	
	
	
}
