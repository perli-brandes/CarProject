import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { addMessage, getMessage } from '../../features/reducer/messageSlice';
import { useEffect } from 'react';
import { getChat } from '../../features/reducer/chatSlice';


const Chat = () => {
  const dispatch=useDispatch()
    const location = useLocation();
    let { chatId} = location.state || {}; 
    ;
    const chatStatus=useSelector((state)=>state.chat.status)
    let chat=useSelector((state)=>state.chat.chats)||[]
    ;
    chat=chat.find(c=>c.id===chatId)||{}
    ;
    let messageStatus=useSelector((state)=>state.message.status)||null
   let messages=useSelector((state)=>state.message.messages)||[]
    ;
   messages=messages.filter(m=>m.chat.id===chat.id)
   ;
   const currentDateTime = new Date().toISOString();
   const [user,setUser]=useState({})
 const [newMessage, setNewMessage] = useState({
    "content":'',
   "sender":user,
    "chat":chat,
    "sentAt": new Date().toISOString(),

  })

 
  useEffect(()=>{
    if(chatStatus==='idle')
    dispatch(getChat())
  },[chatStatus,dispatch])


  useEffect(()=>{
    if(messageStatus==='idle')
    dispatch(getMessage())
  },[messageStatus])

    useEffect(() => {
const storedUser = localStorage.getItem('user');

if (storedUser!=null) {
 setUser(JSON.parse(storedUser));
 
  ; 
}
const idUser =user.userId
  

  }, []);

 

  const handleChange = (e) => {
    setNewMessage({
      ...newMessage,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleSendMessage = () => {
   
    if (newMessage) {
      const MtoSend={...newMessage,sender:user}
      dispatch(addMessage(MtoSend))
      
      setNewMessage({
        "content":'',
        "sender":user,
         "chat":chat,
         "sentAt": new Date().toISOString(),
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '80vh', padding: 2 }}>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: 2 }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection:user&& message.sender.userId === user.userId ? 'row-reverse' : 'row',
              marginBottom: 2,
              justifyContent:user&& message.sender.userId === user.userId  ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                padding: 1.5,
                borderRadius: 2,
                backgroundColor: user&&message.sender.userId === user.userId  ? '#1976d2' : '#e0e0e0',
                color:user&& message.sender.userId === user.userId ? '#fff' : '#000',
                boxShadow: 2,
              }}
            >
              <Typography>{message.content}</Typography>
              <Typography variant="caption" sx={{ textAlign: 'right', marginTop: 0.5 }}>
                {new Date(message.sentAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {}
      <Box sx={{ display: 'flex' }}>
        <TextField
          variant="outlined"
          fullWidth
          name="content"
          value={newMessage.content}
          onChange={handleChange}
          placeholder="Type a message..."
          sx={{ marginRight: 2 }}
        />
        <Button



          variant="contained"
          onClick={handleSendMessage}
          sx={{
            alignSelf: 'flex-end',
            height: '100%',
            backgroundColor: '#1976d2',
            '&:hover': { backgroundColor: '#1565c0' },
          }}
        >
          send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat; 