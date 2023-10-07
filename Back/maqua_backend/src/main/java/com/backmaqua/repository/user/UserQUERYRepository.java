package com.backmaqua.repository.user;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.backmaqua.entities.user.User;

@RepositoryRestResource(collectionResourceRel = "users", path = "users")
public interface UserQUERYRepository extends PagingAndSortingRepository<User, Long>{
	//List<User> findByFirstName(@Param("name") String name);
}