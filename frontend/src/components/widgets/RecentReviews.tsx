import {Button, Paper, Grid, Typography, Chip, CardHeader, Avatar} from "@mui/material";
import { FC, useState } from "react";
import StarWidget from "./StarWidget";

type Props = {
    rating: number;
};

const RecentReviews: FC<Props> = ({ rating }) => {
    return (
        <Grid>
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
    );
};

export default RecentReviews;