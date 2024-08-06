package com.backmaqua.repository.planStudent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backmaqua.entities.planStudent.PlanStudent;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Repository
@RepositoryRestResource(collectionResourceRel = "planStudents", path ="planStudents")

public interface PlanStudentCRUDRepository extends JpaRepository<PlanStudent, Long> {

}
