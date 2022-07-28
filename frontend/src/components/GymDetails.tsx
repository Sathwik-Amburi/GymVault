import {
  Button,
  Paper,
  Grid,
  Typography,
  Chip,
  Avatar,
  CardHeader,
  Box,
  Divider,
  Card,
  CardContent,
  CardActions,
  CardMedia,
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
import { S3_BASE_URL } from "../config/config";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CityMap from "./widgets/map/CityMap";
import { setErrorAlert } from "../store/slices/errorAlertSlice";
import { useDispatch } from "react-redux";

const moment = require("moment");

const GymViewPage: FC = () => {
  const dispatch = useDispatch();
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
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Error while fetching gym",
          })
        );
      });

    ApiCalls.getGymOrCourseRating(fid)
      .then((res) => setRatingData(res.data.response))
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Cannot get gym rating",
          })
        );
      });

    // fetch all the reviews for a gym by its ID
    ApiCalls.getReviewsById(fid)
      .then((res) => {
        setReviews(res.data.response);
        console.log(res.data.response);
      })
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Error while fetching reviews",
          })
        );
      });

    ApiCalls.getCoursesByGymId(fid)
      .then((res) => {
        setCourses(res.data.response);
      })
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Error while fetching course",
          })
        );
      });
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
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              marginBottom: "8px",
            }}
          >
            <PhoneIcon color="secondary" />+{gym.phoneNumber}
          </div>
          <div style={{ display: "flex", justifyItems: "center" }}>
            <LocationOnIcon sx={{ color: "red" }} />
            {gym.address}
          </div>
          <hr />
          <Box
            style={{
              padding: "1em",
              border: "3px solid #C31D56",
              borderRadius: "0 20px 0 20px",
            }}
            sx={{ boxShadow: 5 }}
          >
            <p style={{ margin: 0 }}>{gym.description}</p>
          </Box>
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="success"
              sx={{ fontWeight: "bold" }}
              onClick={handleBuySubscriptionClick}
            >
              Buy Subscription
            </Button>
          </div>
        </Grid>

        <Grid item md={7} xs={12}>
          <Typography
            variant="h5"
            style={{
              marginBottom: "1em",
              fontWeight: "bold",
              color: "#519dd9",
            }}
          >
            What you'll find inside
          </Typography>
          <hr className="mini-hr" style={{ backgroundColor: "#519dd9" }} />
          <Paper style={{ padding: "2em", backgroundColor: "white" }}>
            <Typography variant="h6">Courses</Typography>
            <br />
            <Grid container spacing={2}>
              {courses.length > 0 ? (
                courses.map((item) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      onClick={() => handleCourseChipClick(item._id)}
                    >
                      <Card>
                        <CardMedia
                          component="img"
                          height="140"
                          image={`${item.images[0]}`}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            {item.name}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Typography variant="caption" style={{ fontStyle: "italic" }}>
                  This gym does not offer any courses yet
                </Typography>
              )}
            </Grid>

            <br />
            <br />
            <Divider />
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
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor: "#C31D56",
                  }}
                  variant="filled"
                />
              );
            })}
          </Paper>
        </Grid>
        <Grid item md={5} xs={12}>
          <Grid item style={{ marginBottom: "16px" }}>
            <Typography
              variant="h5"
              style={{
                marginBottom: "1em",
                fontWeight: "bold",
                color: "#519dd9",
              }}
            >
              Pricing
            </Typography>
            <hr className="mini-hr" style={{ backgroundColor: "#519dd9" }} />
            <PricingList subscriptionOffers={gym.subscriptionOffers} />
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              style={{
                marginBottom: "1em",
                fontWeight: "bold",
                color: "#519dd9",
              }}
            >
              Where you'll find us
            </Typography>
            <hr className="mini-hr" style={{ backgroundColor: "#519dd9" }} />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                margin: "30px 0px",
              }}
            >
              {gym.city && (
                <CityMap item="gymDetails" city={gym.city} gym={gym} />
              )}
            </div>
          </Grid>
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
            // map all the reviews into review cards
            reviews.map((review) => {
              return (
                <Paper
                  style={{ padding: "1em", marginBottom: "8px" }}
                  elevation={3}
                >
                  <CardHeader
                    avatar={
                      <Avatar
                        src={`${S3_BASE_URL}/${review.userId.profilePicture}`}
                      />
                    }
                    title={review.username}
                    subheader={moment(review.dateAdded).format("MMM Do YYYY")}
                  />
                  <p>
                    <b>
                      <StarWidget rating={review.rating} /> {review.title}
                    </b>
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
