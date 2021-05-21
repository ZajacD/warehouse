package com.example.warehouse.model;

import org.hibernate.envers.Audited;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Audited
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
    @ManyToOne
    private Seller seller;
    @OneToOne
    private RackSpace rackSpace;
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

    public RackSpace getRackSpace() {
        return rackSpace;
    }

    public void setRackSpace(RackSpace rackSpace) {
        this.rackSpace = rackSpace;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    @Override
    public String toString() {
        return "Material{" +
                "id=" + id +
                ", nofMaterial=" + nofMaterial +
                ", width=" + width +
                ", height=" + height +
                ", length=" + length +
                ", weight=" + weight +
                ", dateOfUse=" + dateOfUse +
                ", priority=" + priority +
                ", supplier='" + supplier + '\'' +
                ", supplierCountry='" + supplierCountry + '\'' +
                ", status='" + status + '\'' +
                ", seller=" + seller +
                ", rackSpace=" + rackSpace +
                '}';
    }
}