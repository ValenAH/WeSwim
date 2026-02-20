package com.backmaqua.entities;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.backmaqua.controller.customer.CustomerController;
import com.backmaqua.controller.user.UserController;
import com.backmaqua.entities.customer.Customer;
import com.backmaqua.entities.customer.Customers;
import com.backmaqua.entities.user.User;
import com.backmaqua.repository.customer.CustomerCRUDRepository;
import com.backmaqua.repository.user.UserCRUDRepository;

@ExtendWith(MockitoExtension.class)
public class CustomerControllerUnitTest {
	

	@InjectMocks
	CustomerController customerController;

	
	@InjectMocks
	UserController userController;
	
	@Mock
	UserCRUDRepository userRepositoryMock;

	@Mock
	CustomerCRUDRepository customerRepositoryMock;

	@Test
	public void testAddCustomer() {

		// Given Algun Contexto de Variables
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		// When alguna Accion Requerida Entonces....
        Customer customer = new Customer();
        customer.setId((long)1);
        when( // Insertando un cliente
               customerRepositoryMock.save(any(Customer.class))).thenReturn(customer);
		
		// Entonces Realizo la prueba si es verdadera
		Customer customerToAdd = new Customer(0L, "Daniel", "Perez", "ddp@gmail.com", "Cedula", "1039865789", "Calle 5 a Sur", "3023698547", 2L);
		ResponseEntity<Object> responseEntity = customerController.addCustomer(customerToAdd);


		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");

	} 
	
	

	@Test
	public void testFindAll() {
		// given
		Customer customer1 = new Customer(0L, "Daniel", "Perez", "ddp@gmail.com", "Cedula", "1039865789", "Calle 5 a Sur", "3023698547", 2L);
		Customer customer2 = new Customer(0L, "Laura", "Hernandez", "lhv@gmail.com", "Cedula", "1037698569", "Carrera 28 a Sur", "3115698549", 3L);
		List<Customer> list = new ArrayList<Customer>();
		list.addAll(Arrays.asList(customer1, customer2));

		when(customerRepositoryMock.findAll()).thenReturn(list);

		
		// when
		Customers result = customerController.getCustomers();

		// then
		assertThat(result.getCustomerList().size()).isEqualTo(2);

		assertThat(result.getCustomerList().get(0).getName()).isEqualTo(customer1.getName());

		assertThat(result.getCustomerList().get(1).getName()).isEqualTo(customer2.getName());
	}

	
	
	@Test
	public void updateCustomerTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		Customer customer = new Customer();
		customer.setId((long) 1);

		when(customerRepositoryMock.save(any(Customer.class))).thenReturn(customer);
		User user = new User();
		user.setId(5L);
		when(userRepositoryMock.findById(5L)).thenReturn(Optional.of(user));

		Customer customerToAdd = new Customer(0L, "Viviana", "Beltran", "vvb@gmail.com", "Cedula", "95698578", "Carrera 30 a Sur", "312654987", 4L);
		ResponseEntity<Object> responseEntityCreate = customerController.addCustomer(customerToAdd);

		Customer customerToUpdate = new Customer(0L, "Juan", "Garcia", "juan@gmail.com", "Cedula", "436985698", "Calle 40 a Sur", "312654987", 5L);
		Customer responseEntityUpdate = customerController.updateCustomer(customerToUpdate);

		assertThat(responseEntityUpdate).isNotNull();
		assertThat(responseEntityUpdate.getName()).isEqualTo(customerToUpdate.getName());
		
	}

	
	@Test
	public void deleteCustomerTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		Customer customerBase = new Customer();
		customerBase.setId((long) 1);
		
		when(customerRepositoryMock.save(any(Customer.class))).thenReturn(customerBase);

		// Entonces Realizo la prueba si es verdadera
		Customer customer = new Customer(0L, "Jorge", "Martinez", "jmm@gmail.com", "Cedula", "42654951", "Carrera 18 b Sur", "302654956", 5L);
		ResponseEntity<Object> responseEntityCreate = customerController.addCustomer(customer);
		
		ResponseEntity<String> responseEntityUpdate = customerController.deleteCustomerApi(customer);
				
		assertThat(responseEntityUpdate.getStatusCode()).isEqualTo(HttpStatus.OK);
		
	}
	
	

	
	
}
