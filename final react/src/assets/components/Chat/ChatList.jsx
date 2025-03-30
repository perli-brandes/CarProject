import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getChat } from '../../features/reducer/chatSlice';
import { useState } from 'react';
import { Box, Button, Typography, Avatar, ListItem, ListItemText } from '@mui/material';
import { ChatBubbleOutline, Person } from '@mui/icons-material';


const ChatList = () => {
    const location = useLocation();
    let { from} = location.state || {}; 
;
    const dispatch=useDispatch()
  const navigate = useNavigate();
  const chatStatus=useSelector((state)=>state.chat.status)||''
  const chats=useSelector((state)=>state.chat.chats)||{}

  const [user,setUser]=useState({})


    
    useEffect(() => {
const storedUser = localStorage.getItem('user');

if (storedUser!=null) {
 
 setUser(JSON.parse(storedUser) );


 
}
const idUser =user.userId
  

  }, []);
 
  const chatsWithRenters= chats.filter(c => c.carOwner && c.carOwner.userId === user.userId)
  const ChatsWithLandlords=   chats.filter(c => c.renter && c.renter.userId === user.userId);

  const myChats = from === 'chatsWithRenters'?chatsWithRenters:ChatsWithLandlords
  

;






 


  const handleChatClick = (id) => {
    navigate("/chat",{state:{"chatId":id}});
  };

  useEffect(()=>{
    if(chatStatus==='idle')
    dispatch(getChat())
  },[chatStatus,dispatch])
  
  
 
  return (
    <Box sx={{ padding: 2, display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography variant="h6"  color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your Chats
      </Typography>

      {}
      {myChats?.map((chat) => (
        <Button
          key={chat.id}
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: 2,
            padding: '12px 150px', 
            display: 'flex',
            width:'200%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            textAlign: 'left',
            backgroundColor: '#f4f4f4',
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: '#e0e0e0',
            },
            boxShadow: 2,
            width: '100%', 
          }}
          onClick={() => handleChatClick(chat.id)}
        >
          {}
          <Avatar sx={{ width: 40, height: 40, marginRight: 2 }}>
            <Person />
          </Avatar>

          {}
          <Box sx={{ flexGrow: 1 }}>
            <ListItemText
              primary={user.userId === chat.renter.userId ? chat.carOwner.name : chat.renter.name}
              secondary={`Last message...`} 
              sx={{ fontWeight: 'bold', color: '#333' }}
            />
          </Box>

          {}
          <ChatBubbleOutline sx={{ fontSize: 30, color: '#888' }} />
        </Button>
      ))}
    </Box>
  );
};

export default ChatList;