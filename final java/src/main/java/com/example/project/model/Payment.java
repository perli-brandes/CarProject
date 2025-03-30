package com.example.project.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

import java.time.LocalDate;

@Entity
public class Payment {
    public enum PaymentStatus {
        paid,Awaiting
    }
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Rental rental;

    private LocalDate paymentDate;
    private PaymentStatus status;


    public Payment() {
    }



    public Payment(Long id, Rental rental, LocalDate paymentDate, PaymentStatus status) {
        this.id = id;
        this.rental = rental;
        this.paymentDate = paymentDate;
        this.status = status;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Rental getRental() {
        return rental;
    }

    public void setRental(Rental rental) {
        this.rental = rental;
    }

    public LocalDate getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }
}
