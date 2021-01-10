package com.example.warehouse.repository;

import com.example.warehouse.model.AppRole;
import com.example.warehouse.model.ERole;
import com.example.warehouse.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {

}