import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { Gym } from "../models/allModels";
import ResultCard from "./ResultCard";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ResultsPage: FC = () => {
  const [results, setResults] = useState<Gym[]>();
  useEffect(() => {
    ApiCalls.getAllGyms()
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const dummyFilters = ["Pool", "Munich", "Parking"];
  return (
    <>
      <Grid>
        <Grid>
          <Typography fontSize={"2em"}>
            {results && results.length} Results found
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          style={{ marginBottom: "8px" }}
          justifyContent="space-between"
        >
          <Grid>
            {dummyFilters.map((item) => {
              return (
                <Button
                  variant="contained"
                  size="small"
                  disableElevation
                  style={{ marginRight: "8px" }}
                >
                  {item}
                  <CloseIcon fontSize="small" />
                </Button>
              );
            })}
          </Grid>
          <Grid>
            <Button
              variant="contained"
              size="small"
              disableElevation
              style={{ marginRight: "8px", float: "right" }}
            >
              <FilterAltIcon fontSize="small" /> Filters
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {results &&
          results.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <ResultCard gym={item} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default ResultsPage;
