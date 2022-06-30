
import { Grid, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";

type SdProps = {
  shown: string;
  code: string;
  id: string;
};

const SecretDisplay: FC<SdProps> = (props) => {

  return (
    <Grid item md={6} xs={12} style={{ padding: "3em", display: (props.shown === props.id) ? "block" : "none" }}>
      <Paper style={{ backgroundColor: "#fff", padding: "2.5em", borderRadius: "12px" }}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          <span className="fas fa-lock" style={ { color: "#00763D", marginRight: "0.5em" } }></span>
          Secret Access Code
        </Typography>
        <Typography display="inline" variant="h5">
          {props.code}
        </Typography>
        <span style={{ margin: "0.5em" }}>
          // 
        </span>
        <Typography display="inline" variant="h6">
          John Doe 
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SecretDisplay;