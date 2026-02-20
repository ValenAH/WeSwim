package com.backmaqua.repository.plan;

import org.springframework.stereotype.Repository;

import com.backmaqua.entities.plan.Plan;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Repository
@RepositoryRestResource(collectionResourceRel = "plans", path ="plans")

public interface PlanCRUDRepository extends CrudRepository<Plan, Long>{
	java.util.List<Plan> findByTeacherId(Long teacherId);
}

