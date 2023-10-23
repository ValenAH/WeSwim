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

import com.backmaqua.controller.teacher.TeacherController;
import com.backmaqua.entities.teacher.Teacher;
import com.backmaqua.entities.teacher.Teachers;
import com.backmaqua.repository.teacher.TeacherCRUDRepository;

@ExtendWith(MockitoExtension.class)
public class TeacherControllerUnitTests {
	
	@InjectMocks
	TeacherController teacherController;

	@Mock
	TeacherCRUDRepository teacherRepositoryMock;

	@Test
	public void testAddTeacher() {

		// Given Algun Contexto de Variables
		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		// When alguna Accion Requerida Entonces....
		Teacher teacher = new Teacher();
		teacher.setId((long)1);
		when( // Insertando un profesor
				teacherRepositoryMock.save(any(Teacher.class))).thenReturn(teacher);

		
		
		// Entonces Realizo la prueba si es verdadera
		Teacher teacherToAdd = new Teacher((long) 0, "Lokesh", "howtodoinjava@gmail.com",(long) 1,"001","666",(long) 002,(long) 156789,"Ahorro","10098","queso");
		ResponseEntity<Object> responseEntity = teacherController.addTeacher(teacherToAdd);

		
		//assertThat(responseEntity.getStatusCode()).isEqualTo(201);
		assertThat(responseEntity.getHeaders().getLocation().getPath()).isEqualTo("/1");

	}

	@Test
	public void testFindAll() {
		// given
		Teacher teacher1 = new Teacher((long) 0, "Fox", "howtodoinjava@gmail.com",(long) 4,"001","555",(long) 003,(long) 157643,"Ahorro","10123","queso");
		Teacher teacher2 = new Teacher((long) 0, "Wolf", "wolfverinea@gmail.com",(long) 7,"002","666",(long) 006,(long) 156456,"Ahorro","10098","queso");
		List<Teacher> list = new ArrayList<Teacher>();
		list.addAll(Arrays.asList(teacher1, teacher2));

		when(teacherRepositoryMock.findAll()).thenReturn(list);

		
		// when
		Teachers result = teacherController.getTeachers();

		// then
		assertThat(result.getTeacherList().size()).isEqualTo(2);

		assertThat(result.getTeacherList().get(0).getname()).isEqualTo(teacher1.getname());

		assertThat(result.getTeacherList().get(1).getname()).isEqualTo(teacher2.getname());
	}

	
	
	@Test
	public void updateTeacherTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		Teacher teacher = new Teacher();
		teacher.setId((long) 1);

		when(teacherRepositoryMock.save(any(Teacher.class))).thenReturn(teacher);

		// Entonces Realizo la prueba si es verdadera
		Teacher teacherToAdd = new Teacher((long) 0, "Warpig", "warpig@gmail.com",(long) 1,"003","888",(long) 033,(long) 1333459,"Ahorro","10678","queso");
		ResponseEntity<Object> responseEntityCreate = teacherController.addTeacher(teacherToAdd);
		
		Teacher teacherToUpdate = new Teacher((long) 0, "Rhino", "rhino@gmail.com",(long) 1,"004","999",(long) 002,(long) 1565314,"Ahorro","10555774","queso");
		Teacher responseEntityUpdate = teacherController.updateTeacher(teacherToUpdate);
		
		assertThat(responseEntityUpdate.equals(teacherToUpdate));
		
	}

	
	@Test
	public void deleteTeacherTest() {

		MockHttpServletRequest request = new MockHttpServletRequest();
		RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));

		Teacher teacherBase = new Teacher();
		teacherBase.setId((long) 1);
		
		when(teacherRepositoryMock.save(any(Teacher.class))).thenReturn(teacherBase);

		// Entonces Realizo la prueba si es verdadera
		Teacher teacher = new Teacher((long) 0, "Warpig", "warpig@gmail.com",(long) 1,"003","888",(long) 033,(long) 1333459,"Ahorro","10678","queso");
		ResponseEntity<Object> responseEntityCreate = teacherController.addTeacher(teacher);
		
		ResponseEntity<String> responseEntityUpdate = teacherController.deleteTeacherApi(teacher);
				
		assertThat(responseEntityUpdate.equals(  HttpStatus.OK ));
		
	}
	
	
	

}
