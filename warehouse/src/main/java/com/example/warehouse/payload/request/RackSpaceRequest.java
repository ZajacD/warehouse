package com.example.warehouse.payload.request;

import com.example.warehouse.model.RackSpace;

public class RackSpaceRequest {

    public RackSpaceRequest(RackSpace rackSpace) {
        this.id = rackSpace.getId();
        this.rackId = rackSpace.getRackId();
        this.status = rackSpace.getStatus().toString();
        this.width = rackSpace.getWidth();
        this.height = rackSpace.getHeight();
        this.length = rackSpace.getLength();
        this.maxWeight = rackSpace.getMaxWeight();
        this.priority = rackSpace.getPriority();
    }

    private Long id;

    private String rackId;

    private String status;
    private double width;
    private double height;
    private double length;
    private double maxWeight;
    private int priority;

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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
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
}
