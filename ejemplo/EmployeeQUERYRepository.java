package com.ejemplo;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.app.entity.Employee;

@RepositoryRestResource(collectionResourceRel = "employees", path = "employees")
public interface EmployeeQUERYRepository extends PagingAndSortingRepository<Employee, Long>{
	List<Employee> findByFirstName(@Param("name") String name);
}
