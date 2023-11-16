package com.backmaqua.entities.teacher;

import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class Teacher {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private String name;
	private String email;
	private Long documentTypeid;
	private String documentNumber;
	private String Phone;
	private Long userid;
	private Long Bankid;
	private String AccountType;
	private String AccountNumber;
	private String password;

	
	public Teacher() {}

	public Teacher(Long id, String name, String email, Long documentTypeid,String documentNumber,
			String Phone,Long userid, Long Bankid, String AccountType, String AccountNumber,String password ) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.documentTypeid = documentTypeid;
		this.documentNumber = documentNumber;
		this.Phone = Phone;
		this.userid = userid;
		this.Bankid = Bankid;
		this.AccountType = AccountType;
		this.AccountNumber = AccountNumber;
		this.password = password;
		
	}
	
	@Override
	public boolean equals(Object o) {
	  if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Teacher teacher = (Teacher) o;
		return Objects.equals(id, teacher.id) &&
			Objects.equals(name, teacher.name) &&
			Objects.equals(email, teacher.email) &&
			Objects.equals(documentTypeid, teacher.documentTypeid) &&
			Objects.equals(documentNumber, teacher.documentNumber) &&
			Objects.equals(Phone, teacher.Phone)&&
			Objects.equals(userid, teacher.userid)&&
			Objects.equals(Bankid, teacher.Bankid)&&
			Objects.equals(AccountType, teacher.AccountType)&&
			Objects.equals(AccountNumber, teacher.AccountNumber);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, name, email, documentTypeid,documentNumber,Phone,
				             userid,Bankid,AccountType,AccountNumber,password);
	}
	
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getname() {
		return name;
	}

	public void setname(String name) {
		this.name = name;
	}

	public String getemail() {
		return email;
	}

	public void setemail(String email) {
		this.email = email;
	}
	
	public Long getdocumentTypeid() {
		return documentTypeid;
	}

	public void setdocumentTypeid(Long documentTypeid) {
		this.documentTypeid = documentTypeid;
	}
	
	public String getdocumentNumber() {
		return documentNumber;
	}

	public void setdocumentNumber(String documentNumber) {
		this.documentNumber = documentNumber;
	}
	
	public String getPhone() {
		return Phone;
	}

	public void setPhone(String Phone) {
		this.Phone = Phone;
	}
	
	
	public Long getuserid() {
		return userid;
	}

	public void setuserid(Long userid) {
		this.userid = userid;
	}
	
	public Long getBankid() {
		return Bankid;
	}

	public void setBankid(Long Bankid) {
		this.Bankid = Bankid;
	}
	
	public String getAccountType() {
		return AccountType;
	}

	public void setAccountType(String AccountType) {
		this.AccountType = AccountType;
	}
	
	public String getAccountNumber() {
		return AccountNumber;
	}

	public void setAccountNumber(String AccountNumber) {
		this.AccountNumber = AccountNumber;
	}
	
	public String getpassword() {
		return password;
	}

	public void setpassword(String password) {
		this.password = password;
	}

	@Override
	public String toString() {
		return "Teacher [id=" + id + ", name=" + name + ", email=" + email + ", documentTypeid=" + documentTypeid
				+ ", documentNumber=" + documentNumber + ", Phone=" + Phone + ", userid=" + userid + ", Bankid="
				+ Bankid + ", AccountType=" + AccountType + ", AccountNumber=" + AccountNumber +",password="+password+ "]";
	}
	
	
	
	
}


