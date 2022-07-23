import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useState } from "react";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setGymResults } from "../store/slices/gymResultsSlice";
import { Gym, SubscriptionTypes } from "../models/allModels";

const ResultsSort: FC = () => {
  const dispatch = useDispatch();
  const gyms = useSelector((state: RootState) => state.gymResults.filteredGyms);
  const [sortBy, setSortBy] = useState<string>("rating_desc");

  const handleSortSelect = (event: SelectChangeEvent) => {
    setSortBy(event.target.value as string);
    var sortedGyms = [...gyms];
    switch (event.target.value) {
      case "rating_desc":
        sortedGyms.sort(
          (a, b) =>
            (b.rating.length !== 0 ? b.rating[0].rating : -Infinity) -
            (a.rating.length !== 0 ? a.rating[0].rating : -Infinity)
        );
        break;
      case "day_pass_asc":
        sortedGyms.sort(
          (a, b) =>
            getSusbcriptionPrice(a, SubscriptionTypes.DAY_PASS) -
            getSusbcriptionPrice(b, SubscriptionTypes.DAY_PASS)
        );
        break;
      case "monthly_pass_asc":
        sortedGyms.sort(
          (a, b) =>
            getSusbcriptionPrice(a, SubscriptionTypes.MONTHLY_PASS) -
            getSusbcriptionPrice(b, SubscriptionTypes.MONTHLY_PASS)
        );
        break;
      case "yearly_pass_asc":
        sortedGyms.sort(
          (a, b) =>
            getSusbcriptionPrice(a, SubscriptionTypes.YEARLY_PASS) -
            getSusbcriptionPrice(b, SubscriptionTypes.YEARLY_PASS)
        );
        break;
      default:
        break;
    }
    dispatch(setGymResults({ filteredGyms: sortedGyms }));
  };

  const getSusbcriptionPrice = (gym: Gym, type: SubscriptionTypes): number => {
    var subscription = gym.subscriptionOffers.filter((item) => {
      return item.subscriptionType === type;
    });
    if (subscription.length > 0) {
      return subscription[0].subscriptionPrice;
    }

    return Infinity;
  };

  return (
    <>
      <Grid
        md={2}
        item
        container
        direction="row"
        style={{ marginBottom: "8px" }}
        justifyContent="space-between"
      >
        <Box>
          <FormControl style={{ width: 180 }}>
            <InputLabel
              id="demo-simple-select-label"
              color="secondary"
              style={{ fontWeight: "bold" }}
            >
              Sort by
            </InputLabel>
            <Select
              IconComponent={() => <SwapVertIcon color="secondary" />}
              size="small"
              color="secondary"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortBy}
              label="SortBy"
              onChange={handleSortSelect}
            >
              <MenuItem value={"rating_desc"}>Rating (High to low)</MenuItem>
              <MenuItem value={"day_pass_asc"}>Day pass (Low to High)</MenuItem>
              <MenuItem value={"monthly_pass_asc"}>
                Monthly pass (Low to High)
              </MenuItem>
              <MenuItem value={"yearly_pass_asc"}>
                Yearly pass (Low to High)
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </>
  );
};

export default ResultsSort;
