import axios from "axios";

export const getCarsAPI= async() =>{
    return await axios.get('http://localhost:8080/api/car/getCars')

}



export const addCarAPI= async(car) =>{
    console.log("Data being sent:", car);
  return await axios.post(' http://localhost:8080/api/car/addCar',car) 
 
    
}

export const deletecarAPI= async(carId) =>{
    return await axios.delete(`http://localhost:8080/api/car/deletCar/${carId}`)
    
}
export const updateCarAPI= async(carId,car) =>{
    console.log("car",car);
    return await axios.put(`http://localhost:8080/api/car/Update/${carId}`,car)
    
}

// export const addPicAPI= async(carId,picList) =>{
//     return await axios.put("http://localhost:8080/api/car/addPicture",carId,picList)
    
// }
