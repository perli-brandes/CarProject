import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"
import '../../CSSPages/tanent.css';



const TenantDetails = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const car = location.state || {};
  const [error, setError] = useState(false);

  let avails = useSelector((state) => state.available.available)
  avails = avails.filter(a => a.car.carId === car.carId)
  avails = avails.filter(a => a.status === "active")
  const availabilities = avails

  const dayRate = car.dayRate

  const [selectedAvailabilities, setSelectedAvailabilities] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)


  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }


  const handleCheckbox = (availability) => {
    const alreadySelected = selectedAvailabilities.find((av) => av.startDate === availability.startDate)
    let newSelectedAvailabilities

    if (alreadySelected) {
      newSelectedAvailabilities = selectedAvailabilities.filter((av) => av.startDate !== availability.startDate)
    }
    else {

      newSelectedAvailabilities = [...selectedAvailabilities, availability]
    }
    setSelectedAvailabilities(newSelectedAvailabilities)

    const newTotalPrice = newSelectedAvailabilities.reduce((acc, av) => {
      const days = calculateDays(av.startDate, av.endDate)
      return acc + days * dayRate
    }, 0);

    setTotalPrice(newTotalPrice);
  }
  const handleContinue = () => {
    if (selectedAvailabilities.length === 0) {
      setError(true);
    } else {
      setError(false);
      navigate('/payment', { state: { car, selectedAvailabilities, totalPrice } });
    }
  };

  return (
    <div className="tenant-details-container">
      <h3>Select Availability Dates</h3>
      {availabilities.map((availability, index) => (
        <div key={index} className="availability-item">
          <label>
            <input
              type="checkbox"
              checked={selectedAvailabilities.some((item) => item.startDate === availability.startDate)}
              onChange={() => handleCheckbox(availability)}
            />
            from   {availability.startDate} to   {availability.endDate}
          </label>
        </div>
      ))}

      <h4>Total Price: ${totalPrice}</h4>
      {error && <p className="error-message">You must select at least one date to proceed.</p>}
      <button className="continue-button" onClick={handleContinue}>
        Continue to Payment
      </button>
    </div>
  );
};

export default TenantDetails;
