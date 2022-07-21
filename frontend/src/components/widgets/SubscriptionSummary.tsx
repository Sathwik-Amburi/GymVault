
import { Grid, Paper, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { Item, Option, Subscription, SubscriptionTypes } from "../../models/allModels";
import { toCleanSubscriptionTypeFormat } from "../../api/utils/formatters"; 
import ColorGenerator from "./utilities/ColorGenerator";
import moment from "moment";

type SsProps = {
  shown: boolean;
  item: Item;
  subscription: Subscription;
  expired: boolean;
};

const SubscriptionSummary: FC<SsProps> = (props) => {
  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}
        style={{
          borderRadius: "12px",
      }}>
        <Paper style={{
          backgroundColor:  "#f00",
          color: "#fff",
          borderRadius: "12px",
          padding: "1.5em"
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
      </Grid>
      { props.subscription.optionals.map((opt: Option) => (
        <Grid item md={6} xs={12}
          style={{
            borderRadius: "12px",
        }}>
          <Paper style={{
            backgroundColor:  ColorGenerator.nameToColor(opt.name),
            color:            "#fff",
            borderRadius:     "12px",
            padding:          "1.5em"
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
        </Grid>
        ))}
      <Grid item xs={12}>
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
                  { moment(props.subscription.purchaseDate).format("DD/MM/YYYY") }
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
                  { moment(props.subscription.expireDate!).format("DD/MM/YYYY") }
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
      </Grid>
    </Grid>
  );
};

export default SubscriptionSummary;
