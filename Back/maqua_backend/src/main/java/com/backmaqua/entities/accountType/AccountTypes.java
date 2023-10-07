package com.backmaqua.entities.accountType;

import java.util.ArrayList;
import java.util.List;

public class AccountTypes {
	private List<AccountType> accountTypeList;
		
	public List<AccountType> getAccountTypesList(){
		if( accountTypeList == null) {
			accountTypeList = new ArrayList<>();
		}
		return accountTypeList;
	}
		
	public void setAccountTypeList(List<AccountType> accountTypeList) {
        this.accountTypeList = accountTypeList;
    }
}
