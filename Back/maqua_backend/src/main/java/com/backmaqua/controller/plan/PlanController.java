package com.backmaqua.controller.plan;

import java.net.URI;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.backmaqua.entities.plan.Plans;
import com.backmaqua.entities.plan.Plan;
import com.backmaqua.repository.plan.PlanCRUDRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/plans")
public class PlanController {
	@Autowired
    private PlanCRUDRepository planRepository;


    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addPlan", consumes = "application/json", produces = "application/json")
	public Plan addNewPlan(@RequestBody Plan plan) {
        //add resource
     	plan = planRepository.save(plan);
		return plan;
	}
    
    //***Api Final Para FRONT
	@CrossOrigin(origins = "*")
    @GetMapping(path= "/GetPlans", produces = "application/json")
    public Plans getAllPlans() 
    {
		Plans response = new Plans();
		ArrayList<Plan> list = new ArrayList<>();
		planRepository.findAll().forEach(e -> list.add(e));
		response.setPlanList(list);
        return response;
    }
       
    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/updatePlan", consumes = "application/json", produces = "application/json")
	public Plan updatePlan(@RequestBody Plan plan) {
        //add resource
		planRepository.save(plan);
		return plan;
	}
    //***Api Final Front
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/RemovePlan", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deletePlan(@RequestBody Plan plan) {
		planRepository.deleteById(plan.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
    
      	
	/* Otras Formas  pero Bajo jUnit Testing*/
	@GetMapping(path="getAllPlans", produces = "application/json")
    public Plans getPlans() 
    {
		Plans response = new Plans();
		ArrayList<Plan> list = new ArrayList<>();
		planRepository.findAll().forEach(e -> list.add(e));
		response.setPlanList(list);
        return response;
    }
    
    @PostMapping(path= "/addNewPlan", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addPlan(@RequestBody Plan plan) {       
        //add resource
    	plan = planRepository.save(plan);
        //Create resource location
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                    .path("/{id}")
                                    .buildAndExpand(plan.getId())
                                    .toUri();
        //Send location in response
        return ResponseEntity.created(location).build();
    }
}
