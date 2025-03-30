import axios from "axios";


export const getReviewAPI= async() =>{
    return await axios.get('http://localhost:8080/api/review/getAllReviews')

}

export const getReviewByIdAPI= async(reviewId) =>{
    return await axios.get(`http://localhost:8080/api/review/getReviews/${reviewId}`)
    
}

export const addReviewAPI= async(review) =>{
    return await axios.post(' http://localhost:8080/api/review/addReview',review)

    
}

export const deleteReviewAPI= async(reviewId) =>{
    return await axios.delete(`http://localhost:8080/api/review/DeletReview/${reviewId}`)
    
}
