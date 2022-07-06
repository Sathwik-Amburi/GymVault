
import { Grid, Paper, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { Item, Subscription,UserProfileDetails } from "../../models/allModels";
import SecretDisplay from "./SecretDisplay";
import SubscriptionSummary from "./SubscriptionSummary";
import ReviewButton from "./reviewComponent/ReviewButton";

type SsProps = {
  subscription: Subscription;
  item: Item;
  expired: boolean;
  user: any;
};

const SubscriptionEntry: FC<SsProps> = (props) => {
  let [shownSecret, setShownSecret] = useState(false); // weird hack to prevent showing the secret if the subscription is expired
  if (props.expired) {
    // prevent showing the secret if the subscription is expired
    setShownSecret = () => {};
  }
  return (
    <Grid container style={{
        padding: "3em",
        marginTop: "3em",
        borderRadius: "20px",
        backgroundColor: ( props.expired ? "#555" : "#ccc" ),
        color: ( props.expired ? "#fff" : "#000" ),
      }}
      onClick={() => setShownSecret(!shownSecret)}>
        <Grid item xs={12}>
          <span style={{float: "right"}}>
            <Typography variant="h5">
              <span style={{fontWeight: "800", color: "#999"}}>
                {props.subscription.type}
              </span>
            </Typography>
          </span>
          <Typography variant="h4" style={{fontWeight: "bold" }}>{props.item.courseName !== "" ? props.item.courseName : props.item.gymName}</Typography>
          <span>{props.item.address}</span>
          <hr />
        </Grid>

        <SubscriptionSummary item={props.item} subscription={props.subscription} shown={shownSecret} />
        
        { /* Secret display */ }
        <SecretDisplay id={`${props.subscription.userId}${props.subscription._id}`} shown={shownSecret} code="ASDFG-HJKLA" />
        <Grid item md={6} xs={12} style={{ paddingLeft: "2em" }}>
          { props.item.courseName !== "" ? (
            <>
              <Typography variant="h5" style={{fontWeight: "bold" }}>{props.item.courseName}</Typography>
              <hr />
            </>
          ) : null }
          <Typography variant="body2">{props.item.description}</Typography>
            <ReviewButton userId = {props.subscription.userId} gymId = {props.subscription.gymId} username = {props.user.firstName} />
        </Grid>
      </Grid>
  );
};

export default SubscriptionEntry;
