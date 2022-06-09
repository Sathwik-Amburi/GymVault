import { Grid, Paper } from "@mui/material";
import { FC, useState } from "react";

type Props = {
    rating: number;
}

const Lightbox: FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper style={{ padding: "10em", textAlign: "center", backgroundColor: "#ddd" }}>
                Image Lightbox Goes Here
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{ padding: "3em", textAlign: "center", backgroundColor: "#5cc" }}>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{ padding: "3em", textAlign: "center", backgroundColor: "#9cc" }}>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper style={{ padding: "3em", textAlign: "center", backgroundColor: "#fcc" }}>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Lightbox;

