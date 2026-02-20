package com.backmaqua.controller.customer;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.beans.factory.annotation.Value;

import com.backmaqua.entities.customer.Customer;
import com.backmaqua.entities.customer.Customers;
import com.backmaqua.entities.user.User;
import com.backmaqua.entities.teacher.Teacher;
import com.backmaqua.repository.customer.CustomerCRUDRepository;
import com.backmaqua.repository.user.UserCRUDRepository;
import com.backmaqua.repository.transaction.TransactionCRUDRepository;
import com.backmaqua.repository.plan.PlanCRUDRepository;
import com.backmaqua.repository.planStudent.PlanStudentCRUDRepository;
import com.backmaqua.repository.teacher.TeacherCRUDRepository;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/CustomerAPI")
 public class CustomerController {

	@Autowired
	private CustomerCRUDRepository customerRepository;

	@Autowired
	private UserCRUDRepository userRepository;

	@Autowired
	private TransactionCRUDRepository transactionRepository;

	@Autowired
	private PlanCRUDRepository planRepository;

	@Autowired
	private PlanStudentCRUDRepository planStudentRepository;

	@Autowired
	private TeacherCRUDRepository teacherRepository;

	@Value("${customerRoleId}") // Inyecta el valor del rol desde application.properties
    private Long customerRoleId;
	
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addnewcustomer", consumes = "application/json", produces = "application/json")
	public Customer addNewCustomerApi(@RequestBody Customer customer) {
        //add resource
		customer = customerRepository.save(customer);
        User user = new User();
        user.setUser(customer.getName());
        user.setPassword("changeme");
        user.setRoleId(customerRoleId);

        // Guardar el usuario
        userRepository.save(user);
        
        // Establecer el mismo id para el cliente y el usuario
        customer.setUserId(user.getId());
        
        //Actualizar cliente
        customerRepository.save(customer);
		return customer;
	}
	
	@GetMapping(path = "getCustomerById", produces = "application/json")
	public Customer getUserById(@RequestParam(value="id") Long id) {
	    Customer customer = customerRepository.findById(id).get();
	    return customer;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(path = "getCustomers", produces = "application/json")
	public Customers getCustomers() 
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
     	User user = userRepository.findById(customer.getUserId()).orElse(null);
     	
     	if (user != null) {
            user.setUser(customer.getName());
            userRepository.save(user);
        }
		return customer;
	}
	

	@CrossOrigin(origins = "*")
	@PostMapping(path = "/customerremove", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deleteCustomerApi(@RequestBody Customer customer) {
		customerRepository.deleteById(customer.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	/**
	 * Lista de clientes asignados al profesor (userId = id del User del profesor).
	 */
	@CrossOrigin(origins = "*")
	@GetMapping(path = "/customersByTeacher", produces = "application/json")
	public Customers getCustomersByTeacher(@RequestParam(value = "userId") Long userId) {
		Customers response = new Customers();
		ArrayList<Customer> list = new ArrayList<>();
		Teacher teacher = teacherRepository.findByUserid(userId).orElse(null);
		if (teacher == null) {
			response.setCustomerList(list);
			return response;
		}
		List<com.backmaqua.entities.plan.Plan> plans = planRepository.findByTeacherId(teacher.getId());
		if (plans.isEmpty()) {
			response.setCustomerList(list);
			return response;
		}
		List<Long> planIds = plans.stream().map(com.backmaqua.entities.plan.Plan::getId).collect(Collectors.toList());
		List<com.backmaqua.entities.planStudent.PlanStudent> planStudents = planStudentRepository.findByPlanIdIn(planIds);
		List<Long> customerIds = planStudents.stream()
				.map(ps -> ps.getIdPaymentPlan())
				.distinct()
				.collect(Collectors.toList());
		for (Long customerId : customerIds) {
			customerRepository.findById(customerId).ifPresent(list::add);
		}
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
	