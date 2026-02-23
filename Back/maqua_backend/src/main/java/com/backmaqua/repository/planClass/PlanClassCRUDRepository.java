package com.backmaqua.repository.planClass;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.backmaqua.entities.planClass.PlanClass;

@Repository
@RepositoryRestResource(collectionResourceRel = "planClasses", path ="planClasses")
public interface PlanClassCRUDRepository extends CrudRepository<PlanClass, Long> {

	List<PlanClass> findByPlanId(Long planId);

	List<PlanClass> findByPlanIdAndClassDateBetween(Long planId, Date from, Date to);

	/** Para validar si ya existe una clase del plan en una fecha (reposición). */
	List<PlanClass> findByPlanIdAndClassDate(Long planId, Date classDate);
}
