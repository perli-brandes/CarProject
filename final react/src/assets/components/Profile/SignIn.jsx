



import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../../features/reducer/usersSlice'; 
import '../../CSSPages/SignIn.css';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Container, Typography, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignIn = () => {
  const dispatch = useDispatch();
  
  
  const error = useSelector((state) => state.user.error);
  const status = useSelector((state) => state.user.status);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [driverLicenseNumber, setDriverLicenseNumber] = useState('');
  const [licenseExpiryDate, setLicenseExpiryDate] = useState('');
  const [type, setType] = useState('');
  
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    driverLicenseNumber: '',
    licenseExpiryDate: '',
    type: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      password: '',
      driverLicenseNumber: '',
      licenseExpiryDate: '',
      type: '',
    };

    let formIsValid = true;

    
    if (name.trim() === '') {
      newErrors.name = 'שם חייב להיות מלא';
      formIsValid = false;
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = 'אימייל לא תקין';
      formIsValid = false;
    }

    
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      newErrors.phone = 'מספר טלפון חייב להכיל 10 ספרות';
      formIsValid = false;
    }

    
    if (password.length < 6) {
      newErrors.password = 'הסיסמה חייבת להכיל לפחות 6 תווים';
      formIsValid = false;
    }

    
    if (driverLicenseNumber.trim() === '') {
      newErrors.driverLicenseNumber = 'מספר רישיון נהיגה לא יכול להיות ריק';
      formIsValid = false;
    }

    
    if (licenseExpiryDate.trim() === '') {
      newErrors.licenseExpiryDate = 'תאריך תוקף רישיון לא יכול להיות ריק';
      formIsValid = false;
    }

    
    setErrors(newErrors);

    if (!formIsValid) {
      return; 
    }

    const userData = {
      name,
      email,
      phone,
      password,
      driverLicenseNumber,
      licenseExpiryDate,
      type: type === "" ? null : type, 
    };

    
    await dispatch(addUsers(userData));
  };

  
  useEffect(() => {
    if (error) {
      if (error.includes('409')) {
        alert("משתמש זה כבר קיים, מעביר לעמוד ההתחברות.");
        
      } else {
        alert("שגיאה בהוספת המשתמש: " + error);
      }
    }

    if (status === 'succeeded') {
      
      navigate('/'); 
    }

  }, [,status,navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          backgroundColor: "white", 
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            margin="normal"
            fullWidth
            name="driverLicenseNumber"
            label="Driver License Number"
            type="text"
            id="driverLicenseNumber"
            value={driverLicenseNumber}
            onChange={(e) => setDriverLicenseNumber(e.target.value)}
            error={!!errors.driverLicenseNumber}
            helperText={errors.driverLicenseNumber}
          />
          <TextField
            margin="normal"
            fullWidth
            name="licenseExpiryDate"
            label="License Expiry Date"
            type="date"
            id="licenseExpiryDate"
            InputLabelProps={{
              shrink: true,
            }}
            value={licenseExpiryDate}
            onChange={(e) => setLicenseExpiryDate(e.target.value)}
            error={!!errors.licenseExpiryDate}
            helperText={errors.licenseExpiryDate}
          />
          <TextField
            margin="normal"
            fullWidth
            name="type"
            label="License Type"
            select
            SelectProps={{
              native: true,
            }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value=""></option>
            <option value="0">Car</option>
            <option value="1">Bus</option>
            <option value="2">Motorcycle</option>
            <option value="3">Other</option>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
