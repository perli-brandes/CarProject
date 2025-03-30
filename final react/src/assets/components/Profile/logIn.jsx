

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, clearError } from "../../features/reducer/usersSlice"; 
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const LogIn = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error); 
  const status = useSelector((state) => state.user.status); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("אימייל לא תקין");
      return;
    }

    const userData = {
      email,
      password,
    };

    
    await dispatch(logInUser(userData));
  };

  
  useEffect(() => {
    if (error) {
      alert(error);
      if (error === "The user is not in the system. Please register.") {
        navigate("/signIn");
      } else {
        setPassword("");
      }

      dispatch(clearError()); 
    }

    if (status === "succeeded") {
      console.log("hey");
      
      navigate("/"); 
    }
  }, [error, dispatch, status, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          backgroundColor: "white", 
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;