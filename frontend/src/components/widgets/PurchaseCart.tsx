import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  tableCellClasses,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setErrorAlert } from "../../store/slices/errorAlertSlice";
import UnifiedErrorHandler from "./utilities/UnifiedErrorHandler";

export interface CartItem {
  name: string;
  description: string;
  price: number;
  priceDiscount?: number;
  base: boolean; // if false, this is an option and can be removed
  _id: string;
}

interface CartProps {
  baseId: string;
  startDate: string;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  setEditable: (editable: boolean) => void;
  dateValidator: (date: string) => boolean;
  allowCheckout: boolean;
}

const PurchaseGrid: FC<CartProps> = (props: CartProps) => {
  const dispatch = useDispatch();
  const { id } = useParams(); // gym/course id
  const [loading, setLoading] = useState<boolean>(false);

  const stripeHandlePayment = async () => {
    // S: indicates that it's a session identifier, the backend will take care of that
    if (
      props.startDate.substring(0, 2) !== "S:" &&
      !props.dateValidator(props.startDate)
    ) {
      dispatch(
        setErrorAlert({
          showError: true,
          errorMessage: "Please select a valid date",
        })
      );

      return;
    }
    setLoading(true);
    props.setEditable(false);
    let baseItem = props.cart.find((item) => item.base);
    if (baseItem && baseItem.price && baseItem.priceDiscount)
      baseItem.price = baseItem.priceDiscount;
    let options = props.cart.filter((item) => !item.base);
    let startDate = props.startDate;
    const headers = { "x-access-token": String(localStorage.getItem("token")) };
    let response = await axios.post(
      "/stripe/get-stripe-session",
      { id, baseItem, startDate, options },
      { headers }
    );
    if (response.status === 200) {
      let session = response.data;
      window.location.href = session.link;
    } else {
      dispatch(
        setErrorAlert({
          showError: true,
          errorMessage: "Error while creating stripe session",
        })
      );
    }
  };

  return (
    <Table
      sx={{
        [`& .${tableCellClasses.root}`]: {
          borderBottom: "none",
        },
      }}
    >
      <TableBody>
        {props.cart.map((opt: CartItem) => (
          <TableRow>
            <TableCell>
              <Typography variant="h6">
                {opt.priceDiscount !== undefined
                  ? opt.priceDiscount > 0
                    ? "€ " + opt.priceDiscount
                    : "free"
                  : !isNaN(opt.price) && opt.price > 0
                  ? "€ " + opt.price
                  : "free"}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body1">{opt.name}</Typography>
            </TableCell>
          </TableRow>
        ))}
        <TableRow style={{ height: "2em" }}></TableRow>
        <TableRow>
          <TableCell>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              €{" "}
              {props.cart
                .reduce(
                  (acc, curr) =>
                    curr.priceDiscount !== undefined
                      ? acc + curr.priceDiscount
                      : acc + curr.price,
                  0
                )
                .toFixed(2)}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="body1">
              Total due
              {props.allowCheckout ? (
                <div style={{ float: "right" }}>
                  <Button
                    disabled={loading}
                    style={{ fontWeight: "bold" }}
                    variant="contained"
                    color="success"
                    onClick={() => {
                      stripeHandlePayment();
                    }}
                  >
                    {loading ? "Processing ..." : "Secure Checkout"}
                  </Button>
                </div>
              ) : null}
            </Typography>
          </TableCell>
        </TableRow>
        {!props.allowCheckout ? (
          <TableRow>
            <TableCell>
              <CircularProgress
                size={18}
                style={{ marginRight: "1em" }}
                color="secondary"
              />
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
