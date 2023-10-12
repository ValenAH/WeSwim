package com.backmaqua.repository.transaction;

import org.springframework.data.repository.CrudRepository;
import com.backmaqua.entities.transaction.Transaction;
import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Repository
@RepositoryRestResource(collectionResourceRel = "transactions", path ="transactions")
public interface TransactionCRUDRepository extends CrudRepository<Transaction, Long>{

}