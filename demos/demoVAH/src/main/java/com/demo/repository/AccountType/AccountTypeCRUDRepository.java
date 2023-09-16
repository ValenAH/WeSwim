package com.demo.repository.AccountType;

import org.springframework.stereotype.Repository;

import com.demo.entity.AccountType.AccountType;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Repository
@RepositoryRestResource(collectionResourceRel = "users", path ="users")

public interface AccountTypeCRUDRepository extends CrudRepository<AccountType, Long>{

}