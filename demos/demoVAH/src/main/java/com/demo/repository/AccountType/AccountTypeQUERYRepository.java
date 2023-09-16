package com.demo.repository.AccountType;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.demo.entity.AccountType.AccountType;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface AccountTypeQUERYRepository extends PagingAndSortingRepository<AccountType, Long>{
	//List<AccountType> findByFirstName(@Param("name") String name);
}