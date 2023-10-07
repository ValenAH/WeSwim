package com.backmaqua.entities.accountType;

import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AccountType {

	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private String accountType;
	private Long idBank;
	
	public AccountType() {}
	
	public AccountType(Long id, String accountType, Long idBank) {
		this.id = id;
		this.accountType = accountType;
		this.idBank = idBank;
	}
	
	
	@Override
	public int hashCode() {
		return Objects.hash(accountType, id, idBank);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AccountType other = (AccountType) obj;
		return Objects.equals(accountType, other.accountType) && Objects.equals(id, other.id)
				&& Objects.equals(idBank, other.idBank);
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getAccountType() {
		return accountType;
	}
	
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}
	
	public Long getIdBank() {
		return idBank;
	}
	
	public void setIdBank(Long idBank) {
		this.id = idBank;
	}
}
