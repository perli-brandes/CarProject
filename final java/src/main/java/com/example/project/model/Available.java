package com.example.project.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

import java.time.LocalDate;

@Entity
public class Available {
    public  enum Status{
        active,booked,expired
    }

    @Id
    @GeneratedValue
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    @ManyToOne
    private Car car;
    @ManyToOne
    private Rental rental;
    private Status status;

    public Available() {
    }


    public Available(Status status,Long id, LocalDate startDate,Rental rental, LocalDate endDate, Car car) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.car = car;
        this.rental = rental;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setRental(Rental rental) {
        this.rental = rental;
    }
    public Rental getRental() {
        return rental;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public Status getStatus() {return  status;}
    public void setStatus(Status status) {this.status = status;}
}
