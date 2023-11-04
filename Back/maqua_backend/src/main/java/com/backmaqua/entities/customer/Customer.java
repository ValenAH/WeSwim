package com.backmaqua.entities.customer;

import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Customer {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private String name;
	private String email;
	private String documentTypeId;
	private String documentNumber;
	private String address;
	private String phone;
	private Long userId;
	private Long paymentPlanId;
	private String password;
	
	public Customer() {}

	public Customer(Long id, String name,String email,String documentTypeId, String documentNumber,String address,String phone,Long userId, Long paymentPlanId) {
		this.id = id;
		this.name = name;
		this.email= email;
		this.documentTypeId = documentTypeId;
		this.documentNumber = documentNumber;
		this.address = address;
		this.phone = phone;
		this.userId = userId;
		this.paymentPlanId= paymentPlanId;
		this.password = password;
		
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Customer other = (Customer) obj;
		return Objects.equals(address, other.address) && Objects.equals(documentNumber, other.documentNumber)
				&& Objects.equals(documentTypeId, other.documentTypeId) && Objects.equals(email, other.email)
				&& Objects.equals(id, other.id) && Objects.equals(name, other.name)
				&& Objects.equals(paymentPlanId, other.paymentPlanId) && Objects.equals(phone, other.phone)
				&& Objects.equals(userId, other.userId) &&
						Objects.equals(password, other.password);
	}	

	@Override
	public int hashCode() {
		return Objects.hash(address, documentNumber, documentTypeId, email, id, name, paymentPlanId, phone, userId, password);
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDocumentTypeId() {
		return documentTypeId;
	}

	public void setDocumentTypeId(String documentTypeId) {
		this.documentTypeId = documentTypeId;
	}

	public String getDocumentNumber() {
		return documentNumber;
	}

	public void setDocumentNumber(String documentNumber) {
		this.documentNumber = documentNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getPaymentPlanId() {
		return paymentPlanId;
	}

	public void setPaymentPlanId(Long paymentPlanId) {
		this.paymentPlanId = paymentPlanId;
	}
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Customer{" +
			"id=" + id +
			", name='" + name + '\'' +
			", email='" + email + '\'' +
			", documentTypeId='" + documentTypeId + '\'' +
			", documentNumber='" + documentNumber + '\'' +
			", address='" + address + '\'' +
			", phone='" + phone + '\'' +
			", userId='" + userId + '\'' +
			", paymentPlanId='" + paymentPlanId + '\'' +
			", password='" + password + '\'' +
			'}';

	}
		
}
