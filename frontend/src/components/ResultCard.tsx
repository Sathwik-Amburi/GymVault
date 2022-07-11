import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import image from "../images/progym.jpg";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import { Gym } from "../models/allModels";
import { useNavigate } from "react-router-dom";
import {
  toCleanSubscriptionTypeFormat,
  toCleanSubscriptionRange,
} from "../api/utils/formatters";
import ApiCalls from "../api/apiCalls";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

interface ResultCardProps {
  gym: Gym;
}

const ResultCard: FC<ResultCardProps> = ({ gym }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/gym/${gym._id}`);
  };
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    ApiCalls.getGymOrCourseRating(gym._id)
      .then((res) => setRating(res.data.response))
      .catch((err) => UnifiedErrorHandler.handle(err, "Cannot get gym rating"));
  }, [gym]);

  return (
    <>
      <Grid container onClick={handleCardClick}>
        <Card
          sx={{
            maxWidth: 345,
            ":hover": {
              boxShadow: 20,
            },
          }}
        >
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
                {gym.name}
              </Typography>
              <StarIcon fontSize="small" sx={{ color: "#faec2d" }} />
              {rating ? (
                <Typography>{rating.toFixed(1)}</Typography>
              ) : (
                <Typography variant="caption">no rating yet</Typography>
              )}
            </Grid>
            <Grid container direction={"row"} alignItems="center">
              <LocationOnIcon
                fontSize="small"
                sx={{ color: "#black" }}
                style={{ marginRight: "4px" }}
              />
              <Typography variant="body2" color="text.secondary">
                {gym.address}
              </Typography>
            </Grid>
            <Grid container direction={"row"} alignItems="start">
              <PaymentIcon
                fontSize="small"
                sx={{ color: "#black" }}
                style={{ marginRight: "4px" }}
              />
              <div>
                {gym.subscriptionOffers.map((item, index) => {
                  return (
                    <div style={{ fontSize: "12px" }} key={index}>
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
