package com.backmaqua.repository.transaction;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.backmaqua.entities.transaction.Transaction;
import com.backmaqua.entities.transaction.Transactions;

import org.springframework.stereotype.Repository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Repository
@RepositoryRestResource(collectionResourceRel = "transactions", path ="transactions")
public interface TransactionCRUDRepository extends CrudRepository<Transaction, Long>{
	List<Transaction> findByIdUser(String idUser);
}