import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserByIdAPI,getUsersAPI,deleteUsersAPI,updateUsersAPI,addUsersAPI,logInAPI } from '../services/usersAPI';

export const getUsers = createAsyncThunk(
    'user/getUser',
    async() => {
        const response = await getUsersAPI();
        return response.data
    }
)    

export const addUsers = createAsyncThunk(
    'user/addUser',
    async(newUser) => {
        const response = await addUsersAPI(newUser);
        return response.data
    }
)    

export const deleteUsers = createAsyncThunk(
    'user/deletaUser',
    async(userId) => {
        const response = await deleteUsersAPI(userId);
        return response
    }
)  

export const updatehUsers = createAsyncThunk(
    'user/updatehUsers',
    async(dat) => {
        console.log("Data received in thunk:", dat);
        const { UserId, newUser } = dat;

        console.log("User ID:", dat.UserId);
        console.log("newuser: ",newUser)
        const response = await updateUsersAPI(UserId,newUser);
        console.log(response)
        return response
    }
) 

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async(UserId) => {
        const response = await getUserByIdAPI(UserId);
        
        return response
    }
) 

export const logInUser = createAsyncThunk(
    'user/logInUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const id = await logInAPI(credentials);
            return id;
        } catch (error) {
            return rejectWithValue(error.message); // שולח את הודעת השגיאה כ-rejected value
        }
    }
);


   
const UserSlice = createSlice({
name:'user',
initialState:{
    users:[],
    status:'idle',
    error:null,
    selectedUser:null,
    token: null,  // הוספת שדה עבור הטוקן
    userId:null
},
 reducers:{
    clearError: (state) => {
        state.error = null},
        logoutUser: (state) => {
            state.user = null;
            state.status = 'idle'; // מאפסים את הסטטוס
            state.error = null;
          },
 },
 extraReducers:(builder) => {builder
    
    //לקבל משתמשים
   .addCase(getUsers.pending,(state)=> {state.status='loading'})
   .addCase(getUsers.fulfilled,(state,action)=>{state.status='succeeded',state.users=action.payload})
   .addCase(getUsers.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})
  
   //לקבל משתמש אחד
   .addCase(getUserById.pending,(state)=>{state.status='loading'})
   .addCase(getUserById.fulfilled,(state,action)=>{state.status='succeeded',state.selectedUser=action.payload})
   .addCase(getUserById.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})
 

   //הוספת משתמש
   .addCase(addUsers.pending,(state)=>{state.status='loading'})
   .addCase(addUsers.fulfilled,(state,action)=>{state.status='succeeded',state.users.push(action.payload),
   sessionStorage.setItem('token', action.payload.token),localStorage.setItem( 'user' ,JSON.stringify(action.payload));})
   .addCase(addUsers.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   //מחיקת משתמש
   .addCase(deleteUsers.pending,(state)=>{state.status='loading'})
   .addCase(deleteUsers.fulfilled,(state,action)=>{state.status='succeeded';state.users.filter(user => user.UserId!==action.payload.UserId)})
   .addCase(deleteUsers.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})



 


   //עדכון משתמש
   .addCase(updatehUsers.pending,(state)=>{state.status='loading'})
   .addCase(updatehUsers.fulfilled,(state,action)=>{state.status='succeeded'; const index=state.users.findIndex(user=>user.UserId===action.payload.UserId)
if(index!==-1) state.users[index]=action.payload, localStorage.setItem('user',JSON.stringify(action.payload) )})
   .addCase(updatehUsers.rejected,(state,action)=>{state.status='failed',state.error=action.error.message})

   

   // כניסת משתמש
   .addCase(logInUser.pending, (state) => {
    state.status = 'loading';
    state.error = null; // איפוס השגיאה כשמפעילים את הפעולה מחדש
})
.addCase(logInUser.fulfilled, (state, action) => {
    console.log('Login successful, userId:', action.payload); 
    state.status = 'succeeded';
    state.userId = action.payload;  // שים את ה-userId שמתקבל ב-state
    localStorage.setItem('user',JSON.stringify(action.payload) );  // שמור את ה-userId ב-sessionStorage
})

.addCase(logInUser.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.payload; // 
})

   
 }
})
export const { setUser, logoutUser } = UserSlice.actions;
export default UserSlice.reducer;
export const {clearError}  = UserSlice.actions;




