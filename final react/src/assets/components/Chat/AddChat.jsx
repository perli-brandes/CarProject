import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addChat } from '../../features/reducer/chatSlice';
import { useEffect } from 'react';







const NewChat = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
  const [chatName, setChatName] = useState('');
  const [user,setUser]=useState({})
  const location = useLocation();
  let { otherUser} = location.state || {}; 
;

  
    useEffect(() => {
const storedUser = localStorage.getItem('user');

if (storedUser!=null) {
 setUser(JSON.parse(storedUser));
  ; 
}
const idUser =user.userId
  

  }, []);



  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!user || !otherUser) {
      alert('Missing users, cannot create chat.');
      return;
    }

    
    const newChat = {
      renter: user,
      carOwner:otherUser,
     
     
    };

    ;
    
 let newC=await dispatch(addChat(newChat));
 newC=newC.payload
  ;
  navigate("/chat",{state:{"chatId":newC.id}});
    
    setChatName('');
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, margin: '0 auto' }}
    >
      <Typography variant="h5" align="center">create a new chat</Typography>

      
      <TextField
        label="Chat name (optional)"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
        placeholder={`${user.name}-${otherUser.name}`}
      />

     
      <Button type="submit" variant="contained" color="primary">
       create chat
      </Button>
    </Box>
  );
};

export default NewChat;
