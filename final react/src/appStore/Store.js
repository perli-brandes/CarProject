import { configureStore } from "@reduxjs/toolkit";



import userReducer from '../assets/features/reducer/usersSlice';
import carReducer from '../assets/features/reducer/carSlice'
import reviewReducer from '../assets/features/reducer/reviewSlice'
import rentalReducer from '../assets/features/reducer/rentalSlice'
import paymentReducer from '../assets/features/reducer/paymentSlice'
import availableReduser from '../assets/features/reducer/availableSlice'
import chatReduser from '../assets/features/reducer/chatSlice'
import messageReduser from '../assets/features/reducer/messageSlice'

const store = configureStore({
    reducer : {
        user: userReducer,
        car:carReducer,
        review: reviewReducer,
        rental:rentalReducer,
        payment:paymentReducer,
        available:availableReduser,
       chat:chatReduser,
       message:messageReduser
               
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // מאפשר להשתמש במידע לא-serializable
        ignoredActions: ['user/updatehUsers/fulfilled'],
        ignoredPaths: ['payload.headers'],
      },
    }),
});
export default store



