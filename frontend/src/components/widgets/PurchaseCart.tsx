import { Table, TableBody, TableRow, TableCell, Typography, Button, tableCellClasses, CircularProgress } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { useParams } from 'react-router-dom';


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
  setEditable: (editable: boolean) => void,
  allowCheckout: boolean,
}

const PurchaseGrid: FC<CartProps> = (props: CartProps) => {
  const { id } = useParams() // gym/course id
  const [loading, setLoading] = useState<boolean>(false)

  const stripeHandlePayment = async () => {
    setLoading(true);
    props.setEditable(false);
    let cart: CartItem[] = props.cart
    let price = 0;
    let name = ''
    /*cart.forEach((item) => {
      price += item.price
      name = name + ' ' + item.name + ' | '
    })*/
    let baseItem = cart.find((item) => item.base);
    let options = cart.filter((item) => !item.base);
    const headers = { "x-access-token": String(localStorage.getItem('token')) }
    let response = await axios.post('/stripe/get-stripe-session', {id, baseItem, options}, { headers })
    window.location.href = response.data.link
  }

  return (
    <Table sx={{
      [`& .${tableCellClasses.root}`]: {
        borderBottom: "none"
      }
    }}>
      <TableBody>
        {props.cart.map((opt: CartItem) => (
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
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              € {props.cart.reduce((acc, curr) => acc + curr.price, 0)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              Total due
              {props.allowCheckout ? (
                <div style={{ float: "right" }}>
                  <Button disabled={loading} variant="contained" color="success"
                    onClick={() => {
                      stripeHandlePayment()
                    }}
                  // href={`/buy/${props.baseId}/confirm/SOME_STRIPE_ID`}
                  >
                    {loading? 'Processing ...' : 'Secure Checkout'}
                   
                  </Button>
                </div>
              ) : null}
            </Typography>
          </TableCell>
        </TableRow>
        {!props.allowCheckout ? (
          <TableRow>
            <TableCell>
              <CircularProgress size={18} style={{ marginRight: "1em" }} color="secondary" />
              <Typography variant="body1" style={{ display: "inline-block" }}>
                Checkout in progress...
              </Typography>
            </TableCell>
          </TableRow>
        ) : null}
      </TableBody>
    </Table>
  );
};

export default PurchaseGrid;
