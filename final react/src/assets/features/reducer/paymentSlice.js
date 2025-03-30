import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addPaymentAPI,getPaymentsAPI,updatePaymentAPI } from '../services/paymentAPI';



export const getPayments = createAsyncThunk(
    'payment/getPayments',
    async() => {
        const response = await getPaymentsAPI();
        return response.data
    }
)    

export const addPayment = createAsyncThunk(
    'payment/addPayment',
    async(newPayment) => {
        const response = await addPaymentAPI(newPayment);
        return response.data
    }
)    

 

export const updatePayment = createAsyncThunk(
    'payment/updatePayment',
    async(paymentId,newPayment) => {
        const response = await updatePaymentAPI(paymentId,newPayment);
        return response
    }
) 


const PaymentSlice = createSlice({
    name:'payment',
initialState:{
    payments:[],
    status:'idle',
    error:null,
    selectedPayment:null
},
 reducers:{},
 extraReducers:(builder) =>{builder

    //לקבל תשלומים
   .addCase(getPayments.pending,(state)=> {state.status='loading'})
   .addCase(getPayments.fulfilled,(state,action)=>{state.status='succeeded',state.payments=action.payload})
   .addCase(getPayments.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})
  

   //הוספת תשלום
   .addCase(addPayment.pending,(state)=>{state.status='loading'})
   .addCase(addPayment.fulfilled,(state,action)=>{state.status='succeeded',state.payments.push(action.payload)})
   .addCase(addPayment.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   

   //עדכון תשלום
   .addCase(updatePayment.pending,(state)=>{state.status='loading'})
   .addCase(updatePayment.fulfilled,(state,action)=>{state.status='succeeded'; const index=state.payments.findIndex(pay=>pay.paymentId===action.payload.paymentId)
if(index!==-1) state.payments[index]=action.payload})
   .addCase(updatePayment.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   
}
})

export default PaymentSlice.reducer
