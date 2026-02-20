package com.backmaqua.entities.plan;

import java.util.Date;
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
	private Long PaymentPlanId;
	private Long teacherId;
	private Date creationDate;
	private Double totalAmount;
	
	public Plan() {}
	
	public Plan(Long id, Long PaymentPlanId, Long teacherId, Date date, Double totalAmount) {
		this.id = id;
		this.PaymentPlanId = PaymentPlanId;
		this.teacherId = teacherId;
		this.creationDate = date;
		this.totalAmount = totalAmount;
	}

	public Plan(Long id, Long PaymentPlanId, Date date, Double totalAmount) {
		this(id, PaymentPlanId, null, date, totalAmount);
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
		return Objects.equals(id, other.id) && Objects.equals(PaymentPlanId, other.PaymentPlanId)
				&& Objects.equals(teacherId, other.teacherId) && Objects.equals(creationDate, other.creationDate) && Objects.equals(totalAmount, other.totalAmount);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, PaymentPlanId, teacherId, creationDate, totalAmount);
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

	public Long getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Long teacherId) {
		this.teacherId = teacherId;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}
}
