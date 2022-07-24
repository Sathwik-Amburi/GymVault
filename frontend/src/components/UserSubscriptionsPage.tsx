import { Button, Container, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ApiCalls from "../api/apiCalls";

import { Item, Subscription, UserProfileDetails } from "../models/allModels";
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
  }, [token]);


  useEffect(() => {
    if(token) {
      ApiCalls.getSubscriptions(token).then((res) => {
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
            optionals: obj.optionals,
            fgColor: obj.fgColor,
            bgColor: obj.bgColor,
          } as Item;
          let subscription: Subscription = {
            userId: obj.userId,
            gymId: obj.gym._id,
            courseId:obj.courseId,
            name: (obj.course != null) ? obj.course.name : obj.gym.name,
            type: obj.type,
            optionals: obj.optionals,
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
  }, [token]);

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
          <Typography variant = 'h3' style={{fontWeight: "bold", color: "#555"}}>
            My Tickets
          </Typography>
          <hr />
        </>)}


        <ChonkySpinner loading={loading}>

          { (activeItems.length > 0) ?
            activeItems.map((item) => {
              return (
                <>
                  <Typography variant="h6" style={{fontWeight: "bold", color: "#555"}}>
                    Active Subscriptions
                  </Typography>
                  <Typography style={{ color: "#555", marginBottom: "3em" }}>
                    Below you can see your subscriptions. Click on them to copy your access identifier, and print the tickets if needed:
                  </Typography>

                  <SubscriptionEntry item={item[0]} subscription={item[1]} expired={false} user={user}  /></>
              );
            }) : ( <>
              <Container maxWidth="lg" style={{ padding: "2em", textAlign: "center" }}>
                <div className="wrapper">
                  <div className="preloader">
                    <svg className="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128"
                         width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
                      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
                        <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                          <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"/>
                          <circle cx="43" cy="111" r="13"/>
                          <circle cx="102" cy="111" r="13"/>
                        </g>
                        <g className="cart__lines" stroke="currentColor">
                          <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                                    strokeDasharray="338 338" strokeDashoffset="-338"/>
                          <g className="cart__wheel1" transform="rotate(-90,43,111)">
                            <circle className="cart__wheel-stroke" cx="43" cy="111" r="13"
                                    strokeDasharray="81.68 81.68" strokeDashoffset="81.68"/>
                          </g>
                          <g className="cart__wheel2" transform="rotate(90,102,111)">
                            <circle className="cart__wheel-stroke" cx="102" cy="111" r="13"
                                    strokeDasharray="81.68 81.68" strokeDashoffset="81.68"/>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="typing-demo">
                    No Active Subscriptions.😢
                  </div>
                </div>
                <br />
                <div className="button-box">
                <a href="/">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Get one?
                </a>
                </div>
                {/*<Button className = "get-one" variant="outlined" color="primary" style={{marginLeft: "1em"}} href="/">*/}

                {/*</Button>*/}
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
          <Grid container>
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
      ) : null }
    </>
  );
};

export default UserSubscriptionsPage;
