import {
  Button,
  Paper,
  Grid,
  Typography,
  Avatar,
  CardHeader,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Course } from "../models/allModels";
import StarWidget from "./widgets/StarWidget";
import Lightbox from "./widgets/Lightbox";
import image from "../images/progym.jpg";
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
        setCourse(res.data.response);
        setLoading(false);
      }).catch((err) => UnifiedErrorHandler.handle(err, "TODO: The course you're seeing does not exist in the database"));

    ApiCalls.getReviewsById(fid)
        .then((res) => {
          console.log(res.data);
          setReviews(res.data.response);
        }).catch((err) => UnifiedErrorHandler.handle(err, "The review does not exist in the database"));
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
            states={[
              "https://www.climbing.com/wp-content/uploads/2016/10/7_gn-copyjpg.jpg",
              image,
            ]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <h1>{course.name}</h1>
          <hr />
          <p>{course.description}</p>
          <br />
          { course.gym != null && <>
            <p> <Link to={`/gym/${course.gym._id}`}>{course.gym.name}</Link></p>
            <p> { course.gym.address }</p>   
          </>}
          <br />
          <p>Tel: +49 {course.phoneNumber}</p>

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
        <Grid item md={5} xs={12}>
          <h1>See what other people say about this course!</h1>
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