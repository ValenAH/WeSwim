package com.backmaqua.repository.paymentPlan;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.backmaqua.entities.paymentPlan.PaymentPlan;

@Repository
@RepositoryRestResource(collectionResourceRel = "paymentPlans", path ="paymentPlans")

public interface PaymentPlanCRUDRepository extends CrudRepository<PaymentPlan, Long>{

}
