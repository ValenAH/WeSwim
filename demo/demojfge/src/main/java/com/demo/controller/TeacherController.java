package com.demo.controller;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.demo.entity.Teacher;
import com.demo.entity.Teachers;
import com.demo.repository.TeacherCRUDRepository;
//import com.demo.repository.TeacherQUERYRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/teacherCustomAPI")
public class TeacherController {
	
	@Autowired
	private TeacherCRUDRepository teacherRepository;
	//@Autowired
	//private TeacherQUERYRepository teacherRepositoryQuery;
	
	//Añadir/crear/registrar profesor
	
	  //***Api Final Front
		@CrossOrigin(origins = "*")
	    @PostMapping(path= "/addnewteacher", consumes = "application/json", produces = "application/json")
		public Teacher addNewTeacherApi(@RequestBody Teacher teacher) {
	        //add resource
	     	teacher = teacherRepository.save(teacher);
			return teacher;
		}
		
		//Consultar todos los profesores
		
	// //***Api Final Para FRONT
		@CrossOrigin(origins = "*")
	    @GetMapping(path= "/teachergetall", produces = "application/json")
	    public Teachers getAllTeachersApi() 
	    {
			Teachers response = new Teachers();
			ArrayList<Teacher> list = new ArrayList<>();
			teacherRepository.findAll().forEach(e -> list.add(e));
			response.setTeacherList(list);
	        return response;
	    }
		
		//Actualizar profesor
	    //***Api Final Front
		@CrossOrigin(origins = "*")
	    @PostMapping(path= "/updateteacher", consumes = "application/json", produces = "application/json")
		public Teacher updateTeacher(@RequestBody Teacher teacher) {
	        //add resource
	     	teacherRepository.save(teacher);
			return teacher;
		}
		
		//eliminar profesor /delete/remove
	    //***Api Final Front
		@CrossOrigin(origins = "*")
		@PostMapping(path = "/teacherremove", consumes = "application/json")
		public @ResponseBody ResponseEntity<String> deleteTeacherApi(@RequestBody Teacher teacher) {
			teacherRepository.deleteById(teacher.getId());
			return new ResponseEntity<String>(HttpStatus.OK);
		}
		/* Otras Formas  pero Bajo jUnit Testing*/
	
	@GetMapping(path="getAllTeachers",produces = "application/json")
	public Teachers getTeachers() {
			Teachers response = new Teachers(); 
			ArrayList<Teacher> list = new ArrayList<>();
			teacherRepository.findAll().forEach(e -> list.add(e));
			response.setTeacherList(list);
			return response;
	}
	
	@PostMapping(path= "/addteacher", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addTeacher(@RequestBody Teacher teacher) {       
        //add resource
    	teacher = teacherRepository.save(teacher);
        //Create resource location
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                    .path("/{id}")
                                    .buildAndExpand(teacher.getId())
                                    .toUri();
        //Send location in response
        return ResponseEntity.created(location).build();
    }

}
