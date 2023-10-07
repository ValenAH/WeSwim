package com.backmaqua.entities.customer;

import java.util.ArrayList;
import java.util.List;

public class Customers {
	
	private List<Customer> customerList;
	
	public List<Customer> getCustomerList(){
		if(customerList == null) {
			customerList = new ArrayList<>();
			}
		return customerList;
	}
	
	public void setCustomerList(List<Customer> customerList) {
		this.customerList = customerList;
	}
	
}

