import axios from "axios";
import React from 'react'


export const getUsersAPI= async() =>{
    return await axios.get('http://localhost:8080/api/users/getUsers')

}

export const getUserByIdAPI= async(userId) =>{
    return await axios.get(`http://localhost:8080/api/users/getUserDetails/${userId}`)
    
}

export const addUsersAPI= async(user) =>{
    return await axios.post(' http://localhost:8080/api/users/add',user)

    
}

export const deleteUsersAPI= async(userId) =>{
    return await axios.delete(`http://localhost:8080/api/users/deletUser/${userId}`)
    
}
export const updateUsersAPI= async(userId,user) =>{
    
  const update=  await axios.put(`http://localhost:8080/api/users/updateUser/${userId}`,user)
   
 
    return update
    
    
}

// ב-API שלך הוסף פונקציה להתחברות
//services/usersAPI.js
export const logInAPI = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:8080/api/users/logIn', credentials);
        console.log("API",response.data)
        return response.data; // מחזיר את הנתונים של ההתחברות
    } catch (error) {
        // בדיקת קוד השגיאה והחזרת הודעה בהתאם
        if (error.response && error.response.status === 401) {
            throw new Error("Incorrect password. Please try again."); // הודעה על סיסמה שגויה
        } else if (error.response && error.response.status === 404) {
            throw new Error("The user is not in the system. Please register."); // הודעה על משתמש לא קיים
        } else {
            throw new Error("שגיאה בהתחברות: " + error.message);
        }
    }
};

