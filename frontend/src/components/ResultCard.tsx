import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import image from "../images/progym.jpg";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import { Gym } from "../models/allModels";
import { useNavigate } from "react-router-dom";
import { toCleanSubscriptionTypeFormat } from "../api/utils/formatters";
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

  useEffect(() => {
    ApiCalls.getGymOrCourseRating(gym._id)
      .then((res) => {})
      .catch((err) => UnifiedErrorHandler.handle(err, "Cannot get gyms"));
  }, []);

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
                {gym.name}
              </Typography>
              <StarIcon fontSize="small" sx={{ color: "#faec2d" }} />
              <Typography>4.0</Typography>
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
            <Grid container direction={"row"} alignItems="center">
              <PaymentIcon
                fontSize="small"
                sx={{ color: "#black" }}
                style={{ marginRight: "4px" }}
              />
              {gym.subscriptionOffers.map((item) => {
                return (
                  <Typography variant="body2" color="ActiveCaption">
                    {toCleanSubscriptionTypeFormat(item.subscriptionType)}:{" "}
                    {item.subscriptionPrice} EUR/Month
                  </Typography>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ResultCard;
