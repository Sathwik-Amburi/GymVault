import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { FC } from "react";
import image from "../images/progym.jpg";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Course } from "../models/allModels";
import { useNavigate } from "react-router-dom";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { toCleanSubscriptionTypeFormat } from "../api/utils/formatters";
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
                {course.name}
              </Typography>
              <StarIcon fontSize="small" sx={{ color: "#faec2d" }} />
              {course.rating.length > 0 ? (
                <Typography>
                  {course.rating[0].rating.toFixed(1)} (
                  {course.rating[0].ratedBy})
                </Typography>
              ) : (
                <Typography variant="caption">no rating yet</Typography>
              )}
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
                sx={{ color: "red" }}
                style={{ marginRight: "4px" }}
              />
              <Typography variant="body2" color="text.secondary">
                {course.gymId.address}
              </Typography>
            </Grid>
            <Grid>
              {course.subscriptionOffers.map((item, index) => {
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
