package com.backmaqua.repository.paymentPlan;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.backmaqua.entities.paymentPlan.PaymentPlan;

@RepositoryRestResource(collectionResourceRel = "paymentPlans", path = "paymentPlans")
public interface PaymentPlanQUERYRepository extends PagingAndSortingRepository<PaymentPlan, Long>{
	//List<PaymentPlan> findByFirstName(@Param("name") String name);
}
