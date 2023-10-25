package com.backmaqua.entities.transaction;

import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator="native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;
    private Integer status;
    private Integer quantity;
    private String paymentMethod;
    private Date date;
    private String idUser;

    public Transaction() { }

    public Transaction(Long id, Integer status, Integer quantity, String paymentMethod, Date date, String idUser) {
        this.id = id;
        this.status = status;
        this.quantity = quantity;
        this.paymentMethod = paymentMethod;
        this.date = date;
        this.idUser = idUser;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getIdUser() {
		return idUser;
	}

	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Transaction that = (Transaction) o;
        return id.equals(that.id) &&
                status.equals(that.status) &&
                quantity.equals(that.quantity) &&
                paymentMethod.equals(that.paymentMethod) &&
                date.equals(that.date);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, status, quantity, paymentMethod, date);
    }

    @Override
    public String toString() {
        return "Transaction{" +
                "id=" + id +
                ", status=" + status +
                ", quantity=" + quantity +
                ", paymentMethod='" + paymentMethod + '\'' +
                ", date=" + date +
                ", idUser='" + idUser + '\'' +
                '}';
    }
}
