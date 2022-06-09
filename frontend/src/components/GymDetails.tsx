import { Button, Paper, Grid, Typography, Chip, Avatar, CardHeader } from "@mui/material";
import { Box, Container, padding } from "@mui/system";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Gym } from "../models/allModels";
import Navbar from "./widgets/Navbar";
import StarWidget from "./widgets/StarWidget";
import Lightbox from "./widgets/Lightbox";
import { useParams } from "react-router-dom";


const GymViewPage: FC = () => {
  let { id } = useParams();
  const [gym, setGym] = useState<Gym>({ 
    name: "The Olympic Gym", 
    phoneNumber: 12, 
    _id: "0" 
  });

  useEffect(() => {
    if (!id) {
      id = "0";
    }
    ApiCalls.getGym(id)
      .then((res) => {
        console.log(res.data);
        setGym(res.data);
      })
      .catch((err) => {
        // do some error handling later, log error for now
        console.log(err.message);
      });
  }, []);

  let reviews = [
    {
      fullname: "Carter",
      rating: 4,
      comment: "This is a great gym. I come here almost daily to workout, and find the atmosphere very calming and relaxing.",
      gym: "0",
      user: "0",
      _id: "0"
    },
  ];
  let reviewCards: React.ReactElement[] = reviews.map(review => {
    return (
      <Paper style={{ padding: "1em" }} elevation={3}>
        <CardHeader
          avatar={
            <Avatar
              src="todo"
            />
          }
          title={review.fullname}
          subheader={
            <>
              May 5th, 2020
            </>
          }
        />
        <div style={{textAlign: "center" }}>
          <StarWidget rating={review.rating} />
        </div>
        <p>{review.comment}</p>
      </Paper>
    );
  });


  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ padding: "3em" }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} spacing={2}>
            <Lightbox />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <h1>{gym.name}</h1>
            <hr />
            <p>Gym description (needs mongo schema)</p>
            <br />
            <p>Tel: +49 {gym.phoneNumber}</p>
            <p>Address (needs mongo schema)</p>

            <div style={{ textAlign: "right" }}>
              <Button variant="contained" color="success">
                Buy Subscription
              </Button>
            </div>

          </Grid>

          <Grid item md={7} xs={12}>
            <Paper style={{ padding: "2em" }}>
              <Typography variant="h6">Offered Courses</Typography>
              <br />
              <Chip label="Cardio" style={{ margin: "0.3em" }} />
              <Chip label="Strength" style={{ margin: "0.3em" }} />
              <Chip label="Yoga" style={{ margin: "0.3em" }} />
              <Chip label="Pilates" style={{ margin: "0.3em" }} />
              <Chip label="Zumba" style={{ margin: "0.3em" }} />
              <Chip label="Boxing" style={{ margin: "0.3em" }} />
              <Chip label="Swimming" style={{ margin: "0.3em" }} />
              <Chip label="Climbing" style={{ margin: "0.3em" }} />
              <br /><br />
              <hr />
              <br />
              <Typography variant="h6">Amenities</Typography>
              <br />
              <Chip label="Sauna" style={{ margin: "0.3em" }} color="warning" variant="outlined" />
              <Chip label="Pool" style={{ margin: "0.3em" }}  color="warning"  variant="outlined"/>
              <Chip label="Wi-Fi" style={{ margin: "0.3em" }} />
              <Chip label="Parking" style={{ margin: "0.3em" }} />
              <Chip label="Wheelchair Access" style={{ margin: "0.3em" }} />

            </Paper>
          </Grid>
          <Grid item md={5} xs={12}>
            <Paper style={{ padding: "2em", backgroundColor: "#ccc" }}>
              <Typography variant="h6">Reviews</Typography>
              <br />
              <Paper style={{ padding: "1em" }}>
                <StarWidget rating={4.1} />
                <small>
                  150 people reviewed this gym!
                </small>
              </Paper>
              <br />
              <Typography variant="h6">Recent Activity</Typography>
              <br />

              <Paper style={{ padding: "1em" }}>
                <CardHeader
                  avatar={
                    <Avatar
                      src="todo"
                    />
                  }
                  title="Carter"
                  subheader={
                    <>
                      Rated
                      <StarWidget rating={4.1} /> 
                      yesterday
                    </>
                  }
                />
              </Paper>
            </Paper>
          </Grid>
        </Grid>
        <br />
        <br />
        <Box padding={3}>  
          <Button variant="contained">Most Recent</Button>
          <Button>Most Positive</Button>
          <Button>Most Critical</Button>
        </Box>
        <Grid container spacing={3}>
          <Grid item md={3} xs={12}>
            {reviewCards}
          </Grid>
            
        </Grid>
      </Container>
    </>
  );
};

export default GymViewPage;
