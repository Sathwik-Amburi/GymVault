import {
  Button,
  Paper,
  Grid,
  Typography,
  Chip,
  CardHeader,
  Avatar,
} from "@mui/material";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { FC } from "react";
import {
  toCleanSubscriptionRange,
  toCleanSubscriptionTypeFormat,
} from "../../api/utils/formatters";
import { SubscriptionOffers } from "../../models/allModels";

interface PricingListProps {
  subscriptionOffers: SubscriptionOffers[];
}

const RecentReviews: FC<PricingListProps> = ({ subscriptionOffers }) => {
  return (
    <Grid>
      <Paper style={{ padding: "2em", backgroundColor: "white" }}>
        {subscriptionOffers.map((item, index) => {
          return (
            <div
              style={{
                fontSize: "14px",
                alignItems: "center",
                display: "flex",
                fontWeight: "bold",
              }}
              key={index}
            >
              <Grid container justifyContent={"space-between"}>
                <Grid item>
                  <PriceCheckIcon
                    fontSize="small"
                    color="success"
                    style={{ marginRight: "8px" }}
                  />
                  <span>
                    {toCleanSubscriptionTypeFormat(item.subscriptionType)}
                  </span>
                </Grid>
                <Grid item alignSelf={"end"}>
                  <span style={{ fontWeight: "bold" }}>
                    {item.subscriptionPrice} EUR
                  </span>
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Paper>
    </Grid>
  );
};

export default RecentReviews;
