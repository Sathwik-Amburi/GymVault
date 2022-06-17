import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import image from "../images/progym.jpg";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import { Gym, Subscription } from "../models/allModels";
import { useNavigate } from "react-router-dom";
import ApiCalls from "../api/apiCalls";

interface ResultCardProps {
  gym: Gym;
}

const ResultCard: FC<ResultCardProps> = ({ gym }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/gym/${gym._id}`);
  };

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [displayPrice, setDisplayPrice] = useState<number>();

  const getMonthlySubscriptionPrice = () => {
    setDisplayPrice(subscriptions[0].price);
  };

  useEffect(() => {
    ApiCalls.getSubscriptionsByGymId(gym._id)
      .then((res) => {
        setSubscriptions(res.data);
        getMonthlySubscriptionPrice();
      })
      .catch((err) => console.log(err.message));
  }, [gym._id, subscriptions]);

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
              <Typography variant="body2" color="ActiveCaption">
                {displayPrice} EUR/Month
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default ResultCard;
