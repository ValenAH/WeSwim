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
import com.backmaqua.controller.user.UserController;
import com.backmaqua.entities.accountType.AccountType;
import com.backmaqua.entities.accountType.AccountTypes;
import com.backmaqua.entities.user.User;
import com.backmaqua.entities.user.Users;
import com.backmaqua.repository.accountType.AccountTypeCRUDRepository;
import com.backmaqua.controller.accountType.*;

@ExtendWith(MockitoExtension.class)
public class AccountTypeControllerUnitTests {

	@InjectMocks
	AccountTypeController accountTypeController;
	
	@Mock
	AccountTypeCRUDRepository accountTypeRepositoryMock;
	
	@Test
	public void testAddAccountType() {
		//Given
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
		
		//When
		AccountType accountType = new AccountType();
		accountType.setId((long)1);
		//Insert an user
		when( accountTypeRepositoryMock.save(any(AccountType.class))).thenReturn(accountType);
		
		// Entonces Realizo la prueba si es verdadera
		AccountType accountTypeToAdd = new AccountType((long) 0, "ahorros", (long)2);
		ResponseEntity<Object> responseEntity = accountTypeController.addAccountType(accountTypeToAdd);

		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");
	}
	
	@Test
	public void testFindAll() {
		// given
		AccountType accountType1 = new AccountType((long) 0, "Lokesh", (long)1);
		AccountType accountType2 = new AccountType((long) 0, "Alex", (long)2);
		List<AccountType> list = new ArrayList<AccountType>();
		list.addAll(Arrays.asList(accountType1, accountType2));

		when(accountTypeRepositoryMock.findAll()).thenReturn(list);

		
		// when
		AccountTypes result = accountTypeController.getAccountTypes();

		// then
		assertThat(result.getAccountTypesList().size()).isEqualTo(2);

		assertThat(result.getAccountTypesList().get(0).getAccountType()).isEqualTo(accountType1.getAccountType());

		assertThat(result.getAccountTypesList().get(1).getAccountType()).isEqualTo(accountType2.getAccountType());
	}
	
	@Test
	public void updateAccountTypeTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		AccountType accountType = new AccountType();
		accountType.setId((long) 1);

		when(accountTypeRepositoryMock.save(any(AccountType.class))).thenReturn(accountType);

		// Entonces Realizo la prueba si es verdadera
		AccountType accountTypeToUpdate = new AccountType((long) 0, "Super", (long)1);
		AccountType responseEntityUpdate = accountTypeController.updateAccountType(accountTypeToUpdate);
		
		assertThat(responseEntityUpdate.equals(accountTypeToUpdate));
		
	}
	
	@Test
	public void deleteAccountTypeTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		AccountType accountTypeBase = new AccountType();
		accountTypeBase.setId((long) 1);
		
		when(accountTypeRepositoryMock.save(any(AccountType.class))).thenReturn(accountTypeBase);

		// Entonces Realizo la prueba si es verdadera
		AccountType accountType = new AccountType((long) 0, "Dua", (long)1);
		ResponseEntity<Object> responseEntityCreate = accountTypeController.addAccountType(accountType);
		
		ResponseEntity<String> responseEntityUpdate = accountTypeController.deleteAccountType(accountType);
				
		assertThat(responseEntityUpdate.equals(  HttpStatus.OK ));
		
	}
	
}
