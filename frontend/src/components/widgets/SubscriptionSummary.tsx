import { Grid, Paper, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import {
  Item,
  Option,
  Subscription,
  SubscriptionTypes,
} from "../../models/allModels";
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
      <Grid
        item
        md={6}
        xs={12}
        style={{
          borderRadius: "12px",
        }}
      >
        <Paper
          style={{
            backgroundColor: "#f00",
            color: "#fff",
            borderRadius: "12px",
            padding: "1.5em",
          }}
          onClick={() => {}}
        >
          <div style={{ minHeight: "100px" }}>
            <span style={{ fontWeight: "bold" }}>
              {toCleanSubscriptionTypeFormat(
                props.item.type as SubscriptionTypes
              )}
            </span>
            <table style={{ marginTop: "8px" }}>
              <tbody>
                <tr>
                  <td>
                    <Typography variant="subtitle1">
                      {!props.expired ? "From " : "Purchased "}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="subtitle1"
                      style={{ display: "inline", marginLeft: "4px" }}
                    >
                      {moment(props.subscription.purchaseDate)
                        .utc()
                        .format("DD/MM/YYYY")}
                    </Typography>
                    {props.item.type === SubscriptionTypes.SESSION_PASS && (
                      <Typography
                        variant="body1"
                        style={{ display: "inline", marginLeft: "4px" }}
                      >
                        <b>
                          {moment(props.subscription.purchaseDate)
                            .utc()
                            .format("HH:mm")}
                        </b>
                      </Typography>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography variant="subtitle1">
                      {!props.expired ? "To " : "Expired "}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      variant="subtitle1"
                      style={{ display: "inline", marginLeft: "4px" }}
                    >
                      {moment(props.subscription.expireDate!)
                        .utc()
                        .format("DD/MM/YYYY")}
                    </Typography>

                    {props.item.type === SubscriptionTypes.SESSION_PASS && (
                      <Typography
                        variant="body1"
                        style={{ display: "inline", marginLeft: "4px" }}
                      >
                        <b>
                          {moment(props.subscription.expireDate)
                            .utc()
                            .format("HH:mm")}
                        </b>
                      </Typography>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <span style={{ fontSize: "12px" }}>
              {props.item.type === SubscriptionTypes.DAY_PASS
                ? "Lasts 24 hours from purchase"
                : props.item.type === SubscriptionTypes.MONTHLY_PASS
                ? "Lasts 30 days from purchase"
                : props.item.type === SubscriptionTypes.YEARLY_PASS
                ? "Lasts 365 days from purchase"
                : props.item.type === SubscriptionTypes.SESSION_PASS
                ? "Lasts for the duration of a session"
                : null}
            </span>
          </div>
        </Paper>
      </Grid>
      {props.subscription.optionals.map((opt: Option) => (
        <Grid
          item
          md={6}
          xs={12}
          style={{
            borderRadius: "12px",
          }}
        >
          <Paper
            style={{
              backgroundColor: ColorGenerator.nameToColor(opt.name),
              color: "#fff",
              borderRadius: "12px",
              padding: "1.5em",
            }}
          >
            <div style={{ minHeight: "100px" }}>
              <span style={{ fontWeight: "bold" }}>{opt.name}</span>
              <br />
              <br />
              <span>{opt.description}</span>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default SubscriptionSummary;
