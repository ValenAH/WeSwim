package com.backmaqua.controller.customer;

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

import com.backmaqua.entities.customer.Customer;
import com.backmaqua.entities.customer.Customers;
import com.backmaqua.repository.customer.CustomerCRUDRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/CustomerAPI")
 public class CustomerController {

	@Autowired
	private CustomerCRUDRepository customerRepository;
	
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addnewcustomer", consumes = "application/json", produces = "application/json")
	public Customer addNewCustomerApi(@RequestBody Customer customer) {
        //add resource
		customer = customerRepository.save(customer);
		return customer;
	}
	
	
    //***Api Final Para FRONT
	@CrossOrigin(origins = "*")
    @GetMapping(path= "/customergetall", produces = "application/json")
    public Customers getAllEmployeesApi() 
    {
		Customers response = new Customers();
		ArrayList<Customer> list = new ArrayList<>();
		customerRepository.findAll().forEach(e -> list.add(e));
		response.setCustomerList(list);
        return response;
    }
	
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/updatecustomer", consumes = "application/json", produces = "application/json")
	public Customer updateCustomer(@RequestBody Customer customer) {
        //add resource
     	customerRepository.save(customer);
		return customer;
	}
	

	@CrossOrigin(origins = "*")
	@PostMapping(path = "/customerremove", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deleteCustomerApi(@RequestBody Customer customer) {
		customerRepository.deleteById(customer.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	@GetMapping(path = "getAllCustomers", produces= "application/json")
	public Customers getCustomers() {
		Customers response = new Customers();
		ArrayList<Customer> list = new ArrayList<>();
		customerRepository.findAll().forEach(c -> list.add(c));
		response.setCustomerList(list);
		return response;				
	}
	

    @PostMapping(path= "/addcustomer", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addCustomer(@RequestBody Customer customer) {       
        //add resource
    	customer = customerRepository.save(customer);
        //Create resource location
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                    .path("/{id}")
                                    .buildAndExpand(customer.getId())
                                    .toUri();
        //Send location in response
        return ResponseEntity.created(location).build();
    }


}
	