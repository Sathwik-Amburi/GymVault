import { Grid, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Item, Option } from "../models/allModels";
import Button from "@mui/material/Button";
import PurchaseGrid from "./widgets/PurchaseGrid";

const CheckoutPage: FC = () => {
  const [item, setItem] = useState<Item>({
    _id: "1",
    gymName: "ZHS Hochschulsport",
    courseName: "Yoga for Beginners",
    type: "course",
    "address": "Connollystraße 32, Munich",
    description: "A basic course variating over Hatha Yoga, and meditation practices. Unlike the more static and strengthening Hatha yoga style, a Vinyasa class is very dynamic.  The physical exercises, the so-called asanas, are not practised individually, but are strung together in flowing movements. The class is very calm and relaxed, and the students are able to focus on the breath and the body.",
    price: 100,
    options: []
  });
  const [cart, setCart] = useState<Option[]>([
    {
      "_id": "1",
      "name": "Base Ticket",
      "description": "",
      "price": 40
    },
    {
      "_id": "2",
      "name": "Sauna Access",
      "description": "",
      "price": 40
    }
  ]);
  useEffect(() => {
    /*TODOApiCalls.getAllGyms()
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err.message));
      */
  }, []);

  return (
    <Grid container spacing={3} style={{
      padding: "3em",
      borderRadius: "20px",
      backgroundColor: "#ccc"
    }}>
      <Grid item xs={12}>
        <span style={{float: "right"}}>
          <Typography variant="h5">
            <span style={{fontWeight: "800", color: "#999"}}>
              {item.type}
            </span>
          </Typography>
        </span>
        <Typography variant="h3" style={{fontWeight: "bold" }}>{item.gymName}</Typography>
        <span>{item.address}</span>
        <hr />
      </Grid>

      <Grid item md={6} xs={12}>
        <PurchaseGrid />
      </Grid>
      <Grid item md={6} xs={12}>
        <Typography variant="h4" style={{fontWeight: "bold" }}>{item.courseName}</Typography>
        <hr />
        <Typography variant="body1">{item.description}</Typography>
        <br /><br /><br />
        <Typography
          variant="h6"
          style={{fontWeight: "bold" }}
        >
          Order Summary
        </Typography>
        <hr className="mini-hr" />
        <Table>
          <TableBody>
            { cart.map((opt) => (
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
                  € xx
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
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
