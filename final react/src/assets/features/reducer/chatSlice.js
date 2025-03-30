import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addChatAPI, deleteChatAPI, getChatAPI } from '../services/chatAPI';



export const getChat = createAsyncThunk(
    'chat/getChat',
    async() => {
        const response = await getChatAPI();
        return response.data
    }
)    

export const addChat = createAsyncThunk(
    'chat/addChat',
    async(newChat) => {
        const response = await addChatAPI(newChat);
            console.log("newChat:",response.data)
            
        return response.data
    }
)    

export const deleteChat = createAsyncThunk(
    'chat/deleteChat',
    async(chatId) => {
        const response = await deleteChatAPI(chatId);
        console.log("deleted:",response.data);
        return chatId
    }
)  

// export const updateChat = createAsyncThunk(
//     'available/updateAvailable',
//     async(availableId,newAvailable) => {
//         const response = await updateAvailableAPI(availableId,newAvailable);
//         return response
//     }
// ) 
 


const ChatSlice = createSlice({

    name: 'chat',
    initialState:{

        chats:[], 
        status:'idle',
        error:null,
        
    },
    reducers:{},
    extraReducers:(builder)=>{ builder


          //לקבל צאטים
   .addCase(getChat.pending,(state)=> {state.status='loading'})
   .addCase(getChat.fulfilled,(state,action)=>{state.status='succeeded',state.chats=action.payload})
   .addCase(getChat.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


   //הוספת צאט
   .addCase(addChat.pending,(state)=>{state.status='loading'})
   .addCase(addChat.fulfilled,(state,action)=>{state.status='succeeded',state.chats.push(action.payload);
})
   .addCase(addChat.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   //מחיקת צאט
   .addCase(deleteChat.pending,(state)=>{state.status='loading'})
   .addCase(deleteChat.fulfilled,(state,action)=>{state.status='succeeded'; state.chats =state.chats.filter(c => c.id!==action.payload),console.log("action.payload",action.payload);})
   .addCase(deleteChat.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

  
//  //עדכון זמינות
//   .addCase(updateAvailable.pending,(state)=>{state.status='loading'})
//   .addCase(updateAvailable.fulfilled,(state,action)=>{state.status='succeeded'; const index=state.available.findIndex(av=>av.id===action.payload.id)
//   if(index!==-1) state.availability[index]=action.payload})
//   .addCase(updateAvailable.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 

    }

   
       


 }) 



 export default ChatSlice.reducer 