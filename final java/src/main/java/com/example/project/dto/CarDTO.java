package com.example.project.dto;

import com.example.project.model.Available;
import com.example.project.model.Car;
import com.example.project.model.Users;
import jakarta.persistence.Embedded;
import jakarta.persistence.ManyToOne;

import java.util.List;

public class CarDTO {
    private Long carId;
    private String model;
    private String carYear;
    private String licensePlate;
    private Users owner;
    private Double dayRate;
    private Car.Location location;
    private List<Available> available;
    private List<byte[]> images;

    public CarDTO() {
    }

    public CarDTO(Long carId, String model, String carYear, String licensePlate, Users owner, Double dayRate, Car.Location location, List<byte[]> images,List<Available> available) {
        this.carId = carId;
        this.model = model;
        this.carYear = carYear;
        this.licensePlate = licensePlate;
        this.owner = owner;
        this.dayRate = dayRate;
        this.location = location;
        this.images=images;
        this.available=available;
    }

    public List<Available> getAvailable() {
        return available;
    }

    public void setAvailable(List<Available> available) {
        this.available = available;
    }

    public List<byte[]> getImages(){
        return images;
    }
    public void setImages(List<byte[]> images){
        this.images=images;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getCarYear() {
        return carYear;
    }

    public void setCarYear(String carYear) {
        this.carYear = carYear;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public Users getOwner() {
        return owner;
    }

    public void setOwner(Users owner) {
        this.owner = owner;
    }

    public Double getDayRate() {
        return dayRate;
    }

    public void setDayRate(Double dayRate) {
        this.dayRate = dayRate;
    }

    public Car.Location getLocation() {
        return location;
    }

    public void setLocation(Car.Location location) {
        this.location = location;
    }
}
