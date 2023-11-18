package com.backmaqua.entities;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
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

import com.backmaqua.controller.planClass.PlanClassController;
import com.backmaqua.entities.planClass.PlanClass;
import com.backmaqua.entities.planClass.PlanClasses;
import com.backmaqua.repository.planClass.PlanClassCRUDRepository;

@ExtendWith(MockitoExtension.class)
public class PlanClassControllerUnitTests {
	@InjectMocks
	PlanClassController planClassController;
	
	@Mock
	PlanClassCRUDRepository planClassRepositoryMock;
	
	@Test
	public void testAddPlanClass() {
		//Given
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
		
		//When
		PlanClass planClass = new PlanClass();
		planClass.setId((long)1);
		//Insert an user
		when( planClassRepositoryMock.save(any(PlanClass.class))).thenReturn(planClass);
		Date date = new Date();
		// Entonces Realizo la prueba si es verdadera
		PlanClass planClassToAdd = new PlanClass(Long.valueOf(1), date, Long.valueOf(2));
		ResponseEntity<Object> responseEntity = planClassController.addPlanClass(planClassToAdd);

		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");
	}
	
	@Test
	public void testFindAll() {
		Date date = new Date();
		// given
		PlanClass planClass1 = new PlanClass(Long.valueOf(1), date, Long.valueOf(2));
		PlanClass planClass2 = new PlanClass(Long.valueOf(0), date, Long.valueOf(2));
		List<PlanClass> list = new ArrayList<PlanClass>();
		list.addAll(Arrays.asList(planClass1, planClass2));

		when(planClassRepositoryMock.findAll()).thenReturn(list);

		
		// when
		PlanClasses result = planClassController.getAllPlanClasses();

		// then
		assertThat(result.getPlanClassesList().size()).isEqualTo(2);

		assertThat(result.getPlanClassesList().get(0).getPlanId()).isEqualTo(planClass1.getPlanId());

		assertThat(result.getPlanClassesList().get(1).getPlanId()).isEqualTo(planClass2.getPlanId());
	}
	
	@Test
	public void updatePlanClassTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		Date date = new Date();
		PlanClass planClass = new PlanClass();
		planClass.setId((long) 1);

		when(planClassRepositoryMock.save(any(PlanClass.class))).thenReturn(planClass);

		// Entonces Realizo la prueba si es verdadera
		PlanClass planClassToUpdate = new PlanClass(Long.valueOf(0), date, Long.valueOf(2));
		PlanClass responseEntityUpdate = planClassController.updatePlanClass(planClassToUpdate);
		
		assertThat(responseEntityUpdate.equals(planClassToUpdate));
		
	}
	
	@Test
	public void deletePlanClassTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
		Date date = new Date();
		PlanClass planClassBase = new PlanClass();
		planClassBase.setId((long) 1);
		
		when(planClassRepositoryMock.save(any(PlanClass.class))).thenReturn(planClassBase);

		// Entonces Realizo la prueba si es verdadera
		PlanClass planClass = new PlanClass(Long.valueOf(0), date, Long.valueOf(2));
		ResponseEntity<Object> responseEntityCreate = planClassController.addPlanClass(planClass);
		
		ResponseEntity<String> responseEntityUpdate = planClassController.deletePlanClass(planClass);
				
		assertThat(responseEntityUpdate.equals(  HttpStatus.OK ));
		
	}

}
