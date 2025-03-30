import axios from "axios";

export const getRentalsAPI= async() =>{
    return await axios.get('http://localhost:8080/api/rental/getRentals')

}



export const addRentalAPI= async(rental) =>{
    return await axios.post('http://localhost:8080/api/rental/addRental',rental)

    
}

export const deleteRentalAPI= async(rentalId) =>{
    return await axios.delete(`http://localhost:8080/api/rental/deleteRental/${rentalId}`)
    
}
export const updateRentalAPI= async(rental) =>{
   
    return await axios.put(`http://localhost:8080/api/rental/updateRental/${rental.rentalid}`,rental)
    
}
