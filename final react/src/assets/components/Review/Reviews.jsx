
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getReviews,addReview } from '../../features/reducer/reviewSlice';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import { Rating } from "@mui/material";




function findCarReviews(reviews,carid){
    
    ;

const RevList =  reviews.filter((rev)=> rev?.car?.carId===carid)


   return RevList;
}


const Reviews = (carId) => {

    
    const location = useLocation();
  carId = carId.carId
    
  const dispatch = useDispatch();
 const reviews = useSelector((state) => state.review.reviews);
  const status = useSelector((state) => state.review.status);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [user,setUser]=useState({})
 const[revList,setRevList]=useState([])


  
  useEffect(() => {
    if (status === 'idle') {
       dispatch(getReviews()).unwrap();
    }

 
const storedUser = localStorage.getItem('user');

if (storedUser!=null) {
 setUser(JSON.parse(storedUser));
  ; 
}
const idUser =user.userId
  

  }, [dispatch, status]);

 
 useEffect(()=>{
    if(carId&&reviews.length>0){
        setRevList(findCarReviews(reviews,carId))
    }
    
 },[carId,reviews])

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (comment.trim() && rating&&user) {
      const newReview = {
        car:{carId:carId},
        userReview: {userId:user.userId},
        comment,
        rating,
      };

      
    const newR= await dispatch(addReview(newReview)).unwrap();
    ;
    
      
      setComment('');
      setRating(1);
     
    }
  };


   useEffect(()=>{
  
   },[revList])
   return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "0 auto", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
       cars review
      </Typography>

      {}
      {status === "loading" && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {status === "failed" && (
        <Typography color="error" align="center">
         Error loading comments
        </Typography>
      )}
      {status === "succeeded" && (
        <Box>
          {revList.length === 0 ? (
            <Typography align="center" color="textSecondary">
             There are no comments on this car yet.
            </Typography>
          ) : (
            revList.map((review) => (
              <Paper key={review.id} sx={{ padding: 2, marginBottom: 2, boxShadow: 3 }}>
                <Typography variant="h6" color="primary">
                 rate:
                  <Rating value={review.rating} readOnly />
                </Typography>
                <Typography>{review.comment}</Typography>
                <Typography align="right" color="textSecondary">
                  <em> from: {review.userReview.name}</em>
                </Typography>
              </Paper>
            ))
          )}
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

     
      <Typography variant="h6" gutterBottom>
       add review
      </Typography>
      <form onSubmit={handleAddReview}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">rate</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              size="large"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              rows={4}
              variant="outlined"
              required
            />
          </Grid>

          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                padding: "10px 20px",
                fontSize: "16px",
                borderRadius: 2,
                width: "100%",
                maxWidth: "200px",
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 4,
                },
              }}
            >
              Send a comment
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Reviews;