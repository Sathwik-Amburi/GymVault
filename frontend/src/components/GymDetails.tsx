import {
  Button,
  Paper,
  Grid,
  Typography,
  Chip,
  Avatar,
  CardHeader,
  Link
} from "@mui/material";
import { Box, Container, padding } from "@mui/system";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Gym } from "../models/allModels";
import StarWidget from "./widgets/StarWidget";
import Lightbox from "./widgets/Lightbox";
import { useParams } from "react-router-dom";
import image from "../images/progym.jpg";

const GymViewPage: FC = () => {
  const { id } = useParams();
  const [reviewSort, setReviewSort] = useState("newest");
  const [gym, setGym] = useState<Gym>({
    name: "",
    phoneNumber: "",
    _id: "0",
    city: "Berlin",
    address: "",
    description: "",
    amenities: [],
  });

  useEffect(() => {
    let fid = id != null ? id : ""; // empty id will gracefully fail anyway
    ApiCalls.getGym(fid)
      .then((res) => {
        console.log(res.data);
        setGym(res.data.response);
      })
      .catch((err) => {
        console.log(err);
        alert("TODO: The gym you're seeing does not exist in the database");
      });
  }, []);

  /* MOCK - need own schema */
  let reviews = [
    {
      fullname: "Carter",
      rating: 4,
      comment:
        "This is a great gym. I come here almost daily to workout, and find the atmosphere very calming and relaxing.",
      gym: "0",
      user: "0",
      _id: "0",
    },
  ];
  let courses = [
    "Cardio",
    "Strength",
    "Yoga",
    "Pilates",
    "Boxing",
    "Zumba",
    "Dance",
    "Swimming",
    "Climbing",
  ];

  // format: [name: string, included in base price: boolean]
  let amenities = [
    ["Sauna", false],
    ["Pool", false],
    ["Wi-Fi", true],
    ["Parking", true],
    ["Wheelchair Access", true],
  ];

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} spacing={2}>
          <Lightbox states={["https://www.climbing.com/wp-content/uploads/2016/10/7_gn-copyjpg.jpg", image]} />
        </Grid>

        <Grid item xs={12} md={6}>
          <h1>{gym.name}</h1>
          <hr />
          <p>{gym.description}</p>
          <br />
          <p>Tel: +49 {gym.phoneNumber}</p>
          <p>{gym.address}</p>

          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="success"
              href={"/buy/" + gym._id}
            >
              Buy Subscription
            </Button>
          </div>
        </Grid>

        <Grid item md={7} xs={12}>
          <Paper style={{ padding: "2em", backgroundColor: "#eee" }}>
            <Typography variant="h6">Offered Courses</Typography>
            <br />
            {courses.map((course) => {
              return (
                <Link href="/course/{course}">
                  <Chip label={course} style={{ margin: "0.3em" }} />
                </Link>
              );
            })}
            <br />
            <br />
            <hr />
            <br />
            <Typography variant="h6">Amenities</Typography>
            <Typography variant="body2">
              May vary depending on course or subscription plan
            </Typography>
            <br />
            {amenities.map((amenity) => {
              return (
                <Chip
                  label={amenity[0]}
                  style={{ margin: "0.3em" }}
                  color={amenity[1] ? undefined : "warning"}
                  variant={amenity[1] ? undefined : "outlined"}
                />
              );
            })}
          </Paper>
        </Grid>
        <Grid item md={5} xs={12}>
          <Paper style={{ padding: "2em", backgroundColor: "#eee" }}>
            <Typography variant="h6">Reviews</Typography>
            <br />
            <Paper style={{ padding: "1em" }}>
              <StarWidget rating={4.1} />
              <small>150 people reviewed this gym!</small>
            </Paper>
            <br />
            <Typography variant="h6">Recent Activity</Typography>
            <br />

            <Paper style={{ padding: "1em" }}>
              <CardHeader
                avatar={<Avatar src="todo" />}
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
        <Button
          variant={reviewSort === "newest" ? "contained" : undefined}
          onClick={() => setReviewSort("newest")}
        >
          Most Recent
        </Button>
        <Button
          variant={reviewSort === "best" ? "contained" : undefined}
          onClick={() => setReviewSort("best")}
        >
          Most Positive
        </Button>
        <Button
          variant={reviewSort === "worst" ? "contained" : undefined}
          onClick={() => setReviewSort("worst")}
        >
          Most Critical
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item md={3} xs={12}>
          {reviews.map((review) => {
            return (
              <Paper style={{ padding: "1em" }} elevation={3}>
                <CardHeader
                  avatar={<Avatar src="todo" />}
                  title={review.fullname}
                  subheader={<>May 5th, 2020</>}
                />
                <div style={{ textAlign: "center" }}>
                  <StarWidget rating={review.rating} />
                </div>
                <p>{review.comment}</p>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default GymViewPage;
