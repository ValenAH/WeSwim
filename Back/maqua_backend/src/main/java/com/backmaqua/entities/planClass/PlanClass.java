package com.backmaqua.entities.planClass;

import java.sql.Date;
import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PlanClass {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private Date classDate; //time by week
	private Long planId;
	
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
		return Objects.equals(id, other.id) && classDate == other.classDate
				 && Objects.equals(planId, other.planId);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, classDate, planId);
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
}
