
import { Grid, Paper, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { Item, Option, Subscription, SubscriptionTypes } from "../../models/allModels";
import { toCleanSubscriptionTypeFormat } from "../../api/utils/formatters"; 

type SsProps = {
  shown: boolean;
  item: Item;
  subscription: Subscription;
  expired: boolean;
};

const SubscriptionSummary: FC<SsProps> = (props) => {

  return (
    <Grid item md={6} xs={12} style={{ display: props.shown ? "none" : "block" }}>
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
                { toCleanSubscriptionTypeFormat(props.item.type as SubscriptionTypes) }
              </span>
              <br /><br />
              <span>
                { props.item.type === SubscriptionTypes.DAY_PASS ? 
                    "Lasts 24 hours from purchase" :
                  props.item.type === SubscriptionTypes.MONTHLY_PASS ?
                    "Lasts 30 days from purchase" :
                  props.item.type === SubscriptionTypes.YEARLY_PASS ?
                    "Lasts 365 days from purchase"
                  : null
                  })
              </span>
            </div>
          </Paper>
          { props.subscription.optionals.map((opt: Option) => (
            <Paper style={{
              backgroundColor:  "#005",
              color:            "#fff",
              borderRadius:     "12px",
              padding:          "1.5em",
              margin:           "1em"
            }}>
              <div style={{ minHeight: "100px"  }}>
                <span style={{ fontWeight: "bold" }}>
                  { opt.name }
                </span>
                <br /><br />
                <span>
                  { opt.description }
                </span>
              </div>
            </Paper>
          ))}
          </Grid>
        { /* ....... */ }
        <div>
          <table style={{border: "none", width: "100%"}}>
            <tbody>
              <tr>
                <td>            
                  <Typography variant="body1">
                    { !props.expired ? "From " : "Purchased on "}
                  </Typography>
                </td>
                <td>
                  <Typography variant="h6">
                    { new Date(props.subscription.purchaseDate!).toLocaleDateString() }
                  </Typography>
                </td>
                <td style={{textAlign: "right"}}>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    €{props.subscription.price}
                  </Typography> 
                </td>
              </tr>
              <tr>
                <td>                  
                  <Typography variant="body1">
                    { !props.expired ? "To " : "Expired on "}
                  </Typography>
                </td>
                <td>
                  <Typography variant="h6">
                    { new Date(props.subscription.expireDate!).toLocaleDateString() }
                  </Typography>
                </td>
                <td style={{textAlign: "right"}}>
                  <Typography variant="body1">
                    Total paid
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Grid>
  );
};

export default SubscriptionSummary;
