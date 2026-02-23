package com.backmaqua.dto.planClass;

/**
 * Request para solicitar reposición de una clase: nueva fecha y opcionalmente otro horario.
 */
public class RequestRepositionRequest {

	private Long originalPlanClassId;
	private String newDate;   // yyyy-MM-dd
	private String startTime; // HH:mm (opcional)
	private String endTime;   // HH:mm (opcional)
	private String notes;

	public Long getOriginalPlanClassId() {
		return originalPlanClassId;
	}

	public void setOriginalPlanClassId(Long originalPlanClassId) {
		this.originalPlanClassId = originalPlanClassId;
	}

	public String getNewDate() {
		return newDate;
	}

	public void setNewDate(String newDate) {
		this.newDate = newDate;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
}
