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

import com.backmaqua.controller.bank.BankController;
import com.backmaqua.entities.bank.Bank;
import com.backmaqua.entities.bank.Banks;
import com.backmaqua.repository.bank.BankCRUDRepository;

@ExtendWith(MockitoExtension.class)
public class BankControllerUnitTests {
	
	@InjectMocks
	BankController bankController;

	@Mock
	BankCRUDRepository bankRepositoryMock;

	@Test
	public void testAddBank() {

		// Given Algun Contexto de Variables
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		// When alguna Accion Requerida Entonces....
		Bank bank = new Bank();
		bank.setId((long)1);
		when( // Insertando un banco
				bankRepositoryMock.save(any(Bank.class))).thenReturn(bank);

		
		
		// Entonces Realizo la prueba si es verdadera
		Bank bankToAdd = new Bank((long) 0, "Lokesh", "Gupta", "howtodoinjava@gmail.com", null, null);
		ResponseEntity<Object> responseEntity = bankController.addNewBankApi(bankToAdd);

		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");

	}

	@Test
	public void testFindAll() {
		// given
		Bank bank1 = new Bank((long) 0, "Lokesh", "Gupta", "howtodoinjava@gmail.com", null, null);
		Bank bank2 = new Bank((long) 0, "Alex", "Gussin", "example@gmail.com", null, null);
		List<Bank> list = new ArrayList<Bank>();
		list.addAll(Arrays.asList(bank1, bank2));

		when(bankRepositoryMock.findAll()).thenReturn(list);

		
		// when
		Banks result = bankController.getAllBanksApi();

		// then
		assertThat(result.getBankList().size()).isEqualTo(2);

		assertThat(result.getBankList().get(0).getNameBank()).isEqualTo(bank1.getNameBank());

		assertThat(result.getBankList().get(1).getNameBank()).isEqualTo(bank2.getNameBank());
	}

	
	
	@Test
	public void updateBankTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		Bank bank = new Bank();
		bank.setId((long) 1);

		when(bankRepositoryMock.save(any(Bank.class))).thenReturn(bank);

		// Entonces Realizo la prueba si es verdadera
		Bank bankToAdd = new Bank((long) 0, "Dua", "Lipa", "superman@gmail.com", null, null);
		ResponseEntity<Object> responseEntityCreate = bankController.addNewBankApi(bankToAdd);
		
		Bank bankToUpdate = new Bank((long) 0, "Super", "Man", "howtodoinjava@gmail.com", null, null);
		Bank responseEntityUpdate = bankController.updateBank(bankToUpdate);
		
		assertThat(responseEntityUpdate.equals(bankToUpdate));
		
	}

	
	@Test
	public void deleteBankTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		Bank bankBase = new Bank();
		bankBase.setId((long) 1);
		
		when(bankRepositoryMock.save(any(Bank.class))).thenReturn(bankBase);

		// Entonces Realizo la prueba si es verdadera
		Bank bank = new Bank((long) 0, "Dua", "Lipa", "dualipa@gmail.com", null, null);
		ResponseEntity<Object> responseEntityCreate = bankController.addNewBankApi(bank);
		
		ResponseEntity<String> responseEntityUpdate = bankController.deleteBankApi(bank);
				
		assertThat(responseEntityUpdate.equals(  HttpStatus.OK ));
		
	}
	
}
