package com.backmaqua.repository.role;

import org.springframework.data.repository.CrudRepository;

import com.backmaqua.entities.role.Role;

public interface RoleCRUDRepository extends CrudRepository<Role, Long> {
}
