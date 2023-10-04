package com.backmaqua.repository.bank;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import com.backmaqua.entities.bank.Bank;

@Repository
@RepositoryRestResource(collectionResourceRel = "banks",
path = "banks")

public interface BankCRUDRepository extends CrudRepository<Bank, Long>{

}
