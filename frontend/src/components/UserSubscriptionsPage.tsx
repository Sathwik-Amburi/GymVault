import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";

import { Item } from "../models/allModels";
import SubscriptionEntry from "./widgets/SubscriptionEntry";

const UserSubscriptionsPage: FC = () => {
  const [activeItems, setActiveItems] = useState<Item[]>([
    {
      _id: "1",
      gymName: "ZHS Hochschulsport",
      courseName: "Yoga for Beginners",
      type: "course",
      "address": "Connollystraße 32, Munich",
      description: "A basic course variating over Hatha Yoga, and meditation practices. Unlike the more static and strengthening Hatha yoga style, a Vinyasa class is very dynamic.  The physical exercises, the so-called asanas, are not practised individually, but are strung together in flowing movements. The class is very calm and relaxed, and the students are able to focus on the breath and the body.",
      price: -1,
      options: [],
  
      fgColor: "",
      bgColor: "",
    },
    {
      _id: "2",
      gymName: "ZHS Hochschulsport",
      courseName: "Yoga for Beginners",
      type: "course",
      "address": "Connollystraße 32, Munich",
      description: "A basic course variating over Hatha Yoga, and meditation practices. Unlike the more static and strengthening Hatha yoga style, a Vinyasa class is very dynamic.  The physical exercises, the so-called asanas, are not practised individually, but are strung together in flowing movements. The class is very calm and relaxed, and the students are able to focus on the breath and the body.",
      price: -1,
      options: [],
  
      fgColor: "",
      bgColor: "",
    },
  ]);
  const [pastItems, setPastItems] = useState<Item[]>([
    {
      _id: "3",
      gymName: "ZHS Hochschulsport",
      courseName: "Yoga for Beginners",
      type: "course",
      "address": "Connollystraße 32, Munich",
      description: "A basic course variating over Hatha Yoga, and meditation practices. Unlike the more static and strengthening Hatha yoga style, a Vinyasa class is very dynamic.  The physical exercises, the so-called asanas, are not practised individually, but are strung together in flowing movements. The class is very calm and relaxed, and the students are able to focus on the breath and the body.",
      price: -1,
      options: [],
  
      fgColor: "",
      bgColor: "",
    },
  ]);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if(user) {
      console.log(user);
      ApiCalls.getSubscriptionsByUserId(user).then((res) => {
        console.log(res);
        let activeItems: Item[] = res.data.response.map((item: any) => {
          // TODO check if it's present
          return {
            _id: item._id,
            gymName: item.gymName,
            courseName: item.courseName,
            type: item.type,
            "address": item.address,
            description: item.description,
            price: item.price,
            options: item.options,
            fgColor: item.fgColor,
            bgColor: item.bgColor,
          } as Item;
        });
        let pastItems: Item[] = res.data.response.map((item: any) => {
          // TODO check if it's past
          return {
            _id: item._id,
            gymName: item.gymName,
            courseName: item.courseName,
            type: item.type,
            "address": item.address,
            description: item.description,
            price: item.price,
            options: item.options,
            fgColor: item.fgColor,
            bgColor: item.bgColor,
          } as Item;
        });
        setActiveItems(activeItems);
        setPastItems(pastItems);
      });
    }
  }, []);

  return (
    <>
      <div style={{
        height: "2em"
      }}></div>
      <Typography variant="h6" style={{fontWeight: "bold", color: "#00763D"}}>
      Your booking was successful.
      </Typography>
      <Typography style={{ color: "#00763D", marginBottom: "3em" }}>
        Below you can see your subscription. Click on it to copy your access identifier, and print the tickets if needed:
      </Typography>

      { activeItems.map((item) => {
        return (
          <SubscriptionEntry id={item._id} item={item} expired={false} />
        );
      }) }

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
          { pastItems.map((item) => {
            return (
              <SubscriptionEntry id={item._id} item={item} expired={true} />
            );
          })}
            
        </Grid>
      ) : null }
    </>
  );
};

export default UserSubscriptionsPage;
