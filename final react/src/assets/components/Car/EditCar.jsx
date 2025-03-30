import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Grid , Container, Typography, Avatar } from '@mui/material';
import { deleteCar, updateCar } from "../../features/reducer/carSlice";


const EditCar=()=>{
    const dispatch = useDispatch();
    const navigate=useNavigate()
const location=useLocation();
const cars=useSelector((state)=>state.car.cars)

let car=location.state|| {};
;

const [suggestions, setSuggestions] = useState([]);
const [carDetails, setCarDetails] = useState({
    location:{},
    dayRate:"",
   
  }) 
  const [newLocation,setNewLocation]=useState({
    address:'',
    longitude:0,
    latitude:0
  })

const handleChange=(e)=>{
    setCarDetails({
        ...carDetails,
        [e.target.name]:e.target.value,
    })
}

const deleteC=()=>{
    const userConfirmed = window.confirm("Are you sure you want to delete this car?");
    if(userConfirmed){
        try{
            dispatch(deleteCar(car.carId))
         
            alert("the car have been deleted seccesfully")
            navigate('/carlist')
        }catch(error){
            console.error("שגיאה במחיקת הרכב:", error.message);
            alert(" שגיאה במחיקת הרכב ");
        }
    }
    
}

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

const handleSubmit=async(e)=>{
    e.preventDefault();
try{
    ;
  const update=  await dispatch(updateCar({carDetails,carId:car.carId}))
    car.dayRate=update.dayRate
    alert("Changes saved successfully!")
    navigate("/carlist")
}catch(error){
 
    alert("Vehicle update error:");
}
}

return (
  <>
    <form onSubmit={handleSubmit}>
      <div className="edit-car">
        <Typography variant="h6" gutterBottom><strong>Owner's Name:</strong> {car.owner.name}</Typography>
        <Typography variant="body1"><strong>Model:</strong> {car.model}</Typography>
        <Typography variant="body1"><strong>Year:</strong> {car.carYear}</Typography>
        <Typography variant="body1"><strong>License Plate:</strong> {car.licensePlate}</Typography>
        <Typography variant="body1"><strong>Price per Day:</strong> {car.dayRate}₪</Typography>
        <TextField
          type="number"
          name="dayRate"
          value={carDetails.dayRate}
          onChange={handleChange}
          label="Price per Day"
          variant="outlined"
          fullWidth
        />
        <Typography variant="body1"><strong>Location:</strong> </Typography>
        <TextField
          type="text"
          value={newLocation.address}
          onChange={(e) => {
            setNewLocation({ ...newLocation, address: e.target.value });
            searchAddress(e.target.value); 
          }}
          placeholder="Enter address"
          variant="outlined"
          fullWidth
        />

        {suggestions.length > 0 && (
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem button key={index} onClick={() => handleSelectLocation(suggestion)}>
                {suggestion.display_name}
              </ListItem>
            ))}
          </List>
        )}

        {location && (
          <div>
            <Typography variant="h6">Selected Location Details:</Typography>
            <Typography variant="body1">Address: {newLocation.address}</Typography>
            <Typography variant="body1">Latitude: {newLocation.latitude}</Typography>
            <Typography variant="body1">Longitude: {newLocation.longitude}</Typography>
          </div>
        )}

        <Grid container spacing={2}>
          <Grid item>
            <Button variant="outlined" onClick={() => navigate('/Availabilitys', { state: { car } })}>
              Edit Availability
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Save Changes
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={deleteC}>
              Delete Car
            </Button>
          </Grid>
        </Grid>
      </div>
    </form>
  </>
);
};

export default EditCar;