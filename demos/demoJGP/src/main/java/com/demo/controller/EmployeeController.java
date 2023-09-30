package com.demo.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.entity.Employee;
import com.demo.entity.Employees;
import com.demo.repository.EmployeeCRUDRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/employeeCustomAPI")
public class EmployeeController {

	@Autowired
    private EmployeeCRUDRepository employeeRepository;
	
	@GetMapping(path="getAllEmployees", produces = "application/json")
    public Employees getEmployees() {
		Employees response = new Employees();
		ArrayList<Employee> list = new ArrayList<>();
		employeeRepository.findAll().forEach(e -> list.add(e));
		response.setEmployeeList(list);
		return response;
    }
	
	
}
