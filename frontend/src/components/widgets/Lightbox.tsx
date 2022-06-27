import { Grid, Paper } from "@mui/material";
import { FC, useState } from "react";

type LbProps = {
  states: string[];
};

const Lightbox: FC<LbProps> = (props) => {
  let totalStates = props.states;
  let [viewing, setViewing] = useState(totalStates[0]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          style={{
            padding: "10em",
            textAlign: "center",
            backgroundImage: `url(${viewing}`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
          }}
        >
          
        </Paper>
      </Grid>
      {totalStates.map((state) => {
        return (
          <Grid item onClick={() => setViewing(state)} style={{ flex: "1 1 auto", maxWidth: "800px" }}>
            <Paper
              style={{
                padding: "3em",
                textAlign: "center",
                backgroundImage: `url(${state}`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                opacity: (state !== viewing ? 0.5 : 1)
              }}
            ></Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Lightbox;
