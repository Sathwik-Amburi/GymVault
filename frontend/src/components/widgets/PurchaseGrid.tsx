import { Grid, Table, TableBody, TableRow, TableCell, Typography, Paper } from "@mui/material";
import { fontSize } from "@mui/system";
import { FC, useEffect, useState } from "react";
import { Item, Option, PurchaseOption } from "../../models/allModels";
import { CartItem } from "./PurchaseCart";

interface GridProps {
  bases: PurchaseOption[],
  optionals: PurchaseOption[],
  cart: CartItem[],
  setCart: (cart: CartItem[]) => void,
}

const PurchaseGrid: FC<GridProps> = (props: GridProps) => {
  const [selected, setSelected] = useState<String>("1");
  const [selectedOption, setSelectedOption] = useState<string[]>([]);

  useEffect(() => {
    /*TODOApiCalls.getAllGyms()
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err.message));
      */
  }, []);
  let defaultBg = "#999";

  return (
    <Grid container style={{
      padding: "1em",
    }}>

      <Grid item xs={12}>
        <br></br>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          Ticket Format
        </Typography>
        <hr className="mini-hr" />
      </Grid>
      { props.bases.map((item) => (
        <Grid item md={6} xs={12}
          style={{
            borderRadius: "12px",
            height: "100%",
          }}
        >
          <Paper style={{
            backgroundColor: selected == item._id ? item.bgColor : defaultBg,
            color: item.fgColor,
            borderRadius: "12px",
            padding: "1.5em",
            margin: "1em",
          }} onClick={() => setSelected(item._id)}>
            <span style={{ fontSize: "1.5em" }}>
              { selected== item._id ? <i className="fas fa-circle-check"></i> : <i className="fa-regular fa-circle"></i> }
            </span>

            <Typography variant="h6" 
              style={{
                fontWeight: "bold",
                float: "right"
              }}
            >
              {item.price}
              { isNaN(item.price) ? "" : "€"}
            </Typography>
            <div style={{
              marginTop: "3em"
            }}>
              <span style={{ fontWeight: "bold" }}>
                {item.name}
              </span>
              <br /><br />
              <span>
                {item.description}
              </span>
            </div>
          </Paper>
        </Grid>
      ))}



      <Grid item xs={12}>
        <br></br>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          Optionals
        </Typography>
        <hr className="mini-hr" />
      </Grid>

      { /* !!!!! TODO: deduplicate logic !!!!! */ }
      { props.optionals.length > 0 && (
        <span>
          <hr />
        </span>
      )}
      { props.optionals.map((item) => (
        <Grid item md={6} xs={12}
          style={{
            borderRadius: "12px",
            height: "100%",
          }}
        >
          <Paper style={{
            backgroundColor: selectedOption.includes(item._id) ? item.bgColor : defaultBg,
            color:           selectedOption.includes(item._id) ? item.fgColor : "#fff",
            borderRadius: "12px",
            padding: "1.5em",
            margin: "1em",
          }} onClick={() => setSelectedOption(selectedOption.includes(item._id) ? selectedOption.filter(id => id !== item._id) : [...selectedOption, item._id])}>
            
            <span style={{ fontSize: "1.5em" }}>
              { selectedOption.includes(item._id) ? <i className="fas fa-circle-check"></i> : <i className="fa-regular fa-circle"></i> }
            </span>
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
              <br /><br />
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
