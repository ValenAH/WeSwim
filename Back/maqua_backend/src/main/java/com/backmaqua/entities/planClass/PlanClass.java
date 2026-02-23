package com.backmaqua.entities.planClass;

import java.time.LocalTime;
import java.util.Date;
import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PlanClass {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private Date classDate;
	private Long planId;
	/** SCHEDULED, COMPLETED, CANCELLED, POSTPONED, REPOSICION */
	private String status;
	private String notes;
	private LocalTime startTime;
	private LocalTime endTime;
	@Column(name = "original_plan_class_id")
	private Long originalPlanClassId;
	@Column(name = "repositioned_to_plan_class_id")
	private Long repositionedToPlanClassId;
	
	public PlanClass() {}
	
	public PlanClass(Long id, Date classDate, Long planId) {
		this.id = id;
		this.classDate = classDate;
		this.planId = planId;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PlanClass other = (PlanClass) obj;
		return Objects.equals(id, other.id) && Objects.equals(classDate, other.classDate)
				&& Objects.equals(planId, other.planId) && Objects.equals(status, other.status)
				&& Objects.equals(notes, other.notes) && Objects.equals(startTime, other.startTime)
				&& Objects.equals(endTime, other.endTime) && Objects.equals(originalPlanClassId, other.originalPlanClassId)
				&& Objects.equals(repositionedToPlanClassId, other.repositionedToPlanClassId);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, classDate, planId, status, notes, startTime, endTime, originalPlanClassId, repositionedToPlanClassId);
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Date getClassDate() {
		return classDate;
	}

	public void setClassDate(Date classDate) {
		this.classDate = classDate;
	}
	
	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public LocalTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalTime startTime) {
		this.startTime = startTime;
	}

	public LocalTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalTime endTime) {
		this.endTime = endTime;
	}

	public Long getOriginalPlanClassId() {
		return originalPlanClassId;
	}

	public void setOriginalPlanClassId(Long originalPlanClassId) {
		this.originalPlanClassId = originalPlanClassId;
	}

	public Long getRepositionedToPlanClassId() {
		return repositionedToPlanClassId;
	}

	public void setRepositionedToPlanClassId(Long repositionedToPlanClassId) {
		this.repositionedToPlanClassId = repositionedToPlanClassId;
	}
}
