import { Button, Grid, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Item, Subscription } from "../../models/allModels";
import SecretDisplay from "./SecretDisplay";
import SubscriptionSummary from "./SubscriptionSummary";
import ReviewButton from "./reviewComponent/ReviewButton";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

type SsProps = {
  subscription: Subscription;
  item: Item;
  expired: boolean;
  user: any;
};

const SubscriptionEntry: FC<SsProps> = (props) => {
  const navigate = useNavigate();
  let [shownSecret, setShownSecret] = useState(false); // weird hack to prevent showing the secret if the subscription is expired
  if (props.expired) {
    // prevent showing the secret if the subscription is expired
    setShownSecret = () => {};
  }
  return (
    <Grid
      container
      style={{
        padding: "3em",
        marginTop: "3em",
        borderRadius: "20px",
        outline:"2px solid rgb(153, 153, 153)",
        backgroundColor: props.expired ? "#393939" : "#f4f4f4",
        color: props.expired ? "#fff" : "#000",
      }}
    >
      <Grid item xs={12}>
        <span style={{ float: "right", fontStyle: "italic" }}>
          <Typography variant="h5">
            <span style={{ color: "#999", fontSize: "40px" }}>
              {props.subscription.type === "DAY_PASS"
                ? "daily ticket"
                : props.subscription.type === "MONTHLY_PASS"
                ? "monthly pass"
                : props.subscription.type === "YEARLY_PASS"
                ? "yearly pass"
                : props.subscription.type === "SESSION_PASS"
                ? "session pass"
                : "generic ticket"}
            </span>
          </Typography>
        </span>
        <Typography
          variant="h4"
          style={{ fontWeight: "bold" }}
          sx={{
            "&:hover": {
              color: "#519DD9",
              cursor: "pointer",
              transition: "color 0.2s ease-out",
            },
          }}
          onClick={() => navigate(`/gym/${props.subscription.gymId}`)}
        >
          {props.item.gymName}
        </Typography>
        <span>{props.item.address}</span>
        <hr />
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        style={{ display: shownSecret ? "none" : "block" }}
      >
        <SubscriptionSummary
          item={props.item}
          subscription={props.subscription}
          shown={shownSecret}
          expired={props.expired}
        />
        <ReviewButton
          userId={props.subscription.userId}
          gymId={props.subscription.gymId}
          username={props.user.firstName}
          courseId={props.subscription.courseId}
        />
      </Grid>

      {/* Secret display */}
      <SecretDisplay
        id={`${props.subscription.userId}${props.subscription._id}`}
        shown={shownSecret}
        code={props.subscription.ticketSecret}
      />
      <Grid item md={6} xs={12} style={{ paddingLeft: "2em" }}>
        <Typography
          variant="h5"
          style={{ fontWeight: "bold" }}
          onClick={() => {
            props.item.courseName &&
              navigate(`/course/${props.subscription.courseId}`);
          }}
          sx={
            props.item.courseName
              ? {
                  "&:hover": {
                    color: "#D7053E",
                    cursor: "pointer",
                    transition: "color 0.2s ease-out",
                  },
                }
              : undefined
          }
        >
          {props.item.courseName !== "" ? (
            <>{props.item.courseName}</>
          ) : (
            <>Fixed-Time Subscription</>
          )}
        </Typography>
        {props.expired ? (
          <Typography variant="subtitle2" style={{ marginTop: "8px" }}>
            This subscription has{" "}
            <span style={{ fontWeight: "bold", color: "red" }}>expired</span>.
            <br />
            <br />{" "}
            <div style={{ display: "flex" }}>
              We hope you enjoyed your workout
              <FavoriteIcon style={{ marginLeft: "4px" }} color="error" />
            </div>
            Thank you for using GymVault
          </Typography>
        ) : (
          <Typography variant="subtitle2" style={{ marginTop: "8px" }}>
            This subscription is currently{" "}
            <span style={{ fontWeight: "bold", color: "green" }}>active</span>.
            Your access code is hidden, and can be revealed by using the button below. Once you have arrived to the
            location, please make sure to have your access code ready and
            provide it to the gym staff as they will need to verify it to grant
            you access. <br />
            <br />{" "}
            <div style={{ display: "flex" }}>
              Enjoy your workout{" "}
              <FavoriteIcon style={{ marginLeft: "4px" }} color="error" />
            </div>
          </Typography>
        )}

        <Button
          style={{
            float: "right",
            fontWeight: "bold",
            marginTop: "2em",
            display: props.expired ? "none" : "block",
          }}
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => setShownSecret(!shownSecret)}
        >
          {shownSecret ? (
            <>
              <i
                className="fa-solid fa-receipt"
                style={{ marginRight: "0.5em" }}
              ></i>
              Show Order Details
            </>
          ) : (
            <>
              <i
                style={{ marginRight: "0.5em" }}
                className="fa-solid fa-wand-magic-sparkles"
              ></i>
              Reveal Access Code
            </>
          )}
        </Button>
        <Grid item xs={12}>
          <table style={{ border: "none", width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    €{props.subscription.price}
                  </Typography>
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <Typography variant="body1">Total paid</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SubscriptionEntry;
