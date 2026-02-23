package com.backmaqua.controller.planClass;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.backmaqua.dto.planClass.GenerateClassesRequest;
import com.backmaqua.dto.planClass.RequestRepositionRequest;
import com.backmaqua.entities.planClass.PlanClass;
import com.backmaqua.entities.planClass.PlanClasses;
import com.backmaqua.repository.plan.PlanCRUDRepository;
import com.backmaqua.repository.planClass.PlanClassCRUDRepository;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/planClassAPI")
public class PlanClassController {
	@Autowired
    private PlanClassCRUDRepository planClassRepository;

	@Autowired
	private PlanCRUDRepository planRepository;


    //***Api Final Front
	@CrossOrigin(origins = "*")
    @PostMapping(path= "/addPlanClass", consumes = "application/json", produces = "application/json")
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

	/** Clases de un plan; opcionalmente filtradas por rango de fechas (from/to en formato ISO date: yyyy-MM-dd). */
	@CrossOrigin(origins = "*")
	@GetMapping(path = "/planClassesByPlan", produces = "application/json")
	public PlanClasses getPlanClassesByPlan(
			@RequestParam Long planId,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date from,
			@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date to) {
		PlanClasses response = new PlanClasses();
		List<PlanClass> list;
		if (from != null && to != null) {
			list = planClassRepository.findByPlanIdAndClassDateBetween(planId, from, to);
		} else {
			list = planClassRepository.findByPlanId(planId);
		}
		response.setPlanClassList(new ArrayList<>(list));
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

	/**
	 * Genera clases para un plan entre startDate y endDate en los días indicados (1=Lunes … 7=Domingo).
	 */
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/generateClasses", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> generateClasses(@RequestBody GenerateClassesRequest request) {
		if (request.getPlanId() == null || request.getStartDate() == null || request.getEndDate() == null
				|| request.getDaysOfWeek() == null || request.getDaysOfWeek().isEmpty()) {
			return ResponseEntity.badRequest().body("planId, startDate, endDate y daysOfWeek son obligatorios.");
		}
		if (planRepository.findById(request.getPlanId()).isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plan no encontrado.");
		}
		LocalDate start = LocalDate.parse(request.getStartDate());
		LocalDate end = LocalDate.parse(request.getEndDate());
		if (!end.isAfter(start) && !end.isEqual(start)) {
			return ResponseEntity.badRequest().body("endDate debe ser igual o posterior a startDate.");
		}
		List<PlanClass> created = new ArrayList<>();
		ZoneId zone = ZoneId.systemDefault();
		for (LocalDate d = start; !d.isAfter(end); d = d.plusDays(1)) {
			int dayOfWeek = d.getDayOfWeek().getValue(); // 1=Monday .. 7=Sunday
			if (!request.getDaysOfWeek().contains(dayOfWeek)) {
				continue;
			}
			Date classDate = Date.from(d.atStartOfDay(zone).toInstant());
			PlanClass pc = new PlanClass();
			pc.setPlanId(request.getPlanId());
			pc.setClassDate(classDate);
			pc.setStatus("SCHEDULED");
			pc = planClassRepository.save(pc);
			created.add(pc);
		}
		PlanClasses response = new PlanClasses();
		response.setPlanClassList(created);
		return ResponseEntity.ok(response);
	}

	/**
	 * Solicita reposición de una clase: marca la original como cancelada y crea una nueva en newDate.
	 */
	@CrossOrigin(origins = "*")
	@PostMapping(path = "/requestReposition", consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> requestReposition(@RequestBody RequestRepositionRequest request) {
		if (request.getOriginalPlanClassId() == null || request.getNewDate() == null) {
			return ResponseEntity.badRequest().body("originalPlanClassId y newDate son obligatorios.");
		}
		PlanClass original = planClassRepository.findById(request.getOriginalPlanClassId()).orElse(null);
		if (original == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Clase original no encontrada.");
		}
		if (original.getRepositionedToPlanClassId() != null) {
			return ResponseEntity.badRequest().body("Esta clase ya fue repuesta.");
		}
		LocalDate newLocalDate = LocalDate.parse(request.getNewDate());
		Date newDateAsDate = Date.from(newLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
		List<PlanClass> existingOnDate = planClassRepository.findByPlanIdAndClassDate(original.getPlanId(), newDateAsDate);
		if (!existingOnDate.isEmpty()) {
			return ResponseEntity.badRequest().body("Ya existe una clase de este plan en la fecha indicada.");
		}
		original.setStatus("CANCELLED");
		original.setNotes(request.getNotes());
		planClassRepository.save(original);

		PlanClass reposition = new PlanClass();
		reposition.setPlanId(original.getPlanId());
		reposition.setClassDate(newDateAsDate);
		reposition.setStatus("REPOSICION");
		reposition.setOriginalPlanClassId(original.getId());
		reposition.setNotes(request.getNotes());
		if (request.getStartTime() != null && !request.getStartTime().isBlank()) {
			reposition.setStartTime(LocalTime.parse(request.getStartTime()));
		}
		if (request.getEndTime() != null && !request.getEndTime().isBlank()) {
			reposition.setEndTime(LocalTime.parse(request.getEndTime()));
		}
		reposition = planClassRepository.save(reposition);

		original.setRepositionedToPlanClassId(reposition.getId());
		planClassRepository.save(original);

		return ResponseEntity.ok(reposition);
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
