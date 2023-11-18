package com.backmaqua.entities.planClass;

import java.util.ArrayList;
import java.util.List;

public class PlanClasses {

private List<PlanClass> planClassesList;
	
	public List<PlanClass> getPlanClassesList(){
		if( planClassesList == null) {
			planClassesList = new ArrayList<>();
		}
		return planClassesList;
	}
	
	public void setPlanClassList(List<PlanClass> planClassesList) {
        this.planClassesList = planClassesList;
    }
}
