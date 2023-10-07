package com.backmaqua.repository.customer;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.backmaqua.entities.customer.Customer;

@Repository
@RepositoryRestResource(collectionResourceRel = "customers",
path = "customers")
 
public interface CustomerCRUDRepository extends CrudRepository<Customer, Long>{
 
} 