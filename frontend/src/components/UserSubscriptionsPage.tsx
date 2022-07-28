import { Container, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ApiCalls from "../api/apiCalls";

import { Item, Subscription, UserProfileDetails } from "../models/allModels";
import { setErrorAlert } from "../store/slices/errorAlertSlice";
import ChonkySpinner from "./widgets/ChonkySpinner";
import SubscriptionEntry from "./widgets/SubscriptionEntry";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const UserSubscriptionsPage: FC = () => {
  const dispatch = useDispatch();
  const [urlQuery, _] = useSearchParams();
  const newSubscription = urlQuery.get("highlight") != null;
  const [loading, setLoading] = useState<boolean>(true);
  const [activeItems, setActiveItems] = useState<[Item, Subscription][]>([]);
  const [pastItems, setPastItems] = useState<[Item, Subscription][]>([]);
  const [user, setProfile] = useState<UserProfileDetails>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Error while fetching user",
          })
        );
      });
  }, [token]);

  useEffect(() => {
    if (token) {
      ApiCalls.getSubscriptions(token)
        .then((res) => {
          let activeItems: [Item, Subscription][] = [];
          let pastItems: [Item, Subscription][] = [];

          res.data.response.forEach((obj: any) => {
            // TODO check if it's present
            let item: Item = {
              _id: obj._id,
              gymName: obj.gym.name,
              courseName: obj.course != null ? obj.course.name : "",
              type: obj.type,
              address: obj.gym.address,
              description:
                obj.course != null
                  ? obj.course.description
                  : obj.gym.description,
              price: obj.price,
              optionals: obj.optionals,
              fgColor: obj.fgColor,
              bgColor: obj.bgColor,
            } as Item;
            let subscription: Subscription = {
              userId: obj.userId,
              gymId: obj.gym._id,
              courseId: obj.courseId,
              name: obj.course != null ? obj.course.name : obj.gym.name,
              type: obj.type,
              optionals: obj.optionals,
              price: obj.price,
              purchaseDate: obj.purchaseDate,
              expireDate: obj.expireDate,
              ticketSecret: obj.ticketSecret,
              _id: obj._id,
            };
            if (new Date(obj.expireDate) > new Date()) {
              console.log(obj.expireDate + " > " + new Date().toISOString());
              activeItems.push([item, subscription]);
            } else {
              pastItems.push([item, subscription]);
            }
          });

          setActiveItems(activeItems);
          setPastItems(pastItems);
          setLoading(false);
        })
        .catch((err) => {
          UnifiedErrorHandler.handle(err);
          dispatch(
            setErrorAlert({
              showError: true,
              errorMessage: "Error while fetching subscription",
            })
          );
        });
    } else {
      dispatch(
        setErrorAlert({
          showError: true,
          errorMessage: "Error. You are not logged in",
        })
      );
    }
  }, [token]);

  return (
    <>
      <Container maxWidth="lg" style={{ padding: "3em" }}>
        <div
          style={{
            height: "2em",
          }}
        ></div>

        <Typography variant="h4" style={{ fontWeight: "bold" }} gutterBottom>
          My Tickets
        </Typography>
        <hr />

        {newSubscription ? (
          <>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", color: "#00763D" }}
            >
              Your booking was successful.
            </Typography>
            <Typography style={{ color: "#00763D", marginBottom: "3em" }}>
              Below you can see your subscription. Click on it to copy your
              access identifier, and print the tickets if needed:
            </Typography>
          </>
        ) : (
          activeItems.length > 0 && (
            <>
              <Typography
                variant="h6"
                style={{ fontWeight: "bold", color: "#555" }}
              >
                Active Subscriptions
              </Typography>
              <Typography style={{ color: "#555", marginBottom: "3em" }}>
                Below you can see your subscriptions. Click on them to copy your
                access identifier, and print the tickets if needed:
              </Typography>
            </>
          )
        )}

        <ChonkySpinner loading={loading}>
          {activeItems.length > 0 ? (
            activeItems.map((item) => {
              return (
                <>
                  <SubscriptionEntry
                    item={item[0]}
                    subscription={item[1]}
                    expired={false}
                    user={user}
                  />
                </>
              );
            })
          ) : (
            <>
              <Container
                maxWidth="lg"
                style={{ padding: "2em", textAlign: "center" }}
              >
                <div className="twrapper">
                  <i
                    className="fa-solid fa-ticket"
                    style={{ fontSize: "80px", marginBottom: "4vh" }}
                  ></i>
                  <div className="typing-demo">No Active Subscriptions.</div>
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
            </>
          )}
        </ChonkySpinner>
      </Container>
      {pastItems.length > 0 ? (
        <div
          style={{
            padding: "3em",
            margin: "3em 0 0 0",
            backgroundColor: "#555",
            width: "100%",
          }}
        >
          <Container maxWidth="lg" style={{ padding: "3em" }}>
            <Grid container maxWidth="lg">
              <Grid item xs={12} style={{ color: "white" }}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Expired Subscriptions
                </Typography>
                <Typography variant="body1">In memoriam</Typography>
              </Grid>
              {pastItems.map((i: [Item, Subscription]) => {
                let item = i[0];
                let subscription = i[1];
                return (
                  <SubscriptionEntry
                    item={item}
                    subscription={subscription}
                    expired={true}
                    user={user}
                  />
                );
              })}
            </Grid>
          </Container>
        </div>
      ) : null}
    </>
  );
};

export default UserSubscriptionsPage;
