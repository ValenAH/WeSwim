package com.backmaqua.entities;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
import java.util.Date;
import com.backmaqua.controller.transaction.TransactionController;
import com.backmaqua.entities.transaction.Transaction;
import com.backmaqua.entities.transaction.Transactions;
import com.backmaqua.repository.transaction.TransactionCRUDRepository;

@ExtendWith(MockitoExtension.class)
public class TransactionsControllerUnitTests {
	
	@InjectMocks
	TransactionController transactionController;

	@Mock
	TransactionCRUDRepository transactionRepositoryMock;

	@Test
	public void testAddTransaction() {

		// Given Algun Contexto de Variables
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		// When alguna Accion Requerida Entonces....
		Transaction transaction = new Transaction();
		transaction.setId((long)1);
		when( // Insertando un banco
				transactionRepositoryMock.save(any(Transaction.class))).thenReturn(transaction);

		
		
		// Entonces Realizo la prueba si es verdadera
		Transaction transactionToAdd = new Transaction((long)1,1,1,"metodo",new Date(),"1231231");
		ResponseEntity<Object> responseEntity = transactionController.addNewTransaction(transactionToAdd);

		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");

	}

	
	
}