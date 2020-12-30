package com.example.warehouse.repository;


import com.example.warehouse.model.AppRole;
import com.example.warehouse.model.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface RoleRepository extends JpaRepository<AppRole, String> {
    Optional<AppRole> findByName(ERole name);

}
