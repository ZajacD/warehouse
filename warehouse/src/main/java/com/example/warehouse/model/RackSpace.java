package com.example.warehouse.model;

import org.hibernate.envers.Audited;

import javax.persistence.*;

@Entity
@Audited
public class RackSpace {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String rackId;

    @Enumerated(EnumType.STRING)
    private RackSpaceStatus status;
    private double width;
    private double height;
    private double length;
    private double maxWeight;
    private int priority;
    @ManyToOne
    private Seller seller;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRackId() {
        return rackId;
    }

    public void setRackId(String rackId) {
        this.rackId = rackId;
    }

    public RackSpaceStatus getStatus() {
        return status;
    }

    public void setStatus(RackSpaceStatus status) {
        this.status = status;
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

    public double getMaxWeight() {
        return maxWeight;
    }

    public void setMaxWeight(double maxWeight) {
        this.maxWeight = maxWeight;
    }

    public int getPriority() {
        return priority;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public Seller getSeller() {
        return seller;
    }

    public void setSeller(Seller seller) {
        this.seller = seller;
    }

    @Override
    public String toString() {
        return "RackSpace{" +
                "id=" + id +
                ", rackId='" + rackId + '\'' +
                ", status=" + status +
                ", width=" + width +
                ", height=" + height +
                ", length=" + length +
                ", maxWeight=" + maxWeight +
                ", priority=" + priority +
                ", seller=" + seller +
                '}';
    }
}