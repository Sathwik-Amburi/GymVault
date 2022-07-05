import { Grid, Table, TableBody, TableRow, TableCell, Typography, Paper, Button, tableCellClasses, CircularProgress } from "@mui/material";
import { fontSize } from "@mui/system";
import { FC, useEffect, useState } from "react";
import { Item, Option } from "../../models/allModels";

export interface CartItem {
  name: string,
  description: string,
  price: number,
  base: boolean, // if false, this is an option and can be removed
  _id: string,
};

interface CartProps {
  baseId: string,
  cart: CartItem[],
  setCart: (cart: CartItem[]) => void,
  allowCheckout: boolean,
}

const PurchaseGrid: FC<CartProps> = (props: CartProps) => {
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
    <Table sx={{
      [`& .${tableCellClasses.root}`]: {
        borderBottom: "none"
      }
    }}>
      <TableBody>
        { props.cart.map((opt: CartItem) => (
          <TableRow>
          <TableCell>
            <Typography variant="h6">
              {opt.price > 0 ? "€ " + opt.price : "free"}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              {opt.name}
            </Typography>
          </TableCell>
        </TableRow>
        ))}
        <TableRow style={{ height: "2em" }}>
          
        </TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h5" style={{fontWeight: "bold" }}>
              € {props.cart.reduce((acc, curr) => acc + curr.price, 0)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              Total due
              { props.allowCheckout ? (
                <div style={{float: "right"}}>
                  <Button variant="contained" color="success" onClick={() => {
                    alert('stripe!');
                  }}
                  href={`/buy/${props.baseId}/confirm/SOME_STRIPE_ID`}>
                    Secure Checkout
                  </Button>
                </div>
              ) : null }
            </Typography>
          </TableCell>
        </TableRow>
        { !props.allowCheckout ? (
          <TableRow>
            <TableCell>
              <CircularProgress size={18} style={{marginRight: "1em"}} color="secondary" />
              <Typography variant="body1" style={{ display: "inline-block" }}>  
                Checkout in progress...
              </Typography>
            </TableCell>
          </TableRow>
        ) : null }
      </TableBody>
    </Table>
  );
};

export default PurchaseGrid;
