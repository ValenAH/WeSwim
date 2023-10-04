package com.backmaqua.entities.bank;

import java.util.ArrayList;
import java.util.List;

public class Banks 
{
    private List<Bank> bankList;
    
    public List<Bank> getBankList() {
        if(bankList == null) {
            bankList = new ArrayList<>();
        }
        return bankList;
    }
 
    public void setBankList(List<Bank> bankList) {
        this.bankList = bankList;
    }
}
