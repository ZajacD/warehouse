package com.example.warehouse.repository;

import com.example.warehouse.model.Material;
import com.example.warehouse.model.RackSpace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RackSpaceRepository extends JpaRepository<RackSpace, Long> {

}