import { Grid, Table, TableBody, TableRow, TableCell, Typography, Paper, Button } from "@mui/material";
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
  cart: CartItem[],
  setCart: (cart: CartItem[]) => void,
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
    <Table>
      <TableBody>
        { props.cart.map((opt: CartItem) => (
          <TableRow>
          <TableCell>
            <Typography variant="h6">
              € {opt.price}
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
              € TODO
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              Total due
              <div style={{float: "right"}}>
                <Button variant="contained" color="success" onClick={() => {
                  alert('stripe!');
                }}
                href="/user/tickets">
                  Secure Checkout
                </Button>
              </div>
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PurchaseGrid;
