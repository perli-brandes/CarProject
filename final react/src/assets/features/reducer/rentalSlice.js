import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRentalsAPI,addRentalAPI,deleteRentalAPI,updateRentalAPI } from '../services/rentalAPI';


export const getRentals = createAsyncThunk(
    'rental/getRentals',
    async() => {
        const response = await getRentalsAPI();
        return response.data
    }
)    

export const addRental = createAsyncThunk(
    'rental/addRental',
    async(newRental) => {
        console.log("שכירות לפני שנשלחה לשרת",newRental);
        const response = await addRentalAPI(newRental);
        console.log("שכירות אחרי שנשלחה לשרת",response.data);
        return response.data
    }
)    

export const deleteRental = createAsyncThunk(
    'rental/deleteRental',
    async(rentalId) => {
        const response = await deleteRentalAPI(rentalId);
        return response
    }
)  

export const updateRental = createAsyncThunk(
    'rental/updateRental',
    async(newRental) => {
        console.log("newRental",newRental);
        
        const response = await updateRentalAPI(newRental);
        return response.data
    }
) 


const RentalSlice = createSlice({
    name:'rental',
initialState:{
    rentals:[],
    status:'idle',
    error:null,
    selectedRental:null
},
reducers:{},
 extraReducers:(builder)=>{builder

     //לקבל שכירויות
   .addCase(getRentals.pending,(state)=> {state.status='loading'})
   .addCase(getRentals.fulfilled,(state,action)=>{state.status='succeeded',state.rentals=action.payload})
   .addCase(getRentals.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})
  
 

   //הוספת שכירות
   .addCase(addRental.pending,(state)=>{state.status='loading'})
   .addCase(addRental.fulfilled,(state,action)=>{state.status='succeeded',state.rentals = [...state.rentals, action.payload];})
   .addCase(addRental.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   //מחיקת שכירות
   .addCase(deleteRental.pending,(state)=>{state.status='loading'})
   .addCase(deleteRental.fulfilled,(state,action)=>{state.status='succeeded';state.rentals.filter(rental => rental.rentalId!==action.payload.rentalId)})
   .addCase(deleteRental.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})



 


   //עדכון שכירות
   .addCase(updateRental.pending,(state)=>{state.status='loading'})
   .addCase(updateRental.fulfilled,(state,action)=>{state.status='succeeded';console.log("action.payload",action.payload); const index=state.rentals.findIndex(rental=>rental.rentalid===action.payload.rentalid)
if(index!==-1) state.rentals[index]=action.payload})
   .addCase(updateRental.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})



 }

})
export default RentalSlice.reducer