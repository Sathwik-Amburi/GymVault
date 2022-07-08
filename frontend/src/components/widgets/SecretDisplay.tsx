
import { Grid, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";

type SdProps = {
  shown: boolean;
  code?: string;
  id: string;
};

const SecretDisplay: FC<SdProps> = (props) => {

  return (
    <Grid item md={6} xs={12} style={{ padding: "3em", display: props.shown ? "block" : "none" }}>
      <Paper style={{ backgroundColor: "#fff", padding: "2.5em", borderRadius: "12px" }}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          <span className="fas fa-lock" style={ { color: "#00763D", marginRight: "0.5em" } }></span>
          Secret Access Code
        </Typography>
        <br />
        <Typography display="inline" variant="h5">
          {props.code}
        </Typography>
        <br /><br />
        <Typography variant="body2">
          Do not share this code with anyone.
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SecretDisplay;