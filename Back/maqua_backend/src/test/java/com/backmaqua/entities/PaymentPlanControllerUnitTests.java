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

import com.backmaqua.controller.paymentPlan.PaymentPlanController;
import com.backmaqua.entities.accountType.AccountType;
import com.backmaqua.entities.accountType.AccountTypes;
import com.backmaqua.entities.paymentPlan.PaymentPlan;
import com.backmaqua.entities.paymentPlan.PaymentPlans;
import com.backmaqua.entities.user.User;
import com.backmaqua.repository.accountType.AccountTypeCRUDRepository;
import com.backmaqua.repository.paymentPlan.PaymentPlanCRUDRepository;

@ExtendWith(MockitoExtension.class)
public class PaymentPlanControllerUnitTests {

	@InjectMocks
	PaymentPlanController paymentPlanController;
		
	@Mock
	PaymentPlanCRUDRepository paymentPlanRepositoryMock;
		
	@Test
	public void testAddPaymentPlan() {
		//Given
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
		
		//When
		PaymentPlan paymentPlan = new PaymentPlan();
		paymentPlan.setId((long)1);
		//Insert an user
		when( paymentPlanRepositoryMock.save(any(PaymentPlan.class))).thenReturn(paymentPlan);
		
		// Entonces Realizo la prueba si es verdadera
		PaymentPlan paymentPlanToAdd = new PaymentPlan((long) 0, 10, 10,100.00);
		ResponseEntity<Object> responseEntity = paymentPlanController.addPaymentPlan(paymentPlanToAdd);

		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");
	}
		
		@Test
		public void testFindAll() {
			// given
			PaymentPlan paymentPlan1 = new PaymentPlan((long) 0, 10,11, 100.00);
			PaymentPlan paymentPlan2 = new PaymentPlan((long) 0, 10,11, 100.00);
			List<PaymentPlan> list = new ArrayList<PaymentPlan>();
			list.addAll(Arrays.asList(paymentPlan1, paymentPlan2));

			when(paymentPlanRepositoryMock.findAll()).thenReturn(list);

			
			// when
			PaymentPlans result = paymentPlanController.getPaymentPlan();

			// then
			assertThat(result.getPaymentPlansList().size()).isEqualTo(2);

			assertThat(result.getPaymentPlansList().get(0).getPeopleQuantity()).isEqualTo(paymentPlan1.getPeopleQuantity());

			assertThat(result.getPaymentPlansList().get(1).getPeopleQuantity()).isEqualTo(paymentPlan2.getPeopleQuantity());
		}
		
		@Test
		public void updateAccountTypeTest() {

			MockHttpServletRequest request = new MockHttpServletRequest();
			RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

			PaymentPlan paymentPlan = new PaymentPlan();
			paymentPlan.setId((long) 1);

			when(paymentPlanRepositoryMock.save(any(PaymentPlan.class))).thenReturn(paymentPlan);

			// Entonces Realizo la prueba si es verdadera
			PaymentPlan paymentPlanToUpdate = new PaymentPlan((long) 0, 10,11,100.0);
			PaymentPlan responseEntityUpdate = paymentPlanController.updatePaymentPlan(paymentPlanToUpdate);
			
			assertThat(responseEntityUpdate.equals(paymentPlanToUpdate));
			
		}
		
		@Test
		public void deleteAccountTypeTest() {

			MockHttpServletRequest request = new MockHttpServletRequest();
			RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

			PaymentPlan paymentPlanBase = new PaymentPlan();
			paymentPlanBase.setId((long) 1);
			
			when(paymentPlanRepositoryMock.save(any(PaymentPlan.class))).thenReturn(paymentPlanBase);

			// Entonces Realizo la prueba si es verdadera
			PaymentPlan paymentPlan = new PaymentPlan((long) 0, 10,11, 10.0);
			ResponseEntity<Object> responseEntityCreate = paymentPlanController.addPaymentPlan(paymentPlan);
			
			ResponseEntity<String> responseEntityUpdate = paymentPlanController.deletePaymentPlan(paymentPlan);
					
			assertThat(responseEntityUpdate.equals(  HttpStatus.OK ));
			
		}
}
