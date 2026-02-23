package com.backmaqua.dto.planClass;

import java.util.List;

/**
 * Request para generar clases de un plan entre startDate y endDate en los días indicados.
 * daysOfWeek: 1 = Lunes … 7 = Domingo.
 */
public class GenerateClassesRequest {

	private Long planId;
	private String startDate; // yyyy-MM-dd
	private String endDate;   // yyyy-MM-dd
	private List<Integer> daysOfWeek;

	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public List<Integer> getDaysOfWeek() {
		return daysOfWeek;
	}

	public void setDaysOfWeek(List<Integer> daysOfWeek) {
		this.daysOfWeek = daysOfWeek;
	}
}
