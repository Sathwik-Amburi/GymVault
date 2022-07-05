import React from "react";
import "./ticket.css"
import {Grid, Paper, Typography} from "@mui/material";
import ReviewButton from "./ReviewButton";
import StarRating from "./StarRating";



const ticketCard = (props:any)=> {
    return (
        <Grid container style={{
            padding: "3em",
            marginTop: "3em",
            borderRadius: "20px",
            backgroundColor: "#ccc"
        }}>
            <Grid item xs={12}>
              <span style={{float: "right"}}>
                <Typography variant="h5">
                  <span style={{fontWeight: "800", color: "#999"}}>
                    {props.type}
                  </span>
                </Typography>
              </span>
                <Typography variant="h4" style={{fontWeight: "bold"}}>{props.gymName}</Typography>
                <span>{props.address}</span>
                <hr/>
            </Grid>

            <Grid item md={6} xs={12}>
                { /* ....... */}
                <Grid item md={6} xs={12}
                      style={{
                          borderRadius: "12px",
                          display: "flex",
                      }}
                >
                    <Paper style={{
                        backgroundColor: "#f00",
                        color: "#fff",
                        borderRadius: "12px",
                        padding: "1.5em",
                        margin: "1em"
                    }} onClick={() => {
                    }}>
                        <div style={{minHeight: "100px"}}>
                    <span style={{fontWeight: "bold"}}>
                      VIP Ticket
                    </span>
                            <br/><br/>
                            <span>
                      Option Description
                    </span>
                        </div>
                    </Paper>

                    <Paper style={{
                        backgroundColor: "#005",
                        color: "#fff",
                        borderRadius: "12px",
                        padding: "1.5em",
                        margin: "1em"
                    }} onClick={() => {
                    }}>
                        <div style={{minHeight: "100px"}}>
                    <span style={{fontWeight: "bold"}}>
                      Equipment Rental
                    </span>
                            <br/><br/>
                            <span>
                      Option Description
                    </span>
                        </div>
                    </Paper>

                </Grid>
                { /* ....... */}
                <div>
                    <table style={{border: "none", width: "100%"}}>
                        <tr>
                            <td>
                                <Typography variant="body1">
                                    From
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="h6">
                                    01.01.1970
                                </Typography>
                            </td>
                            <td style={{textAlign: "right"}}>
                                <Typography variant="h6" style={{fontWeight: "bold"}}>
                                    €150
                                </Typography>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Typography variant="body1">
                                    To
                                </Typography>
                            </td>
                            <td>
                                <Typography variant="h6">
                                    01.01.1970
                                </Typography>
                            </td>
                            <td style={{textAlign: "right"}}>
                                <Typography variant="body1">
                                    Total paid
                                </Typography>
                            </td>
                        </tr>
                    </table>
                </div>

            </Grid>
            <Grid item md={6} xs={12} style={{paddingLeft: "2em"}}>
                <Typography variant="h5" style={{fontWeight: "bold"}}>{props.courseName}</Typography>
                <hr/>
                <Typography variant="body2">{props.description}</Typography>
                <hr/>
                <StarRating></StarRating>
                <ReviewButton/>
            </Grid>

        </Grid>
    );
}

export default ticketCard;