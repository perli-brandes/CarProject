import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  getAvailable, updateAvailable } from '../../features/reducer/availableSlice';
import { useEffect } from 'react';
import { getChat } from '../../features/reducer/chatSlice';
import CarDetailsLayout from '../../MuiPages/CarDetailsStyle';

const CarDetails = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
    const location = useLocation();
    let { car,images} = location.state || {}; 
    const [user,setUser]=useState({})
    const avails=useSelector((state)=>state.available.available)
    const carAvails=avails.filter(a=>a.car.carId===car.carId)
    ;
    const cars=useSelector((state)=>state.car.cars)
   
   
    ;
   
   const [showAvailability, setShowAvailability] = useState(false);
  
   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
   const nextImage = () => {
     setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
   };
 
   const toggleAvailability = () => {
    setShowAvailability(!showAvailability);
};
const chatStatus=useSelector((state)=>state.chat.status)||null
const chats=useSelector((state)=>state.chat.chats)||[]
;

useEffect(() => {
  if (status === 'idle' ) {
    
    dispatch(getAvailable());
     
  }
 
  
}, []);

useEffect(() => {
  if (chatStatus === 'idle' ) {
    
    dispatch(getChat());
     
  }
 
  
}, [chatStatus,dispatch]);



const handleChat=()=>{
  let chat
  chats.forEach(c => {
   if( c.renter.userId===user.userId&&c.carOwner.userId===car.owner.userId){
    chat=c.id
    
   }
  })
  if(chat){
    navigate("/chat",{state:{"chatId":chat}});

  }
  else{
    navigate("/newChat",{state:{"otherUser":car.owner}});

  }

  ;
}

const checkDateFunction = () => {
   const currentD = new Date(); 
  
  
      carAvails.forEach((a) => {
          ;
           const start = new Date(a.startDate);
      const end = new Date(a.endDate);
          if(start<currentD){
            ;
            dispatch(updateAvailable({status:"expired"},a.id))
          }
      });
};


  useEffect(() => {
   
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setHours(24, 0, 0, 0); 

    const timeUntilNextMidnight = nextMidnight - now; 

    
    const timeout = setTimeout(() => {
      checkDateFunction();  
      setInterval(checkDateFunction, 24 * 60 * 60 * 1000);  
    }, timeUntilNextMidnight);

  
    return () => clearTimeout(timeout);
  }, []);


  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      ;
    }
  }, []); 


const openInMaps = () => {
  const location = `${car.location.latitude},${car.location.longitude}`;
  const url = `https://www.google.com/maps?q=${location}`;
  window.open(url, "_blank");
};

const openInWaze = () => {
  const location = `${car.location.latitude},${car.location.longitude}`;
  const url = `https://waze.com/ul?q=${location}`;
  window.open(url, "_blank");
};

  if (!car) {
    return <p>Vehicle not found</p>;
  }
  
  const status=useSelector((state)=>state.available.status)
  const availability=useSelector((state)=>state.available.available)
  let availabilityForCar =availability.filter(av => av.car.carId === car.carId);
  availabilityForCar=availabilityForCar.filter(a=>a.status==="active")
  ;
  if(availabilityForCar.length===0||!availabilityForCar){
      ;
     if(user.userId!==car.owner.userId){
     return(<p> this car not available</p>)
   
    
     }
   
  }
 
  
  return (
    
    <CarDetailsLayout
      car={car}
      images={images}
      currentImageIndex={currentImageIndex}
      nextImage={nextImage}
      availabilityForCar={availabilityForCar}
      showAvailability={showAvailability}
      toggleAvailability={toggleAvailability}
      navigate={navigate}
      openInMaps={openInMaps}
      openInWaze={openInWaze}
      user={user}
      handleChat={handleChat}

      
    />



    
  );
};

export default CarDetails;