package com.ejemplo;

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

import com.app.entity.Employee;
import com.app.entity.Employees;
import com.app.repository.EmployeeCRUDRepository;
import com.app.repository.EmployeeQUERYRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*") //https://www.baeldung.com/spring-cors
@RequestMapping("/api/employeeCustomAPI")
public class EmployeeController 
{
	@Autowired
    private EmployeeCRUDRepository employeeRepository;
	@Autowired
	private EmployeeQUERYRepository employeeRepositoryQuery;


    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addnewemployee", consumes = "application/json", produces = "application/json")
	public Employee addNewEmployeeApi(@RequestBody Employee employee) {
        //add resource
     	employee = employeeRepository.save(employee);
		return employee;
	}
    
    //***Api Final Para FRONT
	@CrossOrigin(origins = "*")
    @GetMapping(path= "/employeegetall", produces = "application/json")
    public Employees getAllEmployeesApi() 
    {
		Employees response = new Employees();
		ArrayList<Employee> list = new ArrayList<>();
		employeeRepository.findAll().forEach(e -> list.add(e));
		response.setEmployeeList(list);
        return response;
    }
       
    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/updateemployee", consumes = "application/json", produces = "application/json")
	public Employee updateEmployee(@RequestBody Employee employee) {
        //add resource
     	employeeRepository.save(employee);
		return employee;
	}
    //***Api Final Front
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/employeeremove", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deleteEmployeeApi(@RequestBody Employee employe) {
		employeeRepository.deleteById(employe.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
    
      	
	/* Otras Formas  pero Bajo jUnit Testing*/
	@GetMapping(path="getAllEmployees", produces = "application/json")
    public Employees getEmployees() 
    {
		Employees response = new Employees();
		ArrayList<Employee> list = new ArrayList<>();
		employeeRepository.findAll().forEach(e -> list.add(e));
		response.setEmployeeList(list);
        return response;
    }
    
    @PostMapping(path= "/addemployee", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addEmployee(@RequestBody Employee employee) {       
        //add resource
    	employee = employeeRepository.save(employee);
        //Create resource location
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                    .path("/{id}")
                                    .buildAndExpand(employee.getId())
                                    .toUri();
        //Send location in response
        return ResponseEntity.created(location).build();
    }
    
      
    
    
}
