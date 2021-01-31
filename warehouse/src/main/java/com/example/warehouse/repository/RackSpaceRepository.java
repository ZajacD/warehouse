package com.example.warehouse.repository;

import com.example.warehouse.model.RackSpace;
import com.example.warehouse.model.RackSpaceStatus;
import com.example.warehouse.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RackSpaceRepository extends JpaRepository<RackSpace, Long> {

    RackSpace findById(long id);

    List<RackSpace> findBySeller(Seller seller);
    List<RackSpace> findBySellerAndPriorityAndStatus(Seller seller, int id, RackSpaceStatus rackspaceStatus);
    RackSpace findFirstBySellerOrderByPriorityDesc(Seller seller);
}