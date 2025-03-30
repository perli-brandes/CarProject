import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCarsAPI
    ,deletecarAPI,updateCarAPI,addCarAPI } from '../services/carAPI';
import { addAvailableAPI, deleteAvailableAPI } from '../services/availableAPI';


export const getCars = createAsyncThunk(
    'car/getCars',
    async() => {
        const response = await getCarsAPI();
        return response.data
    }
)    

export const addCar = createAsyncThunk(
    'car/addCar',
    async(newCar) => {
        console.log("Data being sent:", newCar);
        const response = await addCarAPI(newCar);
        console.log("new car added:",response.data);
        return response.data
    }
)    

export const deleteCar = createAsyncThunk(
    'car/deleteCar',
    async(carId) => {
        const response = await deletecarAPI(carId);
        return response.data
    }
)  

export const updateCar = createAsyncThunk(
    'car/updateCar',
    async(data) => {
        const{carDetails,carId}=data
        console.log("update car",carDetails,"id",carId);
        const response = await updateCarAPI(carId,carDetails);
        return response.data
    }
) 





 const  CarSlice = createSlice({

    name: 'car',
    initialState:{

        cars:[], 
        status:'idle',
        error:null,
        selectedCar:null,
        lastAddedCar:null
    },
     reducers:{
       
    
    },
    extraReducers:(builder)=>{ builder

         //לקבל רכבים
   .addCase(getCars.pending,(state)=> {state.status='loading'})
   .addCase(getCars.fulfilled,(state,action)=>{state.status='succeeded',state.cars=action.payload})
   .addCase(getCars.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


   //הוספת רכב
   .addCase(addCar.pending,(state)=>{state.status='loading'})
   .addCase(addCar.fulfilled,(state,action)=>{state.status='succeeded',state.cars.push(action.payload),state.lastAddedCar=action.payload.carId})
   .addCase(addCar.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   //מחיקת רכב
   .addCase(deleteCar.pending,(state)=>{state.status='loading'})
   .addCase(deleteCar.fulfilled,(state,action)=>{state.status='succeeded';state.cars=state.cars.filter((car) => car.carId!==action.payload)})
   .addCase(deleteCar.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

  
 //עדכון רכב
  .addCase(updateCar.pending,(state)=>{state.status='loading'})
  .addCase(updateCar.fulfilled,(state,action)=>{state.status='succeeded'; const index=state.cars.findIndex(car=>car.carId===action.payload.carId)
  if(index!==-1) state.cars[index]=action.payload})
  .addCase(updateCar.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})


//   .addCase(updateCarAvail.fulfilled, (state, action) => {
//     const Avail = action.payload.payload;
//     console.log('avail added', Avail);
//     console.log("avail from car:",state.cars);
//     const index = state.cars.findIndex((c) => c.carId === Avail.car.carId);
//     if (index !== -1) {
//       state.cars[index].available.push(Avail); // מוסיף את הזמינות החדשה
//     }
//     console.log('state.cars[index].available', state.cars[index].available);
//   });

//מחיקת זמינות לרכב
//  .addCase(DeleteCarAvail.pending,(state)=>{})
// .addCase(DeleteCarAvail.fulfilled,(state,action)=>{state.cars.map(car=>{
//     if (car.available&&car.available>0){
//         console.log("car.available",car.available);
//         car.available.filter(avail=>avail.id!==action.payload)
//     }}
// )})
// .addCase(DeleteCarAvail.rejected,(state,action)=>{state.error=action.error.message})



// //הוספת זמינות לרכב
//  .addCase(AddCarAvail.pending,(state)=>{})
// .addCase(AddCarAvail.fulfilled,(state,action)=>{const index=state.cars.findIndex(car=>car.carId===action.payload.car.carId)
// if(index!==-1) state.cars[index].available.push(action.payload)})
// .addCase(AddCarAvail.rejected,(state,action)=>{state.error=action.error.message})

//    //הוספת תמונה
//    .addCase(addPic.pending,(state)=>{state.status='loading'})
//    .addCase(addPic.fulfilled,(state,action)=>{state.status='succeeded';const index=state.cars.findIndex(car=>car.carId===action.payload.carId)
// if(index!==-1)state.cars[index]=action.payload})
//    .addCase(addPic.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

 

    }
       


 })
 export default CarSlice.reducer