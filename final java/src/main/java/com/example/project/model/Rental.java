package com.example.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class Rental {
    public enum status{
        active,required
    }
    @Id
    @GeneratedValue
    private Long rentalid;
    @ManyToOne
    private Car car;
    @ManyToOne
    private Users renter;

@JsonIgnore
@OneToMany(mappedBy="rental", cascade = CascadeType.REMOVE, orphanRemoval = true)
private List<Available> rentalPeriod;
    private double totalPrice;
    private status st;
@JsonIgnore
    @OneToOne (mappedBy = "rental",cascade = CascadeType.ALL)
    private Payment pay;



    public Rental() {
    }




    public Rental(Long rentalid, Car carId, Users renterId,List<Available> rentalPeriod, double totalPrice, status st, Payment pay) {
        this.rentalid = rentalid;
        this.car = carId;
        this.renter = renterId;
        this.rentalPeriod = rentalPeriod;

        this.totalPrice = totalPrice;
        this.st = st;
        this.pay = pay;
    }


    public Long getRentalid() {
        return rentalid;
    }

    public void setRentalid(Long rentalid) {
        this.rentalid = rentalid;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car carId) {
        this.car = carId;
    }

    public Users getRenter() {
        return renter;
    }

    public void setRenter(Users renterId) {
        this.renter = renterId;
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

    public status getSt() {
        return st;
    }

    public void setSt(status st) {
        this.st = st;
    }

    public Payment getPay() {
        return pay;
    }

    public void setPay(Payment pay) {
        this.pay = pay;
    }
}

