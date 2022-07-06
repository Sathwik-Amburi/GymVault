import {
  Button,
  Paper,
  Grid,
  Typography,
  Avatar,
  CardHeader,
  Card,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Course } from "../models/allModels";
import StarWidget from "./widgets/StarWidget";
import Lightbox from "./widgets/Lightbox";
import { useParams, useNavigate, Link } from "react-router-dom";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const CourseViewPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewSort, setReviewSort] = useState("newest");
  let Gym = {
    name: "",
    phoneNumber: "",
    _id: "0",
    city: "",
    address: "",
    description: "",
    amenities: [],
  };
  const [course, setCourse] = useState<Course>({
    name: "",
    gym: Gym,
    description: "",
    phoneNumber: 0,
    address: "",
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
          }).catch((err) => UnifiedErrorHandler.handle(err, "Error fetching gym"));
      }).catch((err) => UnifiedErrorHandler.handle(err, "Error fetching course"));
    
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
          <Lightbox
            states={course.images}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <h1>{course.name}</h1>
          <hr />
          <p>{course.description}</p>
          <div style={{ textAlign: "right" }}>
            <Typography variant="h6" style={{ display: "inline", marginRight: "2em" }}>
              Starts from <b>69 €</b>
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={handleBuySubscriptionClick}
            >
              Buy Subscription
            </Button>
          </div>
          
          <br />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h5" style={{ marginBottom: "1em", fontWeight: "bold" }}>
            Organizer
          </Typography>
          <hr />
          <br />
          <Card elevation={2} style={{ padding: "2em" }}>
            <Typography variant="h5" style={{ fontWeight: "bold" }} color="secondary">
              <Link to={`/gym/${course.gym._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                {course.gym.name}
              </Link>
            </Typography>
            <i> { course.gym.address }</i> <br />
            <hr className="mini-hr" />
            <i>
              {course.gym.description}
            </i>
            <br /><br /><br />

            <b> +{ course.gym.phoneNumber }</b>
            <div style={{ textAlign: "right" }}>
              <Button href="tel:+49123456789" variant="contained" color="secondary">
                <i className="fas fa-phone" style={{ marginRight: "1em" }} />
                Call
              </Button>
            </div>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h5" style={{ marginBottom: "1em", fontWeight: "bold" }}>
            Reviews
          </Typography>
          <hr />
          <Paper style={{ padding: "2em", backgroundColor: "#eee" }}>
            <Typography variant="h6">Reviews</Typography>
            <br />
            <Paper style={{ padding: "1em" }}>
              <StarWidget rating={4.1} />
              <small>150 people reviewed this Course!</small>
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
                      title={review.username}
                      subheader={review.dateAdded}
                  />
                  <div style={{ textAlign: "center" }}>
                    <StarWidget rating={review.rating} />
                  </div>
                  <p><b>{review.title}</b></p>
                  <p>{review.description}</p>
                </Paper>
            );
          })}
        </Grid>
      </Grid>
    </ChonkySpinner>
  );
};

export default CourseViewPage;
