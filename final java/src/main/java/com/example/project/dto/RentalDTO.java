package com.example.project.dto;

import com.example.project.model.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

public class RentalDTO {
    public enum status{
        active,required
    }

    @ManyToOne
    private Car car;
    @ManyToOne
    private Users renter;
    private List<Available> rentalPeriod;
    private double totalPrice;
    private Rental.status st;


    public RentalDTO() {

    }

    public RentalDTO(Car car, Users renter, List<Available> rentalPeriod, double totalPrice, Rental.status st) {
        this.car = car;
        this.renter = renter;
        this.rentalPeriod = rentalPeriod;
        this.totalPrice = totalPrice;
        this.st = st;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Users getRenter() {
        return renter;
    }

    public void setRenter(Users renter) {
        this.renter = renter;
    }

    public List<Available> getRentalPeriod() {
        return rentalPeriod;
    }

    public void setRentalPeriod(List<Available> rentalPeriod) {
        this.rentalPeriod = rentalPeriod;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Rental.status getSt() {
        return st;
    }

    public void setSt(Rental.status st) {
        this.st = st;
    }
}
