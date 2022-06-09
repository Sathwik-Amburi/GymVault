import { Grid, Paper } from "@mui/material";
import { FC, useState } from "react";

type Props = {
    rating: number;
}

const Lightbox: FC = () => {
    let [viewing, setViewing] = useState("#ddd");
    let totalStates = ["#5cc", "#9cc", "#fcc"]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} >
                <Paper style={{ 
                    padding: "10em",
                    textAlign: "center", 
                    backgroundColor: viewing 
                }}>
                Image Lightbox
                </Paper>
            </Grid>
            { totalStates.map((state) => {
                return (
                    <Grid item xs={4} onClick={() => setViewing(state)}>
                        <Paper style={{ 
                            padding: "3em",
                            textAlign: "center", 
                            backgroundColor: state 
                        }}>
                        Image Lightbox
                        </Paper>
                    </Grid>
                );
            }) }
        </Grid>
    );
}

export default Lightbox;

