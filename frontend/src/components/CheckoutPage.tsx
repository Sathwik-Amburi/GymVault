import { Grid, Table, TableBody, TableRow, TableCell, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Item, Option, PurchaseOption } from "../models/allModels";
import Button from "@mui/material/Button";
import PurchaseGrid from "./widgets/PurchaseGrid";
import PurchaseCart, { CartItem } from "./widgets/PurchaseCart";

const CheckoutPage: FC = () => {
  const [item, setItem] = useState<Item>({
    _id: "1",
    gymName: "ZHS Hochschulsport",
    courseName: "Yoga for Beginners",
    type: "course",
    "address": "Connollystraße 32, Munich",
    description: "A basic course variating over Hatha Yoga, and meditation practices. Unlike the more static and strengthening Hatha yoga style, a Vinyasa class is very dynamic.  The physical exercises, the so-called asanas, are not practised individually, but are strung together in flowing movements. The class is very calm and relaxed, and the students are able to focus on the breath and the body.",
    price: 100,
    options: [],

    fgColor: "",
    bgColor: "",
  });
  
  const [cart, setCart] = useState<CartItem[]>([
    {
      "_id": "1",
      "name": "Base Ticket",
      "description": "",
      "price": 40,
      "base": true,
    },
    {
      "_id": "2",
      "name": "Sauna Access",
      "description": "",
      "price": 40,
      "base": false,
    }
  ]);
  useEffect(() => {
    /*TODOApiCalls.getAllGyms()
      .then((res) => setResults(res.data))
      .catch((err) => console.log(err.message));
      */
  }, []);

  /* Grid related stubs: */
  let items: PurchaseOption[] = [
    {
      _id: "1",
      name: "Base Ticket",
      description: "Includes registration, max. 4 entrances/week",
      price: 28,
      bgColor: "#555",
      fgColor: "#fff"
    } as PurchaseOption,
    {
      _id: "2",
      name: "VIP Ticket 👑️",
      description: "24h entry (auto scan), premium equipment",
      price: 99,
      bgColor: "#CD9400",
      fgColor: "#fff"
    } as PurchaseOption,
  ]
  let optionals: PurchaseOption[] = [
    {
      _id: "1",
      name: "Equipment Rental",
      description: "Rent mat and accessories during course sessions",
      price: 16,
      bgColor: "#555",
      fgColor: "#fff"
    } as PurchaseOption,
    {
      _id: "3",
      name: "Sauna Access",
      description: "Enter our built-in sauna after your workouts",
      price: 40,
      bgColor: "#f00",
      fgColor: "#fff"
    } as PurchaseOption,
    {
      _id: "2",
      name: "Special Needs ♿️",
      description: "Require assistance for disabilities",
      price: 0,
      bgColor: "#fff",
      fgColor: "#57f"
    } as PurchaseOption
  ];

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
        <PurchaseGrid bases={items} optionals={optionals} cart={cart} setCart={setCart} />
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
        <PurchaseCart cart={cart} setCart={setCart} />
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
