import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

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
    /*TODOApiCalls.getAllGyms()
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err.message));
      */
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
    </>
  );
};

export default UserSubscriptionsPage;
