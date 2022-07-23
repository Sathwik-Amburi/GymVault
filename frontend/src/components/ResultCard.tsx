import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";
import image from "../images/progym.jpg";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Gym, SubscriptionOffers } from "../models/allModels";
import { useNavigate } from "react-router-dom";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { toCleanSubscriptionTypeFormat } from "../api/utils/formatters";
import DiscountIcon from "@mui/icons-material/Discount";

interface ResultCardProps {
  gym: Gym;
}

const ResultCard: FC<ResultCardProps> = ({ gym }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/gym/${gym._id}`);
  };

  const calculateHighestDiscount = (
    subscriptionOffers: SubscriptionOffers[]
  ): number => {
    const highestDiscount = Math.max(
      ...subscriptionOffers.map((item) => item.discount)
    );
    return highestDiscount;
  };

  return (
    <>
      <Grid container onClick={handleCardClick} style={{ cursor: "pointer" }}>
        <Card
          sx={{
            maxWidth: 345,
            ":hover": {
              boxShadow: 10,
            },
            borderColor: "#519DD9",
            borderRadius: "18px",
            position: "relative",
          }}
        >
          {gym.subscriptionOffers.filter((item) => item.discount !== 0)
            .length != 0 ? (
            <Chip
              icon={<DiscountIcon fontSize="small" />}
              label={
                <span>
                  Up to{" "}
                  <strong>
                    {calculateHighestDiscount(gym.subscriptionOffers)}%
                  </strong>{" "}
                  off !
                </span>
              }
              variant="filled"
              color="primary"
              style={{
                position: "absolute",
                top: "15px",
                left: "15px",
                color: "white",
                padding: "0.6em",
              }}
            />
          ) : null}

          <CardMedia
            component="img"
            alt="gym picture"
            height="250"
            image={gym.images ? gym.images[0] : image}
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
                      <Grid item alignSelf={"end"} display="flex">
                        {item.discount ? (
                          <>
                            <Typography
                              variant="body2"
                              color="red"
                              style={{ textDecoration: "line-through" }}
                            >
                              {item.subscriptionPrice} &euro;
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              style={{
                                textDecoration: "none",
                                marginLeft: "4px",

                                fontWeight: "bold",
                              }}
                            >
                              {(
                                (item.subscriptionPrice *
                                  (100 - item.discount)) /
                                100
                              ).toFixed(2)}{" "}
                              &euro;
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            style={{ fontWeight: "bold" }}
                          >
                            {item.subscriptionPrice} &euro;
                          </Typography>
                        )}
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
