import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCars } from '../../features/reducer/carSlice';
import CarCard from '../Car/CarCard';
import '../../CSSPages/CarCard.css';
import { useLocation } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';

function base64ToBytes(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

const CarList = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const { cars, status } = useSelector((state) => state.car);
  const [images, setImages] = useState({});
  const location = useLocation();
  const { from } = location.state || {};
  const [query, setQuery] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCars());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (!cars || cars.length === 0) return;
    const pic = { ...images };
    cars.forEach((car) => {
      if (car.images && car.images.length > 0) {
        pic[car.carId] = car.images.map((image) => {
          const byteArray = Array.isArray(image) ? image : base64ToBytes(image);
          const blob = new Blob([new Uint8Array(byteArray)], { type: 'image/jpeg' });
          return URL.createObjectURL(blob);
        });
      }
    });
    setImages(pic);
  }, [cars]);

  const filteredCars = from === "allCars" ? cars : cars.filter((car) => car.owner.userId === user.userId);

  const onSearch = (event) => {
    event.preventDefault();
    const searchQ = event.target.elements['search'].value;
    setQuery(searchQ);
  };

  const clearSearch = (event) => {
    const searchQ = event.target.value;
    if (!searchQ) {
      setQuery("");
    }
  };

  const filter = filteredCars.filter((i) => i.model.toLowerCase().startsWith(query.toLowerCase()));

  return (
    <Box className="car-list" sx={{ padding: 10 }}>
      <Box component="form" onSubmit={onSearch} sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        <TextField
          onChange={clearSearch}
          id="search"
          label="Search for car"
          variant="outlined"
          size="small"
          sx={{ width: '200px' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </Box>
      {filter && filter.length > 0 ? (
        <Grid container spacing={3}>
          {filter.map((car) => (
            <Grid item xs={12} sm={6} md={4} key={car.carId}>
              <CarCard car={car} images={images[car.carId]} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          There are no vehicles available for display.
        </Typography>
      )}
    </Box>
  );
};

export default CarList;
