import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import image from "../images/progym.jpg";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import { Course, Gym, Subscription } from "../models/allModels";
import { useNavigate } from "react-router-dom";
import ApiCalls from "../api/apiCalls";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import {
  toCleanSubscriptionRange,
  toCleanSubscriptionTypeFormat,
} from "../api/utils/formatters";
import { StoreMallDirectoryTwoTone } from "@mui/icons-material";

interface ResultCardProps {
  course: Course;
}

const ResultCard: FC<ResultCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${course._id}`);
  };

  return (
    <>
      <Grid container onClick={handleCardClick}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt="gym picture"
            height="250"
            image={image}
          />
          <CardContent>
            <Grid container direction={"row"} alignItems="center">
              <Typography
                variant="h6"
                component="div"
                style={{ marginRight: "4px" }}
              >
                {course.name}
              </Typography>
              <StarIcon fontSize="small" sx={{ color: "#faec2d" }} />
              <Typography>4.0</Typography>
            </Grid>
            <Grid container direction={"row"} alignItems="center">
              <StoreMallDirectoryTwoTone
                fontSize="small"
                sx={{ color: "#black" }}
                style={{ marginRight: "4px" }}
              />
              <Typography variant="body2" color="text.secondary">
                {course.gymId.name}
              </Typography>
            </Grid>
            <Grid container direction={"row"} alignItems="center">
              <LocationOnIcon
                fontSize="small"
                sx={{ color: "#black" }}
                style={{ marginRight: "4px" }}
              />
              <Typography variant="body2" color="text.secondary">
                {course.gymId.address}
              </Typography>
            </Grid>
            <Grid container direction={"row"} alignItems="start">
              <PaymentIcon
                fontSize="small"
                sx={{ color: "#black" }}
                style={{ marginRight: "4px" }}
              />
              <div>
                {course.subscriptionOffers.map((item) => {
                  return (
                    <div style={{ fontSize: "12px" }}>
                      <span>
                        {toCleanSubscriptionTypeFormat(item.subscriptionType)}:{" "}
                      </span>
                      <span style={{ fontWeight: "bold" }}>
                        {item.subscriptionPrice} EUR/
                        {toCleanSubscriptionRange(item.subscriptionType)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ResultCard;
