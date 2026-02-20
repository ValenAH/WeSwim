package com.backmaqua.controller.teacher;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backmaqua.entities.teacher.Teacher;
import com.backmaqua.entities.teacher.Teachers;
import com.backmaqua.entities.user.User;
import com.backmaqua.repository.teacher.TeacherCRUDRepository;
import com.backmaqua.repository.user.UserCRUDRepository;
//import com.demo.repository.TeacherQUERYRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/teacherCustomAPI")
public class TeacherController {
	
	@Autowired
	private TeacherCRUDRepository teacherRepository;
	
	@Autowired
	private UserCRUDRepository userRepository;
	
	@Value("${teacherRoleId}") // Inyecta el valor del rol desde application.properties
    private Long teacherRoleId;

	
	//@Autowired
	//private TeacherQUERYRepository teacherRepositoryQuery;
	
	//Añadir/crear/registrar profesor
	
	  //***Api Final Front
		@CrossOrigin(origins = "*")
	    @PostMapping(path= "/addnewteacher", consumes = "application/json", produces = "application/json")
		public Teacher addNewTeacherApi(@RequestBody Teacher teacher) {
	        //add resource
	     	teacher = teacherRepository.save(teacher);
	     	
	     // Crear un usuario correspondiente al profesor
	        User user = new User();
	        user.setUser(teacher.getname()); // Usar el nombre del profesor como nombre de usuario
	        user.setPassword(teacher.getpassword()); // Define una contraseña segura aquí
	        user.setRoleId(teacherRoleId); // Puedes asignar un rol específico para profesores (por ejemplo, 1).

	        // Guardar el usuario
	        userRepository.save(user);
	        
	        // Establecer el mismo id para el profesor y el usuario
	        teacher.setuserid(user.getId());
	        
	        //Actualizar profesor
	        teacherRepository.save(teacher);
	     	
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
		
		@GetMapping(path = "getTeacherById", produces = "application/json")
		public Teacher getTeacherById(@RequestParam(value="id") Long id) {
		    Teacher teacher = teacherRepository.findById(id).get();
		    return teacher;
		}
		
		//Actualizar profesor
	    //***Api Final Front
		@CrossOrigin(origins = "*")
	    @PostMapping(path= "/updateteacher", consumes = "application/json", produces = "application/json")
		public Teacher updateTeacher(@RequestBody Teacher teacher) {
	        //add resource
	     	teacherRepository.save(teacher);
	     	
	     	User user = userRepository.findById(teacher.getuserid()).orElse(null);
	     	
	     	if (user != null) {
	            user.setUser(teacher.getname()); // Actualiza el nombre de usuario
	            user.setPassword(teacher.getpassword()); // Actualiza la contraseña

	            // Guarda el usuario actualizado
	            userRepository.save(user);
	        }
	     	
			return teacher;
		}
		
		//eliminar profesor /delete/remove
	    //***Api Final Front
		@CrossOrigin(origins = "*")
		@PostMapping(path = "/teacherremove", consumes = "application/json")
		public @ResponseBody ResponseEntity<String> deleteTeacherApi(@RequestBody Teacher teacher) {
			
			try {
	            Long userId = teacher.getuserid();
	            
	            // Busca el usuario asociado al profesor por userid
	            User user = userRepository.findById(userId).orElse(null);
	            
	            // Borra al profesor
	            teacherRepository.delete(teacher);
	            
	            // Borra al usuario si existe
	            if (user != null) {
	                userRepository.delete(user);
	            }

	            return new ResponseEntity<String>(HttpStatus.OK);
	        } catch (Exception e) {
	            e.printStackTrace(); // Manejo de excepciones
	            return new ResponseEntity<String>("Error en la eliminación", HttpStatus.INTERNAL_SERVER_ERROR);
	        }
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
