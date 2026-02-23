package com.backmaqua.entities.planStudent;

import java.util.ArrayList;
import java.util.List;

public class PlanStudents {

	private List<PlanStudent> planStudentList;

	public List<PlanStudent> getPlanStudentList() {
		if (planStudentList == null) {
			planStudentList = new ArrayList<>();
		}
		return planStudentList;
	}

	public void setPlanStudentList(List<PlanStudent> planStudentList) {
		this.planStudentList = planStudentList;
	}
}
