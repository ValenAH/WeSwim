package com.backmaqua.repository.user;

import org.springframework.stereotype.Repository;

import com.backmaqua.entities.user.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@Repository
@RepositoryRestResource(collectionResourceRel = "users", path ="users")


public interface UserCRUDRepository extends CrudRepository<User, Long>{

}
