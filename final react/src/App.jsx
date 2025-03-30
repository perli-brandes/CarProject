
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React, { useState } from "react";



import SignIn from './assets/components/Profile/SignIn';
import LogIn from './assets/components/Profile/LogIn';
import HomePage from './assets/components/Profile/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CarList from './assets/components/Profile/CategoryView';
 import CarDetails from './assets/components/Car/CarDetails';
import { Provider } from 'react-redux'
import  store from '../src/appStore/Store'
import EditProfile from './assets/components/Profile/EditProfile';
import AddCar from './assets/components/Car/AddCar';
import Reviews from './assets/components/Review/Reviews';
import EditCar from './assets/components/Car/EditCar';
import Availabilitys from './assets/components/Availability/Availabilitys';
import TenantDetails from './assets/components/Rental/TenantDetails';
import Payment from './assets/components/Payment/Payment';
import UserProfile from './assets/components/Profile/Menu';
import RentalsList from './assets/components/Rental/RentalCategory';
import Rental from './assets/components/Rental/RentalDetails';
import Chat from './assets/components/Chat/Chat';
import ChatList from './assets/components/Chat/ChatList';
import NewChat from './assets/components/Chat/AddChat';


function App() {
 

return(
  
  <Provider store={store}>

  <Router>
    <UserProfile  />
      <Routes>
       <Route path="/" element={<HomePage />} /> 
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signIn" element={<SignIn />} />
   
        <Route path="/carlist" element={<CarList />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/carDetails" element={<CarDetails />} />
        <Route path="/addCar" element={<AddCar />} />
        <Route path="/Reviews" element={<Reviews />} />
        <Route path="/EditCar" element={<EditCar />} />
        <Route path="/Availabilitys" element={<Availabilitys />} />
        <Route path="/tenantDetails" element={<TenantDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/menu" element={<UserProfile />} />
        <Route path="/rentalsList" element={<RentalsList/>} />
        <Route path="/rental" element={< Rental/>} />
        <Route path="/chatList" element={< ChatList/>} />
        <Route path="/chat" element={< Chat/>} />
        <Route path="/newChat" element={< NewChat/>} />
        
        


      </Routes>
    </Router>
    </Provider>

 );
}
 



export default App
