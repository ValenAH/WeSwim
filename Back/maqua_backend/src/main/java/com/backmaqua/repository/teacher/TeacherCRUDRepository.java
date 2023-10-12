package com.backmaqua.repository.teacher;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.backmaqua.entities.teacher.Teacher;

@Repository
@RepositoryRestResource(collectionResourceRel = "teachers",
path = "teachers")

public interface TeacherCRUDRepository extends CrudRepository<Teacher, Long>{

}
