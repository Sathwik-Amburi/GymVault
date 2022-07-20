import { Grid, Paper } from "@mui/material";
import { FC, useState } from "react";

type LbProps = {
  states?: string[];
};

const Lightbox: FC<LbProps> = (props) => {
  let totalStates = props.states;
  console.log(totalStates);
  if(totalStates == undefined) totalStates = [];
  let [viewing, setViewing] = useState<string>("");

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          style={{
            padding: "10em",
            textAlign: "center",
            backgroundImage: `url(${(totalStates.length != 1 ? viewing : totalStates[0])})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center"
          }}
        >
          
        </Paper>
      </Grid>
      { totalStates.length > 1 && (
        totalStates.map((state) => {
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
      }))}
    </Grid>
  );
};

export default Lightbox;
