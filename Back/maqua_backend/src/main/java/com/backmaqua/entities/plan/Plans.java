package com.backmaqua.entities.plan;

import java.util.ArrayList;
import java.util.List;

public class Plans {
	
private List<Plan> planList;
	
	public List<Plan> getPlansList(){
		if( planList == null) {
			planList = new ArrayList<>();
		}
		return planList;
	}
	
	public void setPlanList(List<Plan> planList) {
        this.planList = planList;
    }

}
