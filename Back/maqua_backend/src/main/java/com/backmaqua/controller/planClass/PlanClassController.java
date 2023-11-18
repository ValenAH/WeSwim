package com.backmaqua.controller.planClass;

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

import com.backmaqua.entities.planClass.PlanClass;
import com.backmaqua.entities.planClass.PlanClasses;
import com.backmaqua.repository.planClass.PlanClassCRUDRepository;

public class PlanClassController {
	@Autowired
    private PlanClassCRUDRepository planClassRepository;


    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addPlan", consumes = "application/json", produces = "application/json")
	public PlanClass addNewPlanClass(@RequestBody PlanClass planClass) {
        //add resource
     	planClass = planClassRepository.save(planClass);
		return planClass;
	}
    
    //***Api Final Para FRONT
	@CrossOrigin(origins = "*")
    @GetMapping(path= "/GetPlanClasses", produces = "application/json")
    public PlanClasses getAllPlanClasses() 
    {
		PlanClasses response = new PlanClasses();
		ArrayList<PlanClass> list = new ArrayList<>();
		planClassRepository.findAll().forEach(e -> list.add(e));
		response.setPlanClassList(list);
        return response;
    }
       
    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/updatePlanClass", consumes = "application/json", produces = "application/json")
	public PlanClass updatePlanClass(@RequestBody PlanClass planClass) {
        //add resource
		planClassRepository.save(planClass);
		return planClass;
	}
    //***Api Final Front
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/RemovePlanClass", consumes = "application/json")
	public @ResponseBody ResponseEntity<String> deletePlanClass(@RequestBody PlanClass planClass) {
		planClassRepository.deleteById(planClass.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
    
      	
	/* Otras Formas  pero Bajo jUnit Testing*/
	@GetMapping(path="getAllPlanClasses", produces = "application/json")
    public PlanClasses getPlans() 
    {
		PlanClasses response = new PlanClasses();
		ArrayList<PlanClass> list = new ArrayList<>();
		planClassRepository.findAll().forEach(e -> list.add(e));
		response.setPlanClassList(list);
        return response;
    }
    
    @PostMapping(path= "/addNewPlanClass", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Object> addPlanClass(@RequestBody PlanClass planClass) {       
        //add resource
    	planClass = planClassRepository.save(planClass);
        //Create resource location
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                                    .path("/{id}")
                                    .buildAndExpand(planClass.getId())
                                    .toUri();
        //Send location in response
        return ResponseEntity.created(location).build();
    }
}
