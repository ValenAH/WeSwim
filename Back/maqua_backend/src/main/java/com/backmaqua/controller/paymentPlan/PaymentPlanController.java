package com.backmaqua.controller.paymentPlan;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backmaqua.entities.paymentPlan.PaymentPlan;
import com.backmaqua.entities.paymentPlan.PaymentPlans;
import com.backmaqua.repository.paymentPlan.PaymentPlanCRUDRepository;
import com.backmaqua.repository.paymentPlan.PaymentPlanQUERYRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/paymentPlans")
public class PaymentPlanController {
	@Autowired
    private PaymentPlanCRUDRepository paymentPlanRepository;
	private PaymentPlanQUERYRepository paymentPlanQUERYRepository;

    public PaymentPlanController(PaymentPlanQUERYRepository paymentPlanQUERYRepository) {
        this.paymentPlanQUERYRepository = paymentPlanQUERYRepository;
    }

    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addPaymentPlan", consumes = "application/json", produces = "application/json")
	public PaymentPlan addNewPaymentPlan(@RequestBody PaymentPlan paymentPlan) {
        //add resource
		paymentPlan = paymentPlanRepository.save(paymentPlan);
		return paymentPlan;
	}

	@GetMapping(path = "getPaymentPlanById", produces = "application/json")
	public PaymentPlan getPaymentPlanById(@RequestParam(value="id") Long id) {
		PaymentPlan paymentPlan = paymentPlanRepository.findById(id).get();
		return paymentPlan;
	}

	@GetMapping(path = "definePaymentPlan", produces = "application/json")
	public PaymentPlan definePaymentPlan(@RequestParam(value="students") int studentsNumber, @RequestParam(value="periodicity") int periodicity) {
		PaymentPlan paymentPlan = paymentPlanQUERYRepository.findByPeopleQuantityAndPeriodicity(studentsNumber,periodicity);
		return paymentPlan;
	}
    
    //***Api Final Para FRONT
	@CrossOrigin(origins = "*")
    @GetMapping(path= "/GetPaymentPlans", produces = "application/json")
    public PaymentPlans getPaymentPlan() 
    {
		PaymentPlans response = new PaymentPlans();
		ArrayList<PaymentPlan> list = new ArrayList<>();
		paymentPlanRepository.findAll().forEach(e -> list.add(e));
		response.setPaymentPlanList(list);
        return response;
    }
       
    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/updatePaymentPlan", consumes = "application/json", produces = "application/json")
	public PaymentPlan updatePaymentPlan(@RequestBody PaymentPlan paymentPlan) {
        //add resource
		paymentPlanRepository.save(paymentPlan);
		return paymentPlan;
	}
    //***Api Final Front
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/PaymentPlanRemove", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deletePaymentPlan(@RequestBody PaymentPlan paymentPlan) {
		paymentPlanRepository.deleteById(paymentPlan.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
    
      	
	/* Otras Formas  pero Bajo jUnit Testing*/
	@GetMapping(path="getAllPaymentPlans", produces = "application/json")
    public PaymentPlans getPaymentPlans() 
    {
		PaymentPlans response = new PaymentPlans();
		ArrayList<PaymentPlan> list = new ArrayList<>();
		paymentPlanRepository.findAll().forEach(e -> list.add(e));
		response.setPaymentPlanList(list);
        return response;
    }
    
    @PostMapping(path= "/addNewPaymentPlan", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addPaymentPlan(@RequestBody PaymentPlan paymentPlan) {       
        //add resource
    	paymentPlan = paymentPlanRepository.save(paymentPlan);
        //Create resource location
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                    .path("/{id}")
                                    .buildAndExpand(paymentPlan.getId())
                                    .toUri();
        //Send location in response
        return ResponseEntity.created(location).build();
    }
}
