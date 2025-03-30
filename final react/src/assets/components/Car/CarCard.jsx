import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Button, IconButton, CardActions } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { blue, blueGrey } from '@mui/material/colors';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { Box, Typography } from '@mui/material';








const CarCard = ({ car, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const [user,setUser]=useState({})
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
 
 if (storedUser!=null) {
  setUser(JSON.parse(storedUser));
   ; 
 }
 const idUser =user.userId
   
 
   }, []);
 
;
return (
  <div className="car-card" style={{ position: 'relative' }}>
    {user.userId === car.owner.userId && (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'primary.main', 
          color: 'white', 
          padding: '8px 16px',
          borderRadius: '12px',
          fontWeight: 'bold',
         height:'2vh',
         width:'6vw',
          position: 'absolute', 
          top: '10px', 
          left: '10px', 
          zIndex: 10, 
        }}
      >
        <TimeToLeaveIcon sx={{ marginRight: '8px' }} />
        <Typography variant="body2">your car </Typography>
      </Box>
    )}
    {images && images.length > 0 && (
      <img
        src={images[currentImageIndex]}
        alt={`Car image for ${car.model}`}
        onClick={nextImage}
        style={{ width: "100%", height: "auto" }}
      />
    )}
    <h2>{car.model}</h2>
    <p>year: {car.carYear}</p>
    <p>price per day ₪{car.dayRate}</p>
    <p>location: {car.location.address}</p>

    <CardActions>
      <Button
        size="small"
        color="primary"
        onClick={() => navigate('/carDetails', { state: { car, images } })}
        sx={{
          fontSize: '1rem',
          fontWeight: 'bold',
          padding: '8px 16px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'blueGrey', 
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
       car details
      </Button>
    </CardActions>
  </div>
);}

export default CarCard;






  
  
 