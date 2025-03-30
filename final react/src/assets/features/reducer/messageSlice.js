import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addMessageAPI, deleteMessageAPI, getMessageAPI } from '../services/messageAPI';




export const getMessage = createAsyncThunk(
    'message/getMessage',
    async() => {
        const response = await getMessageAPI();
        return response.data
    }
)    

export const addMessage = createAsyncThunk(
    'message/addMessage',
    async(newM) => {
        const response = await addMessageAPI(newM);
            console.log("message:",response.data)
            
        return response.data
    }
)    

export const deleteMessage = createAsyncThunk(
    'message/deleteMessage',
    async(messageId) => {
        const response = await deleteMessageAPI(messageId);
        console.log("deleted:",response.data);
        return messageId
    }
)  

export const updateMessage = createAsyncThunk(
    'message/updateMessage',
    async(messageId,newMessage) => {
        const response = await updateAvailableAPI(messageId,newMessage);
        return response
    }
) 
 


const  MessageSlice = createSlice({

    name: 'message',
    initialState:{

        messages:[], 
        status:'idle',
        error:null,
        selectedCar:null
    },
    reducers:{},
    extraReducers:(builder)=>{ builder


          //לקבל זמינויות
   .addCase(getMessage.pending,(state)=> {state.status='loading'})
   .addCase(getMessage.fulfilled,(state,action)=>{state.status='succeeded',state.messages=action.payload})
   .addCase(getMessage.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


   //הוספת זמינות
   .addCase(addMessage.pending,(state)=>{state.status='loading'})
   .addCase(addMessage.fulfilled,(state,action)=>{state.status='succeeded',state.messages.push(action.payload);
})
   .addCase(addMessage.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   //מחיקת זמינות
   .addCase(deleteMessage.pending,(state)=>{state.status='loading'})
   .addCase(deleteMessage.fulfilled,(state,action)=>{state.status='succeeded'; state.messages =state.messages.filter(m => m.id!==action.payload),console.log("action.payload",action.payload);})
   .addCase(deleteMessage.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

  
 //עדכון זמינות
  .addCase(updateMessage.pending,(state)=>{state.status='loading'})
  .addCase(updateMessage.fulfilled,(state,action)=>{state.status='succeeded'; const index=state.messages.findIndex(av=>av.id===action.payload.id)
  if(index!==-1) state.messages[index]=action.payload})
  .addCase(updateMessage.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 

    }

   
       


 }) 



 export default MessageSlice.reducer 