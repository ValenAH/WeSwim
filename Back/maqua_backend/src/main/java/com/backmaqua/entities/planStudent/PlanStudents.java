package com.backmaqua.entities.planStudent;

import com.backmaqua.entities.user.User;

import java.util.ArrayList;
import java.util.List;

public class PlanStudents {

    private List<PlanStudent> planStudentsList;

    public List<PlanStudent> getPlanStudentsList(){
        if( planStudentsList == null) {
            planStudentsList = new ArrayList<>();
        }
        return planStudentsList;
    }

    public void setPlanStudentsList(List<PlanStudent> planStudentsList) {
        this.planStudentsList = planStudentsList;
    }
}
