



import React, { useState , useEffect} from "react";
import { useDispatch } from "react-redux";
import { addCar } from "../../features/reducer/carSlice";
import { useSelector } from "react-redux";
import { addAvailable } from '../../features/reducer/availableSlice';

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";



const AddCar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
 const todayYear=new Date().getFullYear();
  const [user,setUser]=useState({})
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      ;
    }
  }, []); 


  const [carDetails, setCarDetails] = useState({
    model: "",
    carYear: "",
    dayRate: "",
    licensePlate: "",
    owner:  user,
    location:{},
    imageUrls: [],
  });

 const [availList,setAvailList]=useState( [] )


 const [suggestions, setSuggestions] = useState([]);
  const [availability, setAvailability] = useState({
    startDate: "",
    endDate: "",
    car:'',
    
  });

  const [newLocation,setNewLocation]=useState({
    address:'',
    longitude:0,
    latitude:0
  })


  useEffect(() => {
    if (user) {
      
      setCarDetails((prevCarDetails) => ({
        ...prevCarDetails,
        owner:  user
    }));
    
    }
  }, [user]); 


  const handleChange = (e) => {
    setCarDetails({
      ...carDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setCarDetails({
      ...carDetails,
      imageUrls: files,
    });
  };

  const handleAvailabilityChange = (e) => {
    setAvailability({
      ...availability,
      [e.target.name]: e.target.value,
    });
  };



 const isDateRangeOverlap = (newStartDate, newEndDate) => {
  return availList.some(({ startDate, endDate }) => {
    const existingStart = new Date(startDate);
    const existingEnd = new Date(endDate);
    const newStart = new Date(newStartDate);
    const newEnd = new Date(newEndDate);

    return (
      (newStart >= existingStart && newStart <= existingEnd) || 
      (newEnd >= existingStart && newEnd <= existingEnd) || 
      (newStart <= existingStart && newEnd >= existingEnd) 
    );
  });
};


  const handleAddAvailability = () => {
    const { startDate, endDate } = availability;
    if (availability.startDate && availability.endDate) {
      if (new Date(availability.startDate) > new Date(availability.endDate)) {
        alert("The end date must be after the start date!");
        return;
      }
      if (isDateRangeOverlap(startDate, endDate)) {
        alert("The dates overlap with existing availability. Please select other dates.");
        return;
      }
      setAvailList((prevList) => [...prevList, availability]);
      setAvailability({ startDate: "", endDate: "" });
    }
  };

  const handleRemoveAvailability = (index) => {
    setAvailList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setCarDetails({
      model: "",
      carYear: "",
      dayRate: "",
      licensePlate: "",
      owner:'',
      imageUrls: [],
      location:{},
    });
    setAvailList([])
  };



  const searchAddress = async (address) => {
    if (address.length < 3) return 

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`);
    const data = await response.json();
    
    setSuggestions(data)
  };



  
  const handleSelectLocation = (location) => {
    const { lat, lon, display_name } = location;
    setNewLocation({ latitude:lat, longitude:lon, address: display_name });
    ;
    ;
  
    setSuggestions([]); 
    setCarDetails({...carDetails,location:{latitude:lat, longitude:lon, address: display_name}})
  };


  const handleSubmit = async (e) => {
   
    e.preventDefault();



    
    try {
      const formData = new FormData();
      carDetails.imageUrls.forEach((file) => {
        formData.append("images", file);
      });
     
      formData.append(
        "car",
        new Blob([JSON.stringify({ ...carDetails, imageUrls: [] })], {
          type: "application/json",
        })
      );
   
      
 
      const carResponse = await dispatch(addCar(formData)).unwrap();
     
      const carId = carResponse.carId;
      
      if (!carId) throw new Error("Car ID is missing");

     
      for (const availability of availList) {
        await dispatch(addAvailable({ ...availability, car:{carId: carId} }));
      }

      alert("Successfully added vehicle!");
      resetForm();
      navigate("/")
    } catch (error) {
     
      alert("Error adding vehicle or availability");
    }
  };
  const today = new Date().toISOString().split("T")[0];
  return (
    <Box sx={{ padding: 4, maxWidth: 900, margin: "0 auto", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Add a New Car
      </Typography>

      <Paper sx={{ padding: 3, boxShadow: 3 }}>
        <form onSubmit={handleSubmit}>
         
          <Typography variant="h6" gutterBottom>
            Car Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Model"
                name="model"
                value={carDetails.model}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
           label="Year"
           name="carYear"
           value={carDetails.carYear}
             onChange={handleChange}
             fullWidth
             type="number"
             required
             error={(carDetails.carYear < 2000&&carDetails.carYear>todayYear) || carDetails.carYear === ""}
             helperText={(carDetails.carYear < 2000&&carDetails.carYear>todayYear) || carDetails.carYear === "" ? "Please enter a valid year (greater than 2000)" : ""}
             />
           <TextField
                label="Price per Day"
                name="dayRate"
                value={carDetails.dayRate}
                onChange={handleChange}
                fullWidth
                type="number"
                required
                error={carDetails.dayRate <= 0}
                 helperText={carDetails.dayRate <= 0 ? "Price must be a positive number greater than 0" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="License Plate"
                name="licensePlate"
                value={carDetails.licensePlate}
                onChange={handleChange}
                fullWidth
                required
               
                error={!/^[A-Za-z0-9]{7}$/.test(carDetails.licensePlate)}
                helperText={
                  !/^[A-Za-z0-9]{7}$/.test(carDetails.licensePlate)
                    ? "License Plate must be exactly 7 alphanumeric characters"
                    : ""
                }
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

       
          <Typography variant="h6" gutterBottom>
            Add Availability
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={carDetails.startDate}
                onChange={handleAvailabilityChange}
                fullWidth
                required={availList.length === 0}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: today }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={carDetails.endDate}
                onChange={handleAvailabilityChange}
                fullWidth
                required={availList.length === 0}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: carDetails.startDate || today }}
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Button variant="contained" onClick={handleAddAvailability}>
              Add Availability Date
            </Button>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Availability Dates:
            </Typography>
            <ul>
              {availList.map((avail, index) => (
                <li key={index}>
                  From: {avail.startDate} To: {avail.endDate}
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ marginLeft: 2 }}
                    onClick={() => handleRemoveAvailability(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </Box>

          <Divider sx={{ my: 3 }} />

        
          <Typography variant="h6" gutterBottom>
            Search for Location
          </Typography>
          <TextField
            label="Enter Address"
            value={newLocation.address}
            onChange={(e) => {
              setNewLocation({ ...newLocation, address: e.target.value });
              searchAddress(e.target.value);
            }}
            fullWidth
            placeholder="Enter address"
          />

          {suggestions.length > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSelectLocation(suggestion)}>
                    {suggestion.display_name}
                  </li>
                ))}
              </ul>
            </Box>
          )}

          {location && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="subtitle1">Selected Location Details:</Typography>
              <Typography>Address: {newLocation.address}</Typography>
              <Typography>Latitude: {newLocation.latitude}</Typography>
              <Typography>Longitude: {newLocation.longitude}</Typography>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

        
          <Typography variant="h6" gutterBottom>
            Upload Images
          </Typography>
          <Button
            variant="outlined"
            component="label"
            sx={{ marginBottom: 2 }}
            startIcon={<PhotoCamera />}
          >
            Select Files
            <input type="file" multiple hidden onChange={handleFileChange} />
          </Button>
          <ul>
            {carDetails.imageUrls.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>

          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ padding: "12px 24px", fontSize: "16px" }}
            >
              Add Car
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddCar;