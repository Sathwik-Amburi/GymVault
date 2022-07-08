import { Button, Container, Grid, Link, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiCalls from "../api/apiCalls";

import {Course, Item, Subscription, UserProfileDetails} from "../models/allModels";
import ChonkySpinner from "./widgets/ChonkySpinner";
import SubscriptionEntry from "./widgets/SubscriptionEntry";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const UserSubscriptionsPage: FC = () => {
  const [urlQuery, _] = useSearchParams();
  const newSubscription = urlQuery.get("highlight") != null;
  const [loading, setLoading] = useState<boolean>(true);
  const [activeItems, setActiveItems] = useState<[Item,Subscription][]>([]);
  const [pastItems, setPastItems] = useState<[Item,Subscription][]>([]);
  const [user, setProfile] = useState<UserProfileDetails>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    ApiCalls.getUserProfile(token)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => UnifiedErrorHandler.handle(err, "TODO: The user you're seeing does not exist in the database"));
  }, []);


  useEffect(() => {
    if(token) {
      ApiCalls.getSubscriptions(token).then((res) => {
        console.log(res);
        let activeItems: [Item,Subscription][] = [];
        let pastItems: [Item,Subscription][] = [];

        res.data.response.forEach((obj: any) => {
          // TODO check if it's present
          let item: Item = {
            _id: obj._id,
            gymName: obj.gym.name,
            courseName: (obj.course != null) ? obj.course.name : "",
            type: obj.type,
            address: obj.gym.address,
            description: (obj.course != null) ? obj.course.description : obj.gym.description,
            price: obj.price,
            options: obj.options,
            fgColor: obj.fgColor,
            bgColor: obj.bgColor,
          } as Item;
          let subscription: Subscription = {
            userId: obj.userId,
            gymId: obj.gym._id,
            // TODO: where's courseId??
            name: (obj.course != null) ? obj.course.name : obj.gym.name,
            type: obj.type,
            options: obj.options,
            price: obj.price,
            purchaseDate: obj.purchaseDate,
            expireDate: obj.expireDate,
            ticketSecret: obj.ticketSecret,
            _id: obj._id,
          };
          if(new Date(obj.expireDate) > new Date()) {
            console.log(obj.expireDate + " > " + new Date().toISOString());
            activeItems.push([item, subscription]);
          } else {
            pastItems.push([item, subscription]);
          }
        });
        
        setActiveItems(activeItems);
        setPastItems(pastItems);
        setLoading(false);
      }).catch((err) => UnifiedErrorHandler.handle(err, "TODO: The subscription you're seeing does not exist in the database"));
    } else {
      alert("You are not logged in");
    }
  }, []);

  return (
    <>
      <Container maxWidth="lg" style={{ padding: "3em" }}>
        <div style={{
          height: "2em"
        }}></div>
        { newSubscription ? ( <>
          <Typography variant="h6" style={{fontWeight: "bold", color: "#00763D"}}>
          Your booking was successful.
          </Typography>
          <Typography style={{ color: "#00763D", marginBottom: "3em" }}>
            Below you can see your subscription. Click on it to copy your access identifier, and print the tickets if needed:
          </Typography>
        </>) : ( <>
          <Typography variant="h6" style={{fontWeight: "bold", color: "#555"}}>
          Active Subscriptions
          </Typography>
          <Typography style={{ color: "#555", marginBottom: "3em" }}>
            Below you can see your subscriptions. Click on them to copy your access identifier, and print the tickets if needed:
          </Typography>
        </>)}


        <ChonkySpinner loading={loading}>

          { (activeItems.length > 0) ?
            activeItems.map((item) => {
              return (
                <><SubscriptionEntry item={item[0]} subscription={item[1]} expired={false} user={user}  /></>
              );
            }) : ( <>
              <Container maxWidth="lg" style={{ padding: "2em", textAlign: "center" }}>
                <Typography variant="h5" style={{marginTop: "6em"}}>
                  No active subscriptions :( 
                </Typography>
                <br />
                <Button variant="outlined" color="primary" style={{marginLeft: "1em"}} href="/">
                  Get one?
                </Button>
              </Container>
            </> )
          }
            
        </ChonkySpinner>
      </Container>
      { (pastItems.length > 0) ? (
        <Container style={{ 
          padding: "3em",
          margin: "3em 0 0 0",
          maxWidth: "30000%",
          backgroundColor: "#555",
          width: "100%",
        }}>
          <Container maxWidth="lg" style={{ padding: "3em" }}>
            <Grid container >
              <Grid item xs={12} style={{ color: "white" }}>
                <Typography variant="h6" style={{fontWeight: "bold" }}>
                  Expired Subscriptions
                </Typography>
                <Typography variant="body1">
                  In memoriam
                </Typography>
              </Grid>
              { pastItems.map((i: [Item, Subscription]) => {
                let item = i[0];
                let subscription = i[1];
                return (
                  <SubscriptionEntry item={item} subscription={subscription} expired={true} user={user}/>
                );
              })}
                
            </Grid>
          </Container>
        </Container>
      ) : null }
    </>
  );
};

export default UserSubscriptionsPage;
