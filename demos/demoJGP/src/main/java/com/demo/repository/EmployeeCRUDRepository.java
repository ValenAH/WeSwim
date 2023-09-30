package com.demo.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.demo.entity.Employee;

@Repository
@RepositoryRestResource(collectionResourceRel = "employees",
						path = "employees")
public interface EmployeeCRUDRepository extends CrudRepository<Employee, Long>{

}
