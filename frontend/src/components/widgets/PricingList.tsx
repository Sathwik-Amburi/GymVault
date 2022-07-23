import { Paper, Grid } from "@mui/material";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import { FC } from "react";
import { toCleanSubscriptionTypeFormat } from "../../api/utils/formatters";
import { SubscriptionOffers } from "../../models/allModels";

interface PricingListProps {
  subscriptionOffers: SubscriptionOffers[];
}

const PricingList: FC<PricingListProps> = ({ subscriptionOffers }) => {
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
                  {item.discount ?
                    <>
                      <span style={{ fontWeight: "bold", textDecoration: 'line-through', margin:"2px" }}> {item.subscriptionPrice} &euro;</span>
                      <span style={{ fontStyle: "italic", color: 'red' }}> {(item.subscriptionPrice * (100 - item.discount) / 100).toFixed(2)} &euro;</span>
                    </> :
                    <span style={{ fontWeight: "bold" }}> {item.subscriptionPrice} &euro;</span>
                  }
                </Grid>
              </Grid>
            </div>
          );
        })}
      </Paper>
    </Grid>
  );
};

export default PricingList;
