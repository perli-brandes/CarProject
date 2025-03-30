import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addAvailableAPI,deleteAvailableAPI,getAvailableAPI,updateAvailableAPI } from '../services/availableAPI';



export const getAvailable = createAsyncThunk(
    'available/getAvailable',
    async() => {
        const response = await getAvailableAPI();
       
        return response.data
    }
)    

export const addAvailable = createAsyncThunk(
    'available/addAvailable',
    async(newAv) => {
        const response = await addAvailableAPI(newAv);
            console.log("avail:",response.data)
            
        return response.data
    }
)    

export const deleteAvailable = createAsyncThunk(
    'available/deleteAvailable',
    async(availableId) => {
        const response = await deleteAvailableAPI(availableId);
        console.log("deleted:",response.data);
        return availableId
    }
)  

export const updateAvailable = createAsyncThunk(
    'available/updateAvailable',
    async(availableId,newAvailable) => {
        const response = await updateAvailableAPI(availableId,newAvailable);
        return response
    }
) 
 


const  AvailableSlice = createSlice({

    name: 'available',
    initialState:{

        available:[], 
        status:'idle',
        error:null,
        selectedCar:null
    },
    reducers:{},
    extraReducers:(builder)=>{ builder


          //לקבל זמינויות
   .addCase(getAvailable.pending,(state)=> {state.status='loading'})
   .addCase(getAvailable.fulfilled,(state,action)=>{state.status='succeeded',state.available=action.payload})
   .addCase(getAvailable.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


   //הוספת זמינות
   .addCase(addAvailable.pending,(state)=>{state.status='loading'})
   .addCase(addAvailable.fulfilled,(state,action)=>{state.status='succeeded',state.available.push(action.payload);
})
   .addCase(addAvailable.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   //מחיקת זמינות
   .addCase(deleteAvailable.pending,(state)=>{state.status='loading'})
   .addCase(deleteAvailable.fulfilled,(state,action)=>{state.status='succeeded'; state.available =state.available.filter(av => av.id!==action.payload),console.log("action.payload",action.payload);})
   .addCase(deleteAvailable.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

  
 //עדכון זמינות
  .addCase(updateAvailable.pending,(state)=>{state.status='loading'})
  .addCase(updateAvailable.fulfilled,(state,action)=>{state.status='succeeded'; const index=state.available.findIndex(av=>av.id===action.payload.id)
  if(index!==-1) state.availability[index]=action.payload})
  .addCase(updateAvailable.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 

    }

   
       


 }) 



 export default AvailableSlice.reducer 