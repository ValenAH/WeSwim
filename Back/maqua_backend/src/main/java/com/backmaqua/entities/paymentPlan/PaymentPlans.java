package com.demo.entity.PaymentPlan;

import java.util.ArrayList;
import java.util.List;

public class PaymentPlans {
	private List<PaymentPlan> paymentPlanList;
	
	public List<PaymentPlan> getPaymentPlansList(){
		if( paymentPlanList == null) {
			paymentPlanList = new ArrayList<>();
		}
		return paymentPlanList;
	}
		
	public void setPaymentPlanList(List<PaymentPlan> paymentPlanList) {
        this.paymentPlanList = paymentPlanList;
    }
}
