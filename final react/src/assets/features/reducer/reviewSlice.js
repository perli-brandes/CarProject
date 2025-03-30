import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addReviewAPI,getReviewAPI,getReviewByIdAPI,deleteReviewAPI } from '../services/reviewAPI';

export const getReviews = createAsyncThunk(
    'review/getReviews',
    async() => {
        const response = await getReviewAPI();
        return response.data
    }
)    

export const addReview = createAsyncThunk(
    'review/addReview',
    async(newReview) => {
        const response = await addReviewAPI(newReview);
        return response.data
    }
)    

export const deleteReview = createAsyncThunk(
    'review/deletaReview',
    async(reviewId) => {
        const response = await deleteReviewAPI(reviewId);
        return response
    }
)  



export const getReviewById = createAsyncThunk(
    'review/getReviewById',
    async(reviewId) => {
        const response = await getReviewByIdAPI(reviewId);
        return response
    }
) 


const ReviewSlice = createSlice({
    name:'review',
initialState:{
    reviews:[],
    status:'idle',
    error:null,
    selectedReview:null
},
reducers:{},
extraReducers:(builder) =>{builder

 //לקבל תגובות
 .addCase(getReviews.pending,(state)=> {state.status='loading'})
 .addCase(getReviews.fulfilled,(state,action)=>{state.status='succeeded',state.reviews=action.payload})
 .addCase(getReviews.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 //לקבל תגובה אחת
 .addCase(getReviewById.pending,(state)=>{state.status='loading'})
 .addCase(getReviewById.fulfilled,(state,action)=>{state.status='succeeded',state.selectedReview=action.payload})
 .addCase(getReviewById.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


 //הוספת תגובה
 .addCase(addReview.pending,(state)=>{state.status='loading'})
 .addCase(addReview.fulfilled,(state,action)=>{state.status='succeeded',state.reviews.push(action.payload)})
 .addCase(addReview.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 //מחיקת תגובה
 .addCase(deleteReview.pending,(state)=>{state.status='loading'})
 .addCase(deleteReview.fulfilled,(state,action)=>{state.status='succeeded';state.reviews.filter(review => review.reviewId!==action.payload.reviewId)})
 .addCase(deleteReview.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


}

})

export default ReviewSlice.reducer