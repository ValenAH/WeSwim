package com.demo.entity.PaymentPlan;

import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import com.demo.entity.User.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class PaymentPlan {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private int periodicity; //time by week
	private int peopleQuantity;
	private Double price;
	
	public PaymentPlan() {}
	
	public PaymentPlan(Long id, int periodicity, int peopleQuantity, Double price) {
		this.id = id;
		this.periodicity = periodicity;
		this.peopleQuantity = peopleQuantity;
		this.price = price;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PaymentPlan other = (PaymentPlan) obj;
		return Objects.equals(id, other.id) && peopleQuantity == other.peopleQuantity
				&& periodicity == other.periodicity && Objects.equals(price, other.price);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, peopleQuantity, periodicity, price);
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
	public int getPeriodicity() {
		return periodicity;
	}

	public void setPeriodicity(int periodicity) {
		this.periodicity = periodicity;
	}
	
	public int getPeopleQuantity() {
		return peopleQuantity;
	}

	public void setPeopleQuantity(int peopleQuantity) {
		this.peopleQuantity = peopleQuantity;
	}
	
	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}
}
