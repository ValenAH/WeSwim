package com.backmaqua.repository.planClass;

import org.springframework.stereotype.Repository;

import com.backmaqua.entities.planClass.PlanClass;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Repository
@RepositoryRestResource(collectionResourceRel = "planClasses", path ="planClasses")

public interface PlanClassCRUDRepository extends CrudRepository<PlanClass, Long>{

}
