package com.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.demo.entity.Teacher;

@Repository
@RepositoryRestResource(collectionResourceRel = "teachers",
path = "teachers")

public interface TeacherCRUDRepository extends CrudRepository<Teacher, Long>{

}
