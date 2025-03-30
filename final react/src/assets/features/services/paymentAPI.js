import axios from "axios";


export const getPaymentsAPI= async() =>{
    return await axios.get('http://localhost:8080/api/payment/getPayments')

}

export const addPaymentAPI= async(payment) =>{
    return await axios.post('http://localhost:8080/api/payment/addPayment',payment)

    
}


export const updatePaymentAPI= async(payment,paymentId) =>{
    return await axios.put(`http://localhost:8080/api/payment/updatePayment/${paymentId}`,payment)
    
}
