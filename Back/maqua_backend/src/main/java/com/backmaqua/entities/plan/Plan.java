package com.backmaqua.entities.plan;

import java.sql.Date;
import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Plan {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private Long PaymentPlanId; //time by week
	private Date creationDate;
	private Double totalAmount;
	
	public Plan() {}
	
	public Plan(Long id, Long PaymentPlanId, Date creationDate, Double totalAmount) {
		this.id = id;
		this.PaymentPlanId = PaymentPlanId;
		this.creationDate = creationDate;
		this.totalAmount = totalAmount;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Plan other = (Plan) obj;
		return Objects.equals(id, other.id) && PaymentPlanId == other.PaymentPlanId
				&& creationDate == other.creationDate && Objects.equals(totalAmount, other.totalAmount);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, PaymentPlanId, creationDate, totalAmount);
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getIdPaymentPlan() {
		return PaymentPlanId;
	}

	public void setIdPaymentPlan(Long PaymentPlanId) {
		this.PaymentPlanId = PaymentPlanId;
	}
	
	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
}
