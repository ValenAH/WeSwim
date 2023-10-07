package com.backmaqua.entities.user;

import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
	
	@Id @GeneratedValue(strategy=GenerationType.AUTO , generator="native")
	@GenericGenerator(name = "native", strategy = "native")
	private Long id;
	private String username;
	private String password;
	private Long rolId;
	
	public User(){ }
	
	public User(Long id, String username, String password, Long rolId) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.rolId = rolId;
	}
	
	@Override
	public boolean equals(Object o) {
	  if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		User user = (User) o;
		return Objects.equals(id, user.id) &&
			Objects.equals(username, user.username) &&
			Objects.equals(password, user.password) &&
			Objects.equals(rolId, user.rolId);
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(id, username, password, rolId);
	}

	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getUser() {
		return username;
	}
	
	public void setUser(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Long getRolId() {
		return rolId;
	}
	public void setRolId(Long rolId) {
		this.rolId = rolId;
	}
	
	@Override
	public String toString() {

		return "User{" +
			"id=" + id +
			", username='" + username + '\'' +
			", password='" + password + '\'' +
			", rolId='" + rolId + '\'';

	}
}
