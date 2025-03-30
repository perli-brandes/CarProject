import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getAvailable, updateAvailable } from '../../features/reducer/availableSlice';
import { getRentals, updateRental } from '../../features/reducer/rentalSlice';
import { getPayments } from '../../features/reducer/paymentSlice';
import { getCars } from '../../features/reducer/carSlice';




const Rental = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation();
  const [user, setUser] = useState({})

  const cars = useSelector((state) => state.car.cars)
  const carStatus = useSelector((state) => state.car.status)

  let { rental } = location.state || {};
  
  const rentalStatus = useSelector((state) => state.rental.status)
  const rentals = useSelector((state) => state.rental.rentals)
    
  rental = rentals.find(r => r.rentalid === rental.rentalid)
    
  const car = cars.find(c => c.carId === rental.car.carId)
    
  const statusA = useSelector((state) => state.available.status)
  const allAvails = useSelector((state) => state.available.available)
    
  const avails = allAvails.filter(a => a.rental?.rentalid === rental.rentalid)

    
  let { payments, status } = useSelector((state) => state.payment)
    
  const pay = payments.find(p => p.rental.rentalid === rental.rentalid) || []
    

  useEffect(() => {
    if (status === 'idle')
      dispatch(getPayments())
  }, [dispatch, status])

  useEffect(() => {
    if (rentalStatus === 'idle' || (!rentals || rentals.length === 0))
      dispatch(getRentals())
  }, [dispatch, rentalStatus])

  useEffect(() => {
    if (carStatus === 'idle' || (!cars || cars.length === 0))
      dispatch(getCars())
  }, [dispatch, carStatus])

  useEffect(() => {
    if (allAvails === 'idle' || (!allAvails || allAvails.length === 0)) {

      dispatch(getAvailable());

    }


  }, [dispatch, statusA, allAvails]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser != null) {
      setUser(JSON.parse(storedUser));
     
    }
    const idUser = user.userId


  }, [dispatch, statusA]);
  const owner = rental.car.owner.userId === user.userId;
  const userDetails = owner ? rental.renter : rental.car.owner

  const handleInsuranceUpdate = async () => {
   
    await dispatch(updateRental({ ...rental, st: "active" }))
      
   
  }





  return (
    <Card style={{ maxWidth: 600, margin: '20px auto', padding: '20px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom color="primary" >
          Rental Details
        </Typography>

        { }
        <Typography variant="h5" gutterBottom color="primary" >
          Car Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Model" secondary={car?.model || 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Year" secondary={car?.year || 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="License Plate" secondary={car?.licensePlate || 'N/A'} />
          </ListItem>
        </List>

        { }
        {owner ? <Typography variant="h5" gutterBottom color="primary" > tenant Details </Typography> :
          <Typography variant="h5" gutterBottom color="primary" > owner Details </Typography>}

        <List>
          <ListItem>
            <ListItemText primary="Name" secondary={userDetails?.name || 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={userDetails?.email || 'N/A'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone" secondary={userDetails?.phone || 'N/A'} />
          </ListItem>
        </List>


        { }
        <Typography variant="h5" gutterBottom color="primary" >
          Availability
        </Typography>
        <List>
          {avails && avails.length > 0 ? (
            avails.map((av, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Start: ${new Date(av.startDate).toLocaleDateString()}    End: ${new Date(av.endDate).toLocaleDateString()}`}

                />
              </ListItem>
            ))
          ) : (
            <Typography>No availability details</Typography>
          )}
        </List>

        { }
        <Typography variant="h5" gutterBottom color="primary" >
          Other Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Final Price" secondary={`$${rental.totalPrice || 'N/A'}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="pay date" secondary={`${pay.paymentDate || 'N/A'}`} />
          </ListItem>
          <Typography variant="body1"  >
            <strong  >Insurance Status:</strong> {rental.st ? rental.st : "required "}
          </Typography>
          {owner ? <Button
            variant="contained"
            color="primary"
            onClick={handleInsuranceUpdate}
            disabled={rental.st}
            style={{ marginTop: '10px' }}
          >
            {rental.st === "active" ? 'Insurance Already Active' : 'Activate Insurance'}
          </Button> : <></>}


        </List>


      </CardContent>
    </Card>
  );
}
export default Rental