import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Item, Option } from "../models/allModels";

const UserSubscriptionsPage: FC = () => {
  const [items, setItems] = useState<Item[]>([]);

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
      
      
      <Grid container style={{
        padding: "3em",
        borderRadius: "20px",
        backgroundColor: "#ccc"
      }}>
        <Grid item xs={12}>
          todo
        </Grid>
        
      </Grid>

      <Grid container style={{
        padding: "3em",
        marginTop: "3em",
        borderRadius: "20px",
        backgroundColor: "#ccc"
      }}>
        <Grid item xs={12}>
          todo
        </Grid>
        
      </Grid>

      <Grid container style={{
        backgroundColor: "#393939",
        color: "#C2C6CC",
        padding: "3em",
        marginTop: "3em",
        width: "100%",
        
      }}>
        <Grid item xs={12}>
          <Typography variant="h6" style={{fontWeight: "bold" }}>
            Expired Subscriptions
          </Typography>
          <Typography variant="body1">
            In memoriam
          </Typography>
        </Grid>
        <Grid container spacing={3} style={{
          padding: "3em",
          marginTop: "3em",
          borderRadius: "20px",
          backgroundColor: "#ccc"
        }}>
          <Grid item xs={12}>
            todo
          </Grid>
          
        </Grid>
      </Grid>
    </>
  );
};

export default UserSubscriptionsPage;
