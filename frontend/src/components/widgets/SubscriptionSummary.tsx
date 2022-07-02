
import { Grid, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";

type SsProps = {
  shown: boolean;
  id: string;
};

const SubscriptionSummary: FC<SsProps> = (props) => {

  return (
    <Grid item md={6} xs={12} style={{ display: props.shown ? "none" : "block" }}>
        { /* ....... */ }
        <Grid item md={6} xs={12}
          style={{
            borderRadius: "12px",
            display: "flex",
          }}
        >
          <Paper style={{
            backgroundColor:  "#f00",
            color: "#fff",
            borderRadius: "12px",
            padding: "1.5em",
            margin: "1em"
          }} onClick={() => {}}>
            <div style={{ minHeight: "100px"  }}>
              <span style={{ fontWeight: "bold" }}>
                VIP Ticket
              </span>
              <br /><br />
              <span>
                Option Description
              </span>
            </div>
          </Paper>

          <Paper style={{
            backgroundColor:  "#005",
            color:            "#fff",
            borderRadius:     "12px",
            padding:          "1.5em",
            margin:           "1em"
          }}>
            <div style={{ minHeight: "100px"  }}>
              <span style={{ fontWeight: "bold" }}>
                Equipment Rental
              </span>
              <br /><br />
              <span>
                Option Description
              </span>
            </div>
          </Paper>
          
        </Grid>
        { /* ....... */ }
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
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
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
  );
};

export default SubscriptionSummary;