import { Grid, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import NoImage from "../../images/no-pictures-2.png";

type LbProps = {
  states: string[];
};

const Lightbox: FC<LbProps> = (props) => {
  let [viewing, setViewing] = useState<string>("?");

  useEffect(() => {
    setViewing(
      props.states !== undefined && props.states.length > 0
        ? props.states[0]
        : "?"
    );
  }, [props.states]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          style={{
            padding: "10em",
            textAlign: "center",
            backgroundImage:
              props.states.length > 0 ? `url(${viewing})` : `url(${NoImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></Paper>
      </Grid>
      {props.states.length > 1 &&
        props.states.map((state) => {
          return (
            <Grid
              item
              onClick={() => setViewing(state)}
              style={{ flex: "1 1 auto", maxWidth: "800px" }}
            >
              <Paper
                style={{
                  padding: "3em",
                  textAlign: "center",
                  backgroundImage: `url(${state}`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  opacity: state !== viewing ? 0.5 : 1,
                }}
              ></Paper>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Lightbox;
