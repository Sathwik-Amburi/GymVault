import {
  Button,
  Paper,
  Grid,
  Typography,
  Avatar,
  CardHeader,
  Card,
  Box,
  Divider,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Course, Rating } from "../models/allModels";
import StarWidget from "./widgets/StarWidget";
import Lightbox from "./widgets/Lightbox";
import { useParams, useNavigate, Link } from "react-router-dom";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import PricingList from "./widgets/PricingList";
import StarIcon from "@mui/icons-material/Star";
import CourseScheduleTable from "./CourseScheduleTable";
import { setErrorAlert } from "../store/slices/errorAlertSlice";
import { useDispatch } from "react-redux";
import { S3_BASE_URL } from "../config/config";

const moment = require("moment");

const CourseViewPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [ratingData, setRatingData] = useState<Rating | null>(null);
  let gym = {
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
    rating: [],
    _id: "",
  };
  const [course, setCourse] = useState<Course>({
    name: "",
    gym: gym,
    gymId: gym,
    description: "",
    phoneNumber: 0,
    address: "",
    subscriptionOffers: [],
    rating: [],
    sessions: [],
    _id: "0",
  });

  useEffect(() => {
    let fid = id != null ? id : ""; // empty id will gracefully fail anyway
    ApiCalls.getCourse(fid)
      .then((res) => {
        let newCourse = res.data.response;
        ApiCalls.getGym(res.data.response.gymId)
          .then((res) => {
            newCourse.gym = res.data.response;
            setCourse(newCourse);
            setLoading(false);
          })
          .catch((err) => {
            UnifiedErrorHandler.handle(err);
            dispatch(
              setErrorAlert({
                showError: true,
                errorMessage: "Error fetching gym",
              })
            );
          });
      })
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Error fetching course",
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
            errorMessage: "Cannot get course rating",
          })
        );
      });

    //fetch the course reviews by its id
    ApiCalls.getReviewsById(fid)
      .then((res) => {
        setReviews(res.data.response);
      })
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "The review does not exist in the database",
          })
        );
      });
  }, [id]);

  const handleBuySubscriptionClick = () => {
    navigate(`/buy/${course._id}`);
  };

  // /* MOCK - need own schema */
  // let reviews = [
  //   ...reviewsbyId
  // ];
  return (
    <ChonkySpinner loading={loading}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6} spacing={2}>
          <Lightbox states={course.images !== undefined ? course.images : []} />
        </Grid>
        <Grid item xs={12} md={6}>
          <h1 style={{ display: "inline" }}>{course.name}</h1>
          <div style={{ display: "inline", alignContent: "center" }}>
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
          </div>
          <hr />
          <Box
            style={{
              padding: "1em",
              border: "3px solid #C31D56",
              borderRadius: "20px 0 20px 0",
            }}
            sx={{ boxShadow: 5 }}
          >
            <p style={{ margin: 0 }}>{course.description}</p>
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

          <br />
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="h5"
            style={{ marginBottom: "1em", fontWeight: "bold" }}
          >
            Organizer
          </Typography>
          <hr />

          <Card elevation={2} style={{ padding: "2em" }}>
            <Typography
              variant="h5"
              style={{ fontWeight: "bold" }}
              color="secondary"
            >
              <Link
                to={`/gym/${course.gym._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {course.gym.name}
              </Link>
            </Typography>
            <i> {course.gym.address}</i> <br />
            <hr className="mini-hr" />
            <i>{course.gym.description}</i>
            <br />
            <br />
            <br />
            <b> +{course.gym.phoneNumber}</b>
            <div style={{ textAlign: "right" }}>
              <Button
                href="tel:+49123456789"
                variant="contained"
                color="secondary"
                style={{ color: " white", fontWeight: "bold" }}
              >
                <i
                  className="fas fa-phone"
                  style={{ marginRight: "1em", color: "white" }}
                />
                Call
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="h5"
            style={{ marginBottom: "1em", fontWeight: "bold" }}
          >
            Course Schedule
          </Typography>
          <hr />
          <CourseScheduleTable courseSessions={course.sessions} />
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography
            variant="h5"
            style={{ marginBottom: "1em", fontWeight: "bold" }}
          >
            Pricing
          </Typography>
          <hr />
          <PricingList subscriptionOffers={course.subscriptionOffers} />
        </Grid>
      </Grid>
      <br />
      <br />
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
            //map all the reviews into review cards
            reviews.map((review) => {
              return (
                <>
                  <Paper
                    style={{ padding: "1em", marginBottom: "8px" }}
                    elevation={0}
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
                    <p style={{ marginTop: "8px" }}>{review.description}</p>
                  </Paper>
                  <Divider className="review-hr" />
                </>
              );
            })
          ) : (
            <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
              This course does not have any reviews yet
            </Typography>
          )}
        </Grid>
      </Grid>
    </ChonkySpinner>
  );
};

export default CourseViewPage;
