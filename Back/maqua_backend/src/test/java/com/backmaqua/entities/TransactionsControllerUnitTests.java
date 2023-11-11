package com.backmaqua.entities;

import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.Date;
import java.util.function.Consumer;

import com.backmaqua.controller.transaction.TransactionController;
import com.backmaqua.entities.transaction.Transaction;
import com.backmaqua.repository.transaction.TransactionCRUDRepository;

@ContextConfiguration(classes = {TransactionController.class})
@ExtendWith(SpringExtension.class)
public class TransactionsControllerUnitTests {

	@MockBean
	private TransactionCRUDRepository transactionCRUDRepository;

	@Autowired
	private TransactionController transactionController;


	@Test
	void testAddNewTransactionWithError() throws Exception {
		Transaction transaction = new Transaction();
		transaction.setDate(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
		transaction.setId(1L);
		transaction.setIdUser("Id User");
		transaction.setPaymentMethod("Payment Method");
		transaction.setQuantity(1);
		transaction.setStatus(1);
		String content = (new ObjectMapper()).writeValueAsString(transaction);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/transactionAPI/add")
				.contentType(MediaType.APPLICATION_JSON)
				.content(content);
		ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(transactionController)
				.build()
				.perform(requestBuilder);
		actualPerformResult.andExpect(MockMvcResultMatchers.status().is(400))
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(MockMvcResultMatchers.content().string("Id must be null"));
	}

	@Test
	void testAddNewTransaction() throws Exception {
		Transaction transaction = new Transaction();
		transaction
				.setDate(java.util.Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
		transaction.setId(1L);
		transaction.setIdUser("Id User");
		transaction.setPaymentMethod("Payment Method");
		transaction.setQuantity(1);
		transaction.setStatus(1);
		when(transactionCRUDRepository.save(Mockito.<Transaction>any())).thenReturn(transaction);
		java.sql.Date date = mock(java.sql.Date.class);
		when(date.getTime()).thenReturn(10L);

		Transaction transaction2 = new Transaction();
		transaction2.setDate(date);
		transaction2.setId(null);
		transaction2.setIdUser("Id User");
		transaction2.setPaymentMethod("Payment Method");
		transaction2.setQuantity(1);
		transaction2.setStatus(1);
		String content = (new ObjectMapper()).writeValueAsString(transaction2);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/transactionAPI/add")
				.contentType(MediaType.APPLICATION_JSON)
				.content(content);
		ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(transactionController)
				.build()
				.perform(requestBuilder);
		actualPerformResult.andExpect(MockMvcResultMatchers.status().isCreated())
				.andExpect(MockMvcResultMatchers.redirectedUrl("http://localhost/api/transactionAPI/add/1"));
	}

	@Test
	void testDeleteTransactionApi() throws Exception {
		doNothing().when(transactionCRUDRepository).deleteById(Mockito.<Long>any());

		Transaction transaction = new Transaction();
		transaction.setDate(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
		transaction.setId(1L);
		transaction.setIdUser("Id User");
		transaction.setPaymentMethod("Payment Method");
		transaction.setQuantity(1);
		transaction.setStatus(1);
		String content = (new ObjectMapper()).writeValueAsString(transaction);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/transactionAPI/transactionremove")
				.contentType(MediaType.APPLICATION_JSON)
				.content(content);
		MockMvcBuilders.standaloneSetup(transactionController)
				.build()
				.perform(requestBuilder)
				.andExpect(MockMvcResultMatchers.status().isOk());
	}

	@Test
	void testGetAllTransactionsApi() throws Exception {
		Iterable<Transaction> iterable = mock(Iterable.class);
		doNothing().when(iterable).forEach(Mockito.<Consumer<Transaction>>any());
		when(transactionCRUDRepository.findAll()).thenReturn(iterable);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/transactionAPI/getAllTransactions");
		MockMvcBuilders.standaloneSetup(transactionController)
				.build()
				.perform(requestBuilder)
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(MockMvcResultMatchers.content().string("{\"transactionList\":[]}"));
	}

	@Test
	void testGetTransactionsByUserId() throws Exception {
		when(transactionCRUDRepository.findByIdUser(Mockito.<String>any())).thenReturn(new ArrayList<>());
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
				.get("/api/transactionAPI/getTransactionByUser/{idUser}", "Id User");
		MockMvcBuilders.standaloneSetup(transactionController)
				.build()
				.perform(requestBuilder)
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(MockMvcResultMatchers.content().string("[]"));
	}

	@Test
	void testUpdateTransaction() throws Exception {
		Transaction transaction = new Transaction();
		transaction.setDate(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
		transaction.setId(1L);
		transaction.setIdUser("Id User");
		transaction.setPaymentMethod("Payment Method");
		transaction.setQuantity(1);
		transaction.setStatus(1);
		when(transactionCRUDRepository.save(Mockito.<Transaction>any())).thenReturn(transaction);

		Transaction transaction2 = new Transaction();
		transaction2.setDate(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
		transaction2.setId(1L);
		transaction2.setIdUser("Id User");
		transaction2.setPaymentMethod("Payment Method");
		transaction2.setQuantity(1);
		transaction2.setStatus(1);
		String content = (new ObjectMapper()).writeValueAsString(transaction2);
		MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/transactionAPI/updatetransaction")
				.contentType(MediaType.APPLICATION_JSON)
				.content(content);
		MockMvcBuilders.standaloneSetup(transactionController)
				.build()
				.perform(requestBuilder)
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content().contentType("application/json"))
				.andExpect(MockMvcResultMatchers.content()
						.string(
								"{\"id\":1,\"status\":1,\"quantity\":1,\"paymentMethod\":\"Payment Method\",\"date\":0,\"idUser\":\"Id User\"}"));
	}


	
	
}