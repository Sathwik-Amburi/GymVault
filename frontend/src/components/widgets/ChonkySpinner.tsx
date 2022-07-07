import {Button, Paper, Grid, Typography, Chip, CardHeader, Avatar, CircularProgress} from "@mui/material";
import { FC, ReactNode, useState } from "react";

// Hacky component that displays a loading spinner while the data is loading.
type Props = {
    loading: boolean;
    children: ReactNode;
};

const ChonkySpinner: FC<Props> = (props) => {
    return (
        <>
            <Grid style={{ 
                    display: props.loading ? "flex" : "none",
                    flexDirection: "column", 
                    justifyContent: "center", 
                    alignItems: "center", 
                    padding: "20%", gap: "20%" 
                }}>
                <CircularProgress size={100} color="secondary" />
            </Grid>
            <div style={{ display: props.loading ? "none" : "block" }}> 
                { props.children }
            </div>
        </>

    );
};

export default ChonkySpinner;