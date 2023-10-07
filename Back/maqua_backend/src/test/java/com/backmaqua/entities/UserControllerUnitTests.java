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
import com.backmaqua.entities.user.User;
import com.backmaqua.entities.user.Users;
import com.backmaqua.repository.user.UserCRUDRepository;

@ExtendWith(MockitoExtension.class)
public class UserControllerUnitTests {

	@InjectMocks
	UserController userController;
	
	@Mock
	UserCRUDRepository userRepositoryMock;
	
	@Test
	public void testAddUser() {
		//Given
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
		
		//When
		User user = new User();
		user.setId((long)1);
		//Insert an user
		when( userRepositoryMock.save(any(User.class))).thenReturn(user);
		
		// Entonces Realizo la prueba si es verdadera
		User userToAdd = new User((long) 0, "maria", "Gupta", (long)2);
		ResponseEntity<Object> responseEntity = userController.addUser(userToAdd);

		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");
	}
	
	@Test
	public void testFindAll() {
		// given
		User user1 = new User((long) 0, "Lokesh", "Gupta", (long)1);
		User user2 = new User((long) 0, "Alex", "Gussin", (long)2);
		List<User> list = new ArrayList<User>();
		list.addAll(Arrays.asList(user1, user2));

		when(userRepositoryMock.findAll()).thenReturn(list);

		
		// when
		Users result = userController.getUsers();

		// then
		assertThat(result.getUsersList().size()).isEqualTo(2);

		assertThat(result.getUsersList().get(0).getUser()).isEqualTo(user1.getUser());

		assertThat(result.getUsersList().get(1).getUser()).isEqualTo(user2.getUser());
	}
	
	@Test
	public void updateUserTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		User user = new User();
		user.setId((long) 1);

		when(userRepositoryMock.save(any(User.class))).thenReturn(user);

		// Entonces Realizo la prueba si es verdadera
		User userToUpdate = new User((long) 0, "Super", "Man", (long)1);
		User responseEntityUpdate = userController.updateUser(userToUpdate);
		
		assertThat(responseEntityUpdate.equals(userToUpdate));
		
	}
	
	@Test
	public void deleteUserTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		User userBase = new User();
		userBase.setId((long) 1);
		
		when(userRepositoryMock.save(any(User.class))).thenReturn(userBase);

		// Entonces Realizo la prueba si es verdadera
		User user = new User((long) 0, "Dua", "Lipa", (long)1);
		ResponseEntity<Object> responseEntityCreate = userController.addUser(user);
		
		ResponseEntity<String> responseEntityUpdate = userController.deleteUser(user);
				
		assertThat(responseEntityUpdate.equals(  HttpStatus.OK ));
		
	}
}
