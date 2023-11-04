package com.backmaqua.entities.planStudent;

import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PlanStudent {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private Long customerId; //time by week
	private Double amount;
	private Long planId;
	
	public PlanStudent() {}
	
	public PlanStudent(Long id, Long customerId, Double amount, Long planId) {
		this.id = id;
		this.customerId = customerId;
		this.amount = amount;
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
		PlanStudent other = (PlanStudent) obj;
		return Objects.equals(id, other.id) && customerId == other.customerId
				&& amount == other.amount && Objects.equals(planId, other.planId);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, customerId, amount, planId);
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getIdPaymentPlan() {
		return customerId;
	}

	public void setIdPaymentPlan(Long idPaymentPlan) {
		this.customerId = idPaymentPlan;
	}
	
	public Double getAmount() {
		return amount;
	}

	public void setCreationDate(Double amount) {
		this.amount = amount;
	}
	
	public Long getPlanId() {
		return planId;
	}

	public void setPlanId(Long planId) {
		this.planId = planId;
	}
}

