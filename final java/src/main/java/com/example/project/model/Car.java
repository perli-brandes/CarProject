package com.example.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.util.ArrayList;
import java.util.List;


@Entity
public class Car {
    @Id
    @GeneratedValue
    private Long carId;
    private String model;
    private String carYear;
    private String licensePlate;
    @ManyToOne
    private Users owner;
    private Double dayRate;

    @ElementCollection
    private List<String> imageUrls;

    @JsonIgnore

    @OneToMany(mappedBy="car", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Rental> rentals;

    @JsonIgnore
    @OneToMany(mappedBy = "car", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "car", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<Available> available;

    @Embedded
    private Location location;

    public Car() {}



    public Car(Long carId, String model, String carYear, String licensePlate, Users owner, Double dayRate, List<Rental> rentals, List<Review> reviews, List<Available> available, Location location,List<String> imageUrls) {
        this.carId = carId;
        this.model = model;
        this.carYear = carYear;
        this.licensePlate = licensePlate;
        this.owner = owner;
        this.dayRate = dayRate;
        this.rentals = rentals;
        this.reviews = reviews;
        this.available = available;
        this.location = location;
        this.imageUrls = imageUrls;
    }

    public void setDayRate(Double dayRate) {
        this.dayRate = dayRate;
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

    public void setDayRate(double dayRate) {
        this.dayRate = dayRate;
    }

    public List<Rental> getRentals() {
        return rentals;
    }

    public void setRentals(List<Rental> rentals) {
        this.rentals = rentals;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public List<Available> getAvailable() {
        return available;
    }

    public void setAvailable(List<Available> available) {
        this.available = available;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<String> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(List<String> imageUrls) {
        this.imageUrls = imageUrls;
    }



    @Embeddable
    public static class Location {
        private String address;
        private double latitude;
        private double longitude;

        public Location() {
        }

        public Location(String address, double latitude, double longitude) {
            this.address = address;
            this.latitude = latitude;
            this.longitude = longitude;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public double getLatitude() {
            return latitude;
        }

        public void setLatitude(double latitude) {
            this.latitude = latitude;
        }

        public double getLongitude() {
            return longitude;
        }

        public void setLongitude(double longitude) {
            this.longitude = longitude;
        }
    }
}

