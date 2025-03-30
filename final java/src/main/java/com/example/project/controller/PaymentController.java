package com.example.project.controller;

import com.example.project.model.Payment;
import com.example.project.model.Rental;
import com.example.project.model.Review;
import com.example.project.model.Users;
import com.example.project.service.PaymentRepository;
import com.example.project.service.RentalRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/payment")
@RestController
@CrossOrigin
public class PaymentController {

  private final RentalRepository rentalRepository;
    private PaymentRepository paymentRepository;
    public PaymentController(PaymentRepository paymentRepository, RentalRepository rentalRepository){
         this.rentalRepository=rentalRepository;
        this.paymentRepository = paymentRepository;
    }

@GetMapping("/getPayments")
public ResponseEntity<List<Payment>> getPayments() {
     List<Payment> payments=paymentRepository.findAll();
     if(payments.isEmpty())
         return ResponseEntity.status(HttpStatus.OK).body(null);
    return ResponseEntity.status(HttpStatus.OK).body(payments);
}

@PostMapping("/addPayment")
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment){
    System.out.println("at add payment ");
        Rental rental=rentalRepository.findById(payment.getRental().getRentalid()).orElse(null);

        if(rental==null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    payment.setRental(rental);

    Payment saved= paymentRepository.save(payment);

    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}

@PutMapping("/updatePayment/{id}")
public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment newPayment) {
    Payment existingPay = paymentRepository.findById(id).orElse(null);
    if (existingPay == null) {
        return ResponseEntity.status(404).body(null);
    }
    if (newPayment.getPaymentDate() != null) {
        existingPay.setPaymentDate(newPayment.getPaymentDate());
    }
    if (newPayment.getStatus() != null) {
        existingPay.setStatus(newPayment.getStatus());
    }
    Payment savedPay = paymentRepository.save(existingPay);

    return ResponseEntity.ok(savedPay);
    }
    }