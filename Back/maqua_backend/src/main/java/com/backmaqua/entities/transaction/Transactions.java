package com.backmaqua.entities.transaction;

import java.util.ArrayList;
import java.util.List;

public class Transactions 
{
    private List<Transaction> transactionList;
    
    public List<Transaction> getTransactionList() {
        if(transactionList == null) {
        	transactionList = new ArrayList<>();
        }
        return transactionList;
    }
 
    public void setTransactionList(List<Transaction> transactionList) {
        this.transactionList = transactionList;
    }
}