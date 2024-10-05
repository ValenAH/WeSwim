package com.backmaqua.entities;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.Date;
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

import com.backmaqua.controller.plan.PlanController;
import com.backmaqua.entities.plan.Plan;
import com.backmaqua.entities.plan.Plans;
import com.backmaqua.repository.plan.PlanCRUDRepository;

@ExtendWith(MockitoExtension.class)
public class PlanControllerUnitTests {

	@InjectMocks
	PlanController planController;
	
	@Mock
	PlanCRUDRepository planRepositoryMock;
	
	@Test
	public void testAddPlan() {
		//Given
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
		//When
		Plan plan = new Plan();
		plan.setId((long)1);
		//Insert an user
		when( planRepositoryMock.save(any(Plan.class))).thenReturn(plan);
	    Date date = new Date();
		// Entonces Realizo la prueba si es verdadera
		Plan planToAdd = new Plan(Long.valueOf(0), Long.valueOf(1),date);
		ResponseEntity<Object> responseEntity = planController.addPlan(planToAdd);

		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");
	}
	
	@Test
	public void testFindAll() {
		// given
		Date date = new Date();
		Plan plan1 = new Plan(Long.valueOf(0), Long.valueOf(1),date);
		Plan plan2 = new Plan(Long.valueOf(0), Long.valueOf(1),date);
		List<Plan> list = new ArrayList<Plan>();
		list.addAll(Arrays.asList(plan1, plan2));

		when(planRepositoryMock.findAll()).thenReturn(list);

		
		// when
		Plans result = planController.getPlans();

		// then
		assertThat(result.getPlansList().size()).isEqualTo(2);

		assertThat(result.getPlansList().get(0).getId()).isEqualTo(plan1.getId());

		assertThat(result.getPlansList().get(1).getId()).isEqualTo(plan2.getId());
	}
	
	@Test
	public void updatePlanTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
		Date date = new Date();
		Plan plan = new Plan();
		plan.setId((long) 1);

		when(planRepositoryMock.save(any(Plan.class))).thenReturn(plan);

		// Entonces Realizo la prueba si es verdadera
		Plan planToUpdate = new Plan(Long.valueOf(0), Long.valueOf(1),date);
		Plan responseEntityUpdate = planController.updatePlan(planToUpdate);
		
		assertThat(responseEntityUpdate.equals(planToUpdate));
		
	}
	
	@Test
	public void deletePlanTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
		Date date = new Date();
		Plan planBase = new Plan();
		planBase.setId((long) 1);
		
		when(planRepositoryMock.save(any(Plan.class))).thenReturn(planBase);

		// Entonces Realizo la prueba si es verdadera
		Plan plan = new Plan(Long.valueOf(0), Long.valueOf(1),date);
		ResponseEntity<Object> responseEntityCreate = planController.addPlan(plan);
		
		ResponseEntity<String> responseEntityUpdate = planController.deletePlan(plan);
				
		assertThat(responseEntityUpdate.equals(  HttpStatus.OK ));
		
	}
}
