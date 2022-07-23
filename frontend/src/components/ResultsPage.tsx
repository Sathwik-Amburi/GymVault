import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import ResultCard from "./ResultCard";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import { getGymSpelling } from "../api/utils/formatters";
import ResultsFilter from "./ResultsFilter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setGymResults } from "../store/slices/gymResultsSlice";
import ResultsSort from "./ResultsSort";
import CityMap from "./widgets/map/CityMap";

const ResultsPage: FC = () => {
  const dispatch = useDispatch();
  const queries = new URLSearchParams(window.location.search);
  const gymResults = useSelector(
    (state: RootState) => state.gymResults.filteredGyms
  );

  const [loading, setLoading] = useState<boolean>(true);

  const city = queries.get("city");
  const name = queries.get("name");

  useEffect(() => {
    city &&
      ApiCalls.getAllGymsByCityOrName(city, name)
        .then((res) => {
          dispatch(setGymResults({ filteredGyms: res.data.response }));
          setLoading(false);
        })

        .catch((err) => UnifiedErrorHandler.handle(err, "Cannot get gyms"));
  }, []);

  return (
    <>
      <Grid>
        <Grid>
          <Typography fontSize={"2em"} fontWeight="bold">
            {gymResults ? gymResults.length : 0}{" "}
            {getGymSpelling(gymResults?.length)}
            found in {city}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <ResultsFilter city={city} name={name} gyms={gymResults} />
        <ResultsSort />
      </Grid>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "30px 0px",
        }}
      >
        <CityMap item="gym" city={city} />
      </div>

      <ChonkySpinner loading={loading}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {gymResults &&
            gymResults.map((item, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <ResultCard gym={item} />
              </Grid>
            ))}
        </Grid>
      </ChonkySpinner>
    </>
  );
};

export default ResultsPage;
