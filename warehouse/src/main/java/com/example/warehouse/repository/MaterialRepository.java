package com.example.warehouse.repository;

import com.example.warehouse.model.Material;
import com.example.warehouse.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    List<Material> findBySeller(Seller seller);

}