import axios from "axios";

export const getAvailableAPI= async() =>{
    return await axios.get(' http://localhost:8080/api/available/getAvailables')

}



export const addAvailableAPI= async(availability) =>{
    console.log("available:",availability)
   
    return await axios.post(' http://localhost:8080/api/available/addAvailable',availability)



    
}

export const deleteAvailableAPI= async(availableId) =>{
    console.log("availableId",availableId);
    return await axios.delete(` http://localhost:8080/api/available/deletAvailable/${availableId}`)
    
}
export const updateAvailableAPI= async(av,availableId) =>{
    return await axios.put(`http://localhost:8080/api/available/updateAvailable/${availableId}`,av)
    
}
