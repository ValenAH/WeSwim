package com.backmaqua.controller.planStudent;

import com.backmaqua.entities.planClass.PlanClass;
import com.backmaqua.entities.planStudent.PlanStudent;
import com.backmaqua.repository.planStudent.PlanStudentCRUDRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/planStudents")
public class planStudentController {
    @Autowired
    private PlanStudentCRUDRepository planStudentRepository;

    @CrossOrigin(origins = "*")
    @PostMapping(path= "/addPlanStudentList", consumes = "application/json", produces = "application/json")
    public List<PlanStudent> addNewPlanClass(@RequestBody List<PlanStudent> planStudentList) {
        List<PlanStudent> savedPlanStudents = planStudentRepository.saveAll(planStudentList);
        return planStudentList;
    }
}
