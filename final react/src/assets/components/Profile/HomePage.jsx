import React, { useState, useEffect } from 'react';
import UserProfile from './Menu';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Grid, Card } from '@mui/material';
import CarCard from '../Car/CarCard';
import { useDispatch, useSelector } from 'react-redux';
import { getCars } from '../../features/reducer/carSlice';
import '../../CSSPages/homePage.css';



function base64ToBytes(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function getRandomElements(array, count) {
  const result = [];
  const usedIndices = new Set();
  while (result.length < count) {
    const randomIndex = Math.floor(Math.random() * array.length);
    if (!usedIndices.has(randomIndex)) {
      result.push(array[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  return result;
}

const HomePage = () => {

const location=useLocation()

 const navigate = useNavigate();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.car.status);
  const cars = useSelector((state) => state.car.cars);
  const [randomCars, setRandomCars] = useState([]);
  const [images, setImages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(true);
 
 

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCars());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status === 'succeeded' && cars.length > 0) {
      setRandomCars(getRandomElements(cars, Math.min(3, cars.length)));
    }
  }, [status, cars]);

  useEffect(() => {
  
    const modalState = localStorage.getItem('user');
    if (modalState) {
      setIsModalOpen(false); 
    }else{
        setIsModalOpen(true)
    }
   
  }, []);

  const handleLogIn = () => {
    
   
    setIsModalOpen(false);
    navigate('/logIn'); 
  };

  const handleSignUp = () => {
    
    setIsModalOpen(false); 
    localStorage.setItem('isModalOpen', 'false'); 
    navigate('/signIn'); 
  };



  useEffect(() => {
    if (randomCars.length === 0) return;
    const pic = { ...images };
    randomCars.forEach((car) => {
      if (car.images && car.images.length > 0) {
        pic[car.carId] = car.images.map((image) => {
          const byteArray = Array.isArray(image) ? image : base64ToBytes(image);
          const blob = new Blob([new Uint8Array(byteArray)], { type: 'image/jpeg' });
          return URL.createObjectURL(blob);
        });
      }
    });
    setImages(pic);
  }, [randomCars]);



 


  

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  return (
    <div className="main-container">
    
      <header className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Car Rental Service</h1>
          <div className="buttons">
            <button
              className="custom-btn btn-1"
              onClick={() => navigate('/addCar')}
            >
              Add a New Car
            </button>
            <button
              className="custom-btn btn-2"
              onClick={() => navigate('/carlist', { state: { from: 'allCars' } })}
            >
              View All Cars
            </button>
          </div>
        </div>
       
        <div className="hero-image">
          <img
            src="pictures/רקע (1).jpeg"
            alt="Hero Car"
          />
        </div>
      </header>

 
           <p style={{ color: ' #1e3a8a', fontWeight: 'bold', fontSize: '24px', }}>
  Our recommended cars
</p>
<Box
     
  sx={{
    marginTop: 6,
    width: '100%',
  }}
>
  <Grid container spacing={4} justifyContent="center">
    {randomCars.map((car) => (
      <Grid item xs={12} sm={4} md={3} key={car.carId}> 
        <CarCard car={car} images={images[car.carId]} />
      </Grid>
    ))}
  </Grid>
</Box>

<div>
     
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Welcome to our Website!</h2>
            <p>Let's get started</p>
            <button className="background-button" onClick={handleLogIn}>
              Log In
            </button>
            <button className="background-button" onClick={handleSignUp}>
              Sign In
            </button>
          
          </div>
        </div>
      )}

</div>



<Box
  sx={{
    marginTop: 8,
    padding: 4,
    backgroundColor: '#F9F9F9',
    borderRadius: 2,
    boxShadow: 2,
    textAlign: 'center',
  }}
>
  <Typography
    variant="h4"
    sx={{
      fontWeight: 700,
      color: '#333',
      marginBottom: 2,
    }}
  >
    About Us
  </Typography>
  <Typography
    variant="body1"
    sx={{
      fontSize: '1.2rem',
      color: '#555',
      lineHeight: '1.6',
      maxWidth: '800px',
      margin: '0 auto',
    }}
  >
    Welcome to our platform where you can easily rent out your private car or rent
    a car from other private owners. Our goal is to connect car owners and renters
    in a simple, fast, and convenient way. Whether you're looking to make some extra
    income by renting out your car or need a ride for a day, we offer a flexible and
    secure way to make it happen. With our easy-to-use platform, renting and lending
    cars has never been more accessible and straightforward, anytime, anywhere.
  </Typography>
</Box>
    </div>
  );
};

export default HomePage;



