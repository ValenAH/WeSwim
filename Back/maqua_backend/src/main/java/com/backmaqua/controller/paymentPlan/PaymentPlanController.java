package com.backmaqua.controller.paymentPlan;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backmaqua.entities.accountType.AccountType;
import com.backmaqua.entities.accountType.AccountTypes;
import com.backmaqua.entities.paymentPlan.PaymentPlan;
import com.backmaqua.entities.paymentPlan.PaymentPlans;
import com.backmaqua.repository.accountType.AccountTypeCRUDRepository;
import com.backmaqua.repository.paymentPlan.PaymentPlanCRUDRepository;
import com.backmaqua.repository.paymentPlan.PaymentPlanQUERYRepository;

public class PaymentPlanController {
	@Autowired
    private PaymentPlanCRUDRepository paymentPlanRepository;
	@Autowired
	private PaymentPlanQUERYRepository paymentPlanRepositoryQuery;


    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addPaymentPlan", consumes = "application/json", produces = "application/json")
	public PaymentPlan addNewPaymentPlan(@RequestBody PaymentPlan paymentPlan) {
        //add resource
		paymentPlan = paymentPlanRepository.save(paymentPlan);
		return paymentPlan;
	}
    
    //***Api Final Para FRONT
	@CrossOrigin(origins = "*")
    @GetMapping(path= "/GetPaymentPlan", produces = "application/json")
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
    
    @PostMapping(path= "/addPaymentPlan", consumes = "application/json", produces = "application/json")
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
