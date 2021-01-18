package com.example.warehouse.payload.request;

import com.example.warehouse.model.Material;

import java.time.LocalDate;

public class MaterialRequest {

    public MaterialRequest(Material material) {
        this.id = material.getId();
        this.nofMaterial = material.getNofMaterial();
        this.weight = material.getWeight();
        this.height = material.getHeight();
        this.length = material.getLength();
        this.width = material.getWidth();
        this.dateOfUse = material.getDateOfUse();
        this.priority = material.getPriority();
        this.supplier = material.getSupplier();
        this.supplierCountry = material.getSupplierCountry();
        this.status = material.getStatus();
    }

    private Long id;

    private Long nofMaterial;
    private double width;
    private double height;
    private double length;
    private double weight;
    private LocalDate dateOfUse;
    private int priority;
    private String supplier;
    private String supplierCountry;
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getNofMaterial() {
        return nofMaterial;
    }

    public void setNofMaterial(Long nofMaterial) {
        this.nofMaterial = nofMaterial;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getLength() {
        return length;
    }

    public void setLength(double length) {
        this.length = length;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public LocalDate getDateOfUse() {
        return dateOfUse;
    }

    public void setDateOfUse(LocalDate dateOfUse) {
        this.dateOfUse = dateOfUse;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getSupplierCountry() {
        return supplierCountry;
    }

    public void setSupplierCountry(String supplierCountry) {
        this.supplierCountry = supplierCountry;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
