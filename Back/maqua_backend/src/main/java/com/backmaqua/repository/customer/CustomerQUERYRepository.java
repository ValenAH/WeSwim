package com.backmaqua.repository.customer;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.backmaqua.entities.customer.Customer;

@RepositoryRestResource(collectionResourceRel = "teachers", path = "teachers")
public interface CustomerQUERYRepository extends PagingAndSortingRepository<Customer, Long> {
    //List<Teacher> findByFirstName(@Param("name") String name);
}