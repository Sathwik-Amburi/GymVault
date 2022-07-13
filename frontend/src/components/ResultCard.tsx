import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC } from "react";
import image from "../images/progym.jpg";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Gym } from "../models/allModels";
import { useNavigate } from "react-router-dom";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { toCleanSubscriptionTypeFormat } from "../api/utils/formatters";

interface ResultCardProps {
  gym: Gym;
}

const ResultCard: FC<ResultCardProps> = ({ gym }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/gym/${gym._id}`);
  };

  return (
    <>
      <Grid container onClick={handleCardClick} style={{ cursor: "pointer" }}>
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
              {gym.rating.length > 0 ? (
                <Typography>
                  {gym.rating[0].rating.toFixed(2)} ({gym.rating[0].ratedBy})
                </Typography>
              ) : (
                <Typography variant="caption">no rating yet</Typography>
              )}
            </Grid>
            <Grid container direction={"row"} alignItems="center">
              <LocationOnIcon
                fontSize="small"
                sx={{ color: "red" }}
                style={{ marginRight: "4px" }}
              />
              <Typography variant="body2" color="text.secondary">
                {gym.address}
              </Typography>
            </Grid>
            <Grid>
              {gym.subscriptionOffers.map((item, index) => {
                return (
                  <div
                    style={{
                      fontSize: "12px",
                      alignItems: "center",
                      display: "flex",
                    }}
                    key={index}
                  >
                    <Grid container justifyContent={"space-between"}>
                      <Grid item style={{ display: "flex" }}>
                        <PriceCheckIcon
                          fontSize="small"
                          color="success"
                          style={{ marginRight: "4px" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {toCleanSubscriptionTypeFormat(item.subscriptionType)}
                        </Typography>
                      </Grid>
                      <Grid item alignSelf={"end"}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          style={{ fontWeight: "bold" }}
                        >
                          {item.subscriptionPrice} EUR
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
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
