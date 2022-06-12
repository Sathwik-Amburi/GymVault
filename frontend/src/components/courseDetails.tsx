import { Button, Paper, Grid, Typography, Chip, Avatar, CardHeader } from "@mui/material";
import { Box, Container, padding } from "@mui/system";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Course } from "../models/allModels";
import StarWidget from "./widgets/StarWidget";
import Lightbox from "./widgets/Lightbox";
import { useParams } from "react-router-dom";


const CourseViewPage: FC = () => {
    const { id } = useParams();
    const [reviewSort, setReviewSort] = useState("newest");
    const [course, setCourse] = useState<Course>({
        name: "Yoga Course",
        phoneNumber: 1760000000,
        _id: "0"
    });

    useEffect(() => {
        let fid = (id != null) ? id : ""; // empty id will gracefully fail anyway
        ApiCalls.getCourse(fid)
            .then((res) => {
                console.log(res.data);
                setCourse(res.data.response);
            })
            .catch((err) => {
                console.log(err);
                alert("TODO: The course you're seeing does not exist in the database");
            });
    }, []);

    /* MOCK - need own schema */
    let reviews = [
        {
            fullname: "Carter",
            rating: 4,
            comment: "This is a great course. I find the atmosphere very calming and relaxing.",
            course: "0",
            user: "0",
            _id: "0"
        },
    ];

    return (
        <>
            <Grid container spacing={6}>
                <Grid item xs={12} md={6} spacing={2}>
                    <h1>Yoga Course</h1>
                    <Lightbox />
                </Grid>
                <Grid item md={5} xs={12}>
                    <h1>See what other people say about this course!</h1>
                    <Paper style={{ padding: "2em", backgroundColor: "#eee" }}>
                        <Typography variant="h6">Reviews</Typography>
                        <br />
                        <Paper style={{ padding: "1em" }}>
                            <StarWidget rating={4.1} />
                            <small>
                                150 people reviewed this Course!
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
                <Grid item xs={12} md={6}>
                    <h1>{course.name}</h1>
                    <hr />
                    <p>Course description (needs mongo schema)</p>
                    <br />
                    <p>Tel: +49 {course.phoneNumber}</p>
                    <p>Address (needs mongo schema)</p>

                    <div style={{ textAlign: "right" }}>
                        <Button variant="contained" color="success" href={"/buy/" + course._id}>
                            Buy Subscription
                        </Button>
                    </div>

                </Grid>
            <br />
            <br />
            <Grid>
                < Lightbox />
            </Grid>
            <br />
            <br />
            <Box padding={3}>
                <Button variant={reviewSort == "newest" ? "contained" : undefined}
                        onClick={() => setReviewSort("newest")}
                >
                    Most Recent
                </Button>
                <Button variant={reviewSort == "best" ? "contained" : undefined}
                        onClick={() => setReviewSort("best")}
                >
                    Most Positive
                </Button>
                <Button variant={reviewSort == "worst" ? "contained" : undefined}
                        onClick={() => setReviewSort("worst")}
                >
                    Most Critical
                </Button>
            </Box>
            <Grid container spacing={3}>
                <Grid item md={3} xs={12}>
                    {reviews.map(review => {
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
                    })}
                </Grid>

            </Grid>
            <Box padding={10} style={{ textAlign: "center" }}>
                TODO: shall we add a "dumb" Related Courses view here in the future?
            </Box>
        </>
    );
};

export default CourseViewPage;
