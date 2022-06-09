import { Grid, Paper } from "@mui/material";
import { FC, useState } from "react";

type Props = {
    rating: number;
}

const Lightbox: FC = () => {
    let [viewing, setViewing] = useState("#ddd");

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper style={{ padding: "10em", textAlign: "center", backgroundColor: viewing }}>
                Image Lightbox Goes Here
                </Paper>
            </Grid>
            <Grid item xs={4} onClick={() => { setViewing("#5cc") }}>
                <Paper style={{ padding: "3em", textAlign: "center", backgroundColor: "#5cc" }}>
                </Paper>
            </Grid>
            <Grid item xs={4} onClick={() => { setViewing("#9cc") }}>
                <Paper style={{ padding: "3em", textAlign: "center", backgroundColor: "#9cc" }}>
                </Paper>
            </Grid>
            <Grid item xs={4} onClick={() => { setViewing("#fcc") }}>
                <Paper style={{ padding: "3em", textAlign: "center", backgroundColor: "#fcc" }}>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default Lightbox;

