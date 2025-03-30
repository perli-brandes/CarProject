import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
} from "@mui/material";
import Reviews from "../components/Review/Reviews";

const CarDetailsLayout = ({
  car,
  images,
  currentImageIndex,
  nextImage,
  availabilityForCar,
  showAvailability,
  toggleAvailability,
  navigate,
  openInMaps,
  openInWaze,
  user,
  handleChat,
}) => {
  const primaryColor = "#4A5568"; // צבע אחיד וסולידי
  const secondaryColor = "#2D3748";
  const backgroundColor = "#F7FAFC";
  const buttonTextColor = "#FFFFFF";

  return (
    <Box sx={{ padding: 4, display: "flex", justifyContent: "center", backgroundColor }}>
      <Card
        sx={{
          maxWidth: 850,
          width: "100%",
          borderRadius: 2,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          backgroundColor: primaryColor,
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={images[currentImageIndex] || "/placeholder.jpg"}
          alt={`Car image for ${car.model}`}
          onClick={nextImage}
          sx={{
            cursor: "pointer",
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ padding: 3, backgroundColor }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: primaryColor,
              textAlign: "center",
              marginBottom: 3,
            }}
          >
            Car Details
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: secondaryColor }}>
                <strong>Owner's Name:</strong> {car.owner.name}
              </Typography>
              <Typography sx={{ color: secondaryColor }}>
                <strong>Model:</strong> {car.model}
              </Typography>
              <Typography sx={{ color: secondaryColor }}>
                <strong>Year:</strong> {car.carYear}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: secondaryColor }}>
                <strong>License Plate:</strong> {car.licensePlate}
              </Typography>
              <Typography sx={{ color: secondaryColor }}>
                <strong>Price Per Day:</strong> {car.dayRate}₪
              </Typography>
              <Typography sx={{ color: secondaryColor }}>
                <strong>Location:</strong> {car.location.address}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 3, backgroundColor: secondaryColor }} />

          {user.userId !== car.owner.userId && (
            <Grid container spacing={2} sx={{ marginY: 2 }}>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: secondaryColor,
                    color: buttonTextColor,
                    textTransform: "none",
                  }}
                  onClick={openInMaps}
                >
                  Open in Google Maps
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: secondaryColor,
                    color: buttonTextColor,
                    textTransform: "none",
                  }}
                  onClick={openInWaze}
                >
                  Open in Waze
                </Button>
              </Grid>
            </Grid>
          )}

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: secondaryColor,
                  color: buttonTextColor,
                  textTransform: "none",
                }}
                onClick={() =>
                  navigate(
                    user.userId === car.owner.userId ? "/EditCar" : "/tenantDetails",
                    { state: car }
                  )
                }
              >
                {user.userId === car.owner.userId ? "Edit Car" : "Rent Car"}
              </Button>
            </Grid>
          </Grid>

          <Divider sx={{ marginY: 3, backgroundColor: secondaryColor }} />

          <Typography variant="h6" sx={{ marginBottom: 1, color: primaryColor }}>
            Availability
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: secondaryColor,
              borderColor: secondaryColor,
              textTransform: "none",
              marginBottom: 2,
            }}
            onClick={toggleAvailability}
          >
            {showAvailability ? "Hide Availability" : "Show Availability"}
          </Button>
          {showAvailability && (
            <List>
              {availabilityForCar.map((availability, index) => (
                <ListItem
                  key={index}
                  sx={{
                    padding: 1,
                    borderRadius: 1,
                    background: backgroundColor,
                    marginY: 0.5,
                  }}
                >
                  <ListItemText
                    primary={`From ${availability.startDate} to ${availability.endDate}`}
                    sx={{ color: secondaryColor }}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {user.userId !== car.owner.userId && (
            <Box sx={{ marginTop: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: secondaryColor,
                  color: buttonTextColor,
                  textTransform: "none",
                }}
                onClick={handleChat}
              >
                Chat with Owner
              </Button>
            </Box>
          )}

          <Typography
            variant="h6"
            sx={{
              marginTop: 3,
              color: primaryColor,
            }}
          >
            Reviews
          </Typography>
          <Reviews carId={car.carId} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default CarDetailsLayout;
