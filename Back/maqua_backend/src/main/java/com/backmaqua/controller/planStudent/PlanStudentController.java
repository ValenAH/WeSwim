package com.backmaqua.controller.planStudent;

import java.util.ArrayList;
import java.util.List;

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

import com.backmaqua.entities.planStudent.PlanStudent;
import com.backmaqua.entities.planStudent.PlanStudents;
import com.backmaqua.repository.planStudent.PlanStudentCRUDRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/planStudentAPI")
public class PlanStudentController {

	@Autowired
	private PlanStudentCRUDRepository planStudentRepository;

	@CrossOrigin(origins = "*")
	@GetMapping(path = "/studentsByPlan", produces = "application/json")
	public PlanStudents getStudentsByPlan(@RequestParam Long planId) {
		PlanStudents response = new PlanStudents();
		List<PlanStudent> list = planStudentRepository.findByPlanId(planId);
		response.setPlanStudentList(list != null ? list : new ArrayList<>());
		return response;
	}

	@CrossOrigin(origins = "*")
	@PostMapping(path = "/addPlanStudent", consumes = "application/json", produces = "application/json")
	public PlanStudent addPlanStudent(@RequestBody PlanStudent planStudent) {
		return planStudentRepository.save(planStudent);
	}

	@CrossOrigin(origins = "*")
	@PostMapping(path = "/RemovePlanStudent", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<String> removePlanStudent(@RequestBody PlanStudent planStudent) {
		planStudentRepository.deleteById(planStudent.getId());
		return new ResponseEntity<String>(HttpStatus.OK);
	}
}
