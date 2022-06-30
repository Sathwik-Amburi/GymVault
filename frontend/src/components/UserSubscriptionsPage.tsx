import { Grid, Paper, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Item, Option } from "../models/allModels";
import PurchaseCart from "./widgets/PurchaseCart";
import PurchaseGrid from "./widgets/PurchaseCart";
import SecretDisplay from "./widgets/SecretDisplay";

const UserSubscriptionsPage: FC = () => {
  const [shownSecret, setShownSecret] = useState("");
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
          <Grid container style={{
            padding: "3em",
            marginTop: "3em",
            borderRadius: "20px",
            backgroundColor: "#ccc"
          }}
          onClick={() => setShownSecret((item._id === shownSecret ? "" : item._id))}>
            <Grid item xs={12}>
              <span style={{float: "right"}}>
                <Typography variant="h5">
                  <span style={{fontWeight: "800", color: "#999"}}>
                    {item.type}
                  </span>
                </Typography>
              </span>
              <Typography variant="h4" style={{fontWeight: "bold" }}>{item.gymName}</Typography>
              <span>{item.address}</span>
              <hr />
            </Grid>
    
            <Grid item md={6} xs={12} style={{ display: (shownSecret === item._id) ? "none" : "block" }}>
              { /* ....... */ }
              <Grid item md={6} xs={12}
                style={{
                  borderRadius: "12px",
                  display: "flex",
                }}
              >
                <Paper style={{
                  backgroundColor:  "#f00",
                  color: "#fff",
                  borderRadius: "12px",
                  padding: "1.5em",
                  margin: "1em"
                }} onClick={() => {}}>
                  <div style={{ minHeight: "100px"  }}>
                    <span style={{ fontWeight: "bold" }}>
                      VIP Ticket
                    </span>
                    <br /><br />
                    <span>
                      Option Description
                    </span>
                  </div>
                </Paper>

                <Paper style={{
                  backgroundColor:  "#005",
                  color:            "#fff",
                  borderRadius:     "12px",
                  padding:          "1.5em",
                  margin:           "1em"
                }} onClick={() => {}}>
                  <div style={{ minHeight: "100px"  }}>
                    <span style={{ fontWeight: "bold" }}>
                      Equipment Rental
                    </span>
                    <br /><br />
                    <span>
                      Option Description
                    </span>
                  </div>
                </Paper>
                
              </Grid>
              { /* ....... */ }
              <div>
                <table style={{border: "none", width: "100%"}}>
                  <tr>
                    <td>                  
                      <Typography variant="body1">
                        From
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="h6">
                        01.01.1970
                      </Typography>
                    </td>
                    <td style={{textAlign: "right"}}>
                      <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        €150
                      </Typography> 
                    </td>
                  </tr>
                  <tr>
                    <td>                  
                      <Typography variant="body1">
                        To
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="h6">
                        01.01.1970
                      </Typography>
                    </td>
                    <td style={{textAlign: "right"}}>
                      <Typography variant="body1">
                        Total paid
                      </Typography>
                    </td>
                  </tr>
                </table>
              </div>
            </Grid>
            
            { /* Secret display */ }
            <SecretDisplay id={item._id} shown={shownSecret} code="ASDFG-HJKLA" />
            <Grid item md={6} xs={12} style={{ paddingLeft: "2em" }}>
              <Typography variant="h5" style={{fontWeight: "bold" }}>{item.courseName}</Typography>
              <hr />
              <Typography variant="body2">{item.description}</Typography>
            </Grid>
          </Grid>
        );
      }) }

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
