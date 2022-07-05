import { Button, Grid, Link, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiCalls from "../api/apiCalls";

import { Course, Item, Subscription } from "../models/allModels";
import ChonkySpinner from "./widgets/ChonkySpinner";
import SubscriptionEntry from "./widgets/SubscriptionEntry";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const UserSubscriptionsPage: FC = () => {
  const [urlQuery, _] = useSearchParams();
  const newSubscription = urlQuery.get("highlight") != null;
  const [loading, setLoading] = useState<boolean>(true);
  const [activeItems, setActiveItems] = useState<[Item,Subscription][]>([]);
  const [pastItems, setPastItems] = useState<[Item,Subscription][]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
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
            ticketSecret: "ASDFG-HJKLA",
            _id: obj._id,
          };
          if(obj.expireDate > new Date()) {
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
        Your subscriptions
        </Typography>
        <Typography style={{ color: "#555", marginBottom: "3em" }}>
          Below you can see your subscriptions. Click on them to copy your access identifier, and print the tickets if needed:
        </Typography>
      </>)}


      <ChonkySpinner loading={loading}>

        { (activeItems.length > 0) ?
          activeItems.map((item) => {
            return (
              <><SubscriptionEntry item={item[0]} subscription={item[1]} expired={false} /></>
            );
          }) : ( <>
            <Typography variant="h6" style={{fontWeight: "bold", textAlign: "center", marginTop: "6em"}}>
            No active subscriptions. 
              <Button variant="outlined" color="primary" style={{marginLeft: "1em"}} href="/">
                Get one?
              </Button>
            </Typography>
          </> )
        }
          

        { (pastItems.length > 0) ? (
          <Grid container style={{
            backgroundColor: "#393939",
            padding: "3em",
            marginTop: "3em",
            width: "100%",
          }}>
            <Grid item xs={12} style={{ color: "#C2C6CC" }}>
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
                <SubscriptionEntry item={item} subscription={subscription} expired={true}/>
              );
            })}
              
          </Grid>
        ) : null }
      </ChonkySpinner>
    </>
  );
};

export default UserSubscriptionsPage;
