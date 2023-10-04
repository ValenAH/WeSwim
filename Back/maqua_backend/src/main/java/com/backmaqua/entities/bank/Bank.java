package com.backmaqua.entities.bank;

import java.util.Arrays;
import java.util.Objects;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Bank {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private Long id;
    private String nameBank;
    private String location;
    private String contactEmail;
    private String typeAccount;
    private String[] accountsAssociated;

    public Bank() {}

    public Bank(Long id, String nameBank, String location, String contactEmail, String typeAccount, String[] accountsAssociated) {
        super();
        this.id = id;
        this.nameBank = nameBank;
        this.location = location;
        this.contactEmail = contactEmail;
        this.typeAccount = typeAccount;
        this.accountsAssociated = accountsAssociated;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bank bank = (Bank) o;
        return Objects.equals(id, bank.id) &&
            Objects.equals(nameBank, bank.nameBank) &&
            Objects.equals(location, bank.location) &&
            Objects.equals(contactEmail, bank.contactEmail) &&
            Objects.equals(typeAccount, bank.typeAccount) &&
            Arrays.equals(accountsAssociated, bank.accountsAssociated);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(id, nameBank, location, contactEmail, typeAccount);
        result = 31 * result + Arrays.hashCode(accountsAssociated);
        return result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameBank() {
        return nameBank;
    }

    public void setNameBank(String nameBank) {
        this.nameBank = nameBank;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getContactEmail() {
        return contactEmail;
    }

    public void setContactEmail(String contactEmail) {
        this.contactEmail = contactEmail;
    }

    public String getTypeAccount() {
        return typeAccount;
    }

    public void setTypeAccount(String typeAccount) {
        this.typeAccount = typeAccount;
    }

    public String[] getAccountsAssociated() {
        return accountsAssociated;
    }

    public void setAccountsAssociated(String[] accountsAssociated) {
        this.accountsAssociated = accountsAssociated;
    }

    @Override
    public String toString() {
        return "Bank{" +
            "id=" + id +
            ", nameBank='" + nameBank + '\'' +
            ", location='" + location + '\'' +
            ", contactEmail='" + contactEmail + '\'' +
            ", typeAccount='" + typeAccount + '\'' +
            ", accountsAssociated=" + Arrays.toString(accountsAssociated) +
            '}';
    }
}
