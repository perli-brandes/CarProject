
import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, CardActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getRentals } from '../../features/reducer/rentalSlice';
import { useLocation, useNavigate } from 'react-router-dom';



const RentalsList = () => {
  
   
  const navigate=useNavigate()
    const dispatch = useDispatch();
    const [user,setUser]=useState({})
const {rentals,status}=useSelector((state)=>state.rental)
console.log("rentals",rentals);
const userCarRental=Array.isArray(rentals) ?rentals.filter(r=>r.car.owner.userId===user.userId):[]
const userRenter=Array.isArray(rentals) ?rentals.filter(r=>r.renter.userId===user.userId):[]
const location=useLocation()
const{from}=location.state||{}; 
console.log("from",from);

const rentalList=from==="mycarsRental"?userCarRental:userRenter

useEffect(() => {
  
  if (!rentals?.length && status === "idle") {
    dispatch(getRentals());
  }

  
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, [dispatch, status]); 










if(!rentalList||rentalList.length===0){
  return(<>no rentals</>)
}

return (
  <Box sx={{ padding: 10 }}>
    {}
    <Grid container spacing={3}>
      {rentalList.map((rental) => (
        <Grid item xs={12} sm={6} md={4} key={rental.rentalId}>
          <Card sx={{
            boxShadow: 3, 
            borderRadius: 2, 
            transition: 'transform 0.3s ease', 
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 8
            }
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {rental.car.model} ({rental.car.year})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Tenant Name:</strong> {rental.renter.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Email:</strong> {rental.renter.email}
              </Typography>
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                <strong>Total Price:</strong> {rental.totalPrice} $
              </Typography>
              {from === "mycarsRental" && (
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  <strong>Insurance Status:</strong> {rental.st}
                </Typography>
              )}
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary" 
                size="small"
                onClick={() => navigate('/rental', { state: { rental } })}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#004b5c', 
                  }
                }}
              >
                Rental Details
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);
};

export default RentalsList;