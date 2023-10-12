package com.backmaqua.repository.teacher;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.backmaqua.entities.teacher.Teacher;

import org.springframework.data.repository.CrudRepository;

@RepositoryRestResource(collectionResourceRel = "teachers", path = "teachers")
public interface TeacherQUERYRepository extends PagingAndSortingRepository<Teacher, Long> {
	//List<Teacher> findByFirstName(@Param("name") String name);
}
