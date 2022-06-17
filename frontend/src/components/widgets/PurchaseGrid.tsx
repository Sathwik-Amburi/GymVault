import { Grid, Table, TableBody, TableRow, TableCell, Typography, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Item, Option } from "../../models/allModels";

const PurchaseGrid: FC = (props) => {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<String>("1");

  useEffect(() => {
    /*TODOApiCalls.getAllGyms()
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err.message));
      */
  }, []);
  let defaultBg = "#999";

  let items = [
    {
      _id: "1",
      name: "Base Ticket",
      description: "Includes registration, max. 4 entrances/week",
      price: 28,
      bgColor: "#555",
      fgColor: "#fff"
    },
    {
      _id: "2",
      name: "VIP Ticket",
      description: "24h entry (auto scan), premium equipment",
      price: 99,
      bgColor: "#CD9400",
      fgColor: "#fff"
    }
  ]

  return (
    <Grid container style={{
      padding: "1em",
      borderRadius: "12px"
    }}>
      { items.map((item) => (
        <Grid item md={6} xs={12}
          style={{
            borderRadius: "12px"
          }}
        >
          <Paper style={{

            backgroundColor: selected == item._id ? item.bgColor : defaultBg,
            color: item.fgColor,
            borderRadius: "12px",
            padding: "1.5em",
            margin: "1em"
          }}>
            <Typography variant="h6" 
              style={{
                fontWeight: "bold",
                float: "right"
              }}
            >
              {item.price}€
            </Typography>
            <div style={{
              marginTop: "3em"
            }}>
              <span style={{ fontWeight: "bold" }}>
                {item.name}
              </span>
              <br />
              <span>
                {item.description}
              </span>
            </div>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default PurchaseGrid;
