import {
  Button,
  Paper,
  Grid,
  Typography,
  Chip,
  Avatar,
  CardHeader,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Gym, Rating } from "../models/allModels";
import StarWidget from "./widgets/StarWidget";
import Lightbox from "./widgets/Lightbox";
import { useNavigate, useParams } from "react-router-dom";
import PricingList from "./widgets/PricingList";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import StarIcon from "@mui/icons-material/Star";

const moment = require("moment");

const GymViewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [ratingData, setRatingData] = useState<Rating | null>(null);
  const [gym, setGym] = useState<Gym>({
    name: "",
    description: "",
    phoneNumber: "",
    address: "",
    city: "",
    optionals: [],
    amenities: [],
    websiteURL: "",
    subscriptionOffers: [],
    email: "",
    _id: "",
    rating: [],
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

    ApiCalls.getGymOrCourseRating(fid)
      .then((res) => setRatingData(res.data.response))
      .catch((err) => UnifiedErrorHandler.handle(err, "Cannot get gym rating"));

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

  const handleCourseChipClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <ChonkySpinner loading={loading}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} spacing={2}>
          <Lightbox states={gym.images !== undefined ? gym.images : []} />
        </Grid>

        <Grid item xs={12} md={6}>
          <p>
            <h1 style={{ display: "inline" }}>{gym.name}</h1>
            <StarIcon
              fontSize="medium"
              sx={{ color: "#faec2d" }}
              style={{ marginLeft: "4px" }}
            />
            {ratingData ? (
              <span style={{ fontSize: "20px" }}>
                {ratingData.rating.toFixed(1)} ({ratingData.ratedBy})
              </span>
            ) : (
              <span style={{ fontSize: "16px", fontStyle: "italic" }}>
                no rating yet
              </span>
            )}
          </p>

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
          <Typography
            variant="h5"
            style={{ marginBottom: "1em", fontWeight: "bold" }}
          >
            What you'll find inside
          </Typography>
          <hr />
          <Paper style={{ padding: "2em", backgroundColor: "#eee" }}>
            <Typography variant="h6">Courses</Typography>
            <br />
            {courses.length > 0 ? (
              courses.map((item) => {
                return (
                  <Chip
                    label={item.name}
                    style={{ margin: "0.3em" }}
                    onClick={() => handleCourseChipClick(item._id)}
                  />
                );
              })
            ) : (
              <Typography variant="caption" style={{ fontStyle: "italic" }}>
                This gym does not offer any courses yet
              </Typography>
            )}

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
          <Typography
            variant="h5"
            style={{ marginBottom: "1em", fontWeight: "bold" }}
          >
            Pricing
          </Typography>
          <hr />
          <PricingList subscriptionOffers={gym.subscriptionOffers} />
        </Grid>
      </Grid>
      <br />
      <br />
      <Typography
        variant="h5"
        style={{ marginBottom: "1em", fontWeight: "bold" }}
      >
        Reviews
      </Typography>
      <hr />
      <Grid>
        <Grid>
          {reviews.length > 0 ? (
            reviews.map((review) => {
              return (
                <Paper
                  style={{ padding: "1em", marginBottom: "8px" }}
                  elevation={3}
                >
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
            })
          ) : (
            <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
              This gym does not have any reviews yet
            </Typography>
          )}
        </Grid>
      </Grid>
    </ChonkySpinner>
  );
};

export default GymViewPage;
