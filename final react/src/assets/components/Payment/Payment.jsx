import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addRental } from "../../features/reducer/rentalSlice";
import { addPayment } from "../../features/reducer/paymentSlice";
import { useEffect } from "react";
import { getAvailable } from "../../features/reducer/availableSlice";





import "../../CSSPages/payment.css" ;

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const location = useLocation();
  const { car, selectedAvailabilities, totalPrice } = location.state || {};
  const currentDate = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [newRental, setNewRental] = useState({
    car,
    renter: user,
    rentalPeriod: selectedAvailabilities,
    totalPrice,
  });

  const [payment, setPayment] = useState({
    rental: {},
    paymentDate: currentDate,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setNewRental((prevNewRental) => ({
        ...prevNewRental,
        renter: user,
      }));
    }
  }, [user]);

  const validate = () => {
    const newErrors = {};

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Please enter the cardholder's name.";
    }

    const cardNumberRegex = /^\d{16}$/;
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Please enter your credit card number.";
    } else if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = "Credit card number must be 16 digits.";
    }

    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Please enter the expiry date.";
    } else if (!expiryDateRegex.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format.";
    }

    const cvvRegex = /^\d{3}$/;
    if (!formData.cvv) {
      newErrors.cvv = "Please enter the CVV code.";
    } else if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = "CVV code must be 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Payment completed successfully!");
      setFormData({ cardName: "", cardNumber: "", expiryDate: "", cvv: "" });
      setErrors({});

      try {
        const newR = await dispatch(addRental(newRental)).unwrap();
        const updatedPayment = {
          ...payment,
          rental: { rentalid: newR.rentalid },
        };
        await dispatch(addPayment(updatedPayment));
        dispatch(getAvailable());
        navigate("/");
      } catch (error) {
        alert("Error processing rental or payment. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="credit-card-form">
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cardholder Name:</label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="Enter cardholder name"
          />
          {errors.cardName && <span className="error">{errors.cardName}</span>}
        </div>

        <div className="form-group">
          <label>Credit Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength={16}
            placeholder="Enter 16-digit card number"
          />
          {errors.cardNumber && (
            <span className="error">{errors.cardNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label>Expiry Date (MM/YY):</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
          />
          {errors.expiryDate && (
            <span className="error">{errors.expiryDate}</span>
          )}
        </div>

        <div className="form-group">
          <label>CVV Code:</label>
          <input
            type="password"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            maxLength={3}
            placeholder="Enter 3-digit CVV"
          />
          {errors.cvv && <span className="error">{errors.cvv}</span>}
        </div>

        <button type="submit" className="submit-button">
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;
