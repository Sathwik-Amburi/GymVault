import {
  Button,
  Paper,
  Grid,
  Typography,
  Chip,
  Avatar,
  CardHeader,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Gym } from "../models/allModels";
import StarWidget from "./widgets/StarWidget";
import Lightbox from "./widgets/Lightbox";
import { useNavigate, useParams } from "react-router-dom";
import image from "../images/progym.jpg";
import RecentReviews from "./widgets/RecentReviews";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const moment = require("moment");

const GymViewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewSort, setReviewSort] = useState("newest");
  const [gym, setGym] = useState<Gym>({
    name: "",
    description: "",
    phoneNumber: "",
    address: "",
    city: "",
    amenities: [],
    websiteURL: "",
    subscriptionOffers: [],
    email: "",
    _id: "",
  });

  useEffect(() => {
    let fid = id != null ? id : ""; // empty id will gracefully fail anyway
    ApiCalls.getGym(fid)
      .then((res) => {
        setGym(res.data.response);
        setLoading(false);
      })
      .catch((err) =>
        UnifiedErrorHandler.handle(
          err,
          "TODO: The gym you're seeing does not exist in the database"
        )
      );

    ApiCalls.getReviewsById(fid)
      .then((res) => {
        setReviews(res.data.response);
      })
      .catch((err) =>
        UnifiedErrorHandler.handle(
          err,
          "TODO: The review you're seeing does not exist in the database"
        )
      );

    // TODO fix!
    ApiCalls.getCoursesByGymId(fid)
      .then((res) => {
        setCourses(res.data.response);
      })
      .catch((err) =>
        UnifiedErrorHandler.handle(
          err,
          "TODO: The course you're seeing does not exist in the database"
        )
      );
  }, [id]);

  const handleBuySubscriptionClick = () => {
    navigate(`/buy/${gym._id}`);
  };


  // /* MOCK - need own schema */
  // let reviews = [
  //     ...reviewsbyId
  // ];
  let [courses, setCourses] = useState<any[]>([
    "Cardio",
    "Strength",
    "Yoga",
    "Pilates",
    "Boxing",
    "Zumba",
    "Dance",
    "Swimming",
    "Climbing",
  ]);

  return (
    <ChonkySpinner loading={loading}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} spacing={2}>
          <Lightbox
            states={gym.images}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <h1>{gym.name}</h1>
          <hr />
          <p>{gym.description}</p>
          <br />
          <p>Tel: +{gym.phoneNumber}</p>
          <p>{gym.address}</p>

          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleBuySubscriptionClick}
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
            {gym.amenities.map((amenity) => {
              return (
                <Chip
                  label={amenity}
                  style={{ margin: "0.3em" }}
                  color="secondary"
                  variant="outlined"
                />
              );
            })}
          </Paper>
        </Grid>
        <Grid item md={5} xs={12}>
          <RecentReviews rating={4} />
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
      <Grid>
        <Grid>
          {reviews.map((review) => {
            return (
              <Paper style={{ padding: "1em" }} elevation={3}>
                <CardHeader
                  avatar={<Avatar src="todo" />}
                  title={review.username}
                  subheader={moment(review.dateAdded).format("MMM Do YYYY")}
                />
                <div>
                  <StarWidget rating={review.rating} />
                </div>
                <p>
                  <b>{review.title}</b>
                </p>
                <p>{review.description}</p>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </ChonkySpinner>
  );
};

export default GymViewPage;
