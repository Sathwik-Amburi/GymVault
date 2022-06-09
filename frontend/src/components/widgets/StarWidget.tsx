import { Button, Paper, Grid, Typography, Chip } from "@mui/material";
import { FC, useState } from "react";

type Props = {
    rating: number;
}

const StarWidget: FC<Props> = ({ rating }) => {
    return (
        <div 
            style={{ display: "inline", padding: "0.5em" }}
        >
            {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                return (
                    <span
                        key={i}
                        style={{
                            color: starValue <= rating ? "#eebc1d" : "#ccc",
                            padding: "0.1em",
                        }}  
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
}

export default StarWidget;