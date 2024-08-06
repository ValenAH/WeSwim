package com.backmaqua.repository.paymentPlan;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import com.backmaqua.entities.paymentPlan.PaymentPlan;

@RepositoryRestResource(collectionResourceRel = "paymentPlans", path = "paymentPlans")
public interface PaymentPlanQUERYRepository extends JpaRepository<PaymentPlan, Long> {
    PaymentPlan findByPeopleQuantityAndPeriodicity(int studentsNumber, int periodicity);
}

