import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Course, Gym, Item, PurchaseOption } from "../models/allModels";
import PurchaseGrid from "./widgets/PurchaseGrid";
import PurchaseCart, { CartItem } from "./widgets/PurchaseCart";
import ApiCalls from "../api/apiCalls";
import { useNavigate, useParams } from "react-router-dom";

const CheckoutPage: FC = () => {
  const { id, stripeCallback } = useParams<{ id: string, stripeCallback: string }>();
  const editable = (stripeCallback === undefined);
  const navigate = useNavigate();

  function setGym(gym: Gym) {
    let item = {
      _id: "1",
      gymName: gym.name,
      courseName: "Fixed Subscription",
      type: "gym",
      address: gym.address,
      description: gym.description,
      price: -1,
      options: [],
  
      fgColor: "",
      bgColor: "",
    } as Item;
    setItem(item);
  }
  function setCourse(course: Course) {
    let item = {
      _id: course._id,
      gymName: "ZHS Hochschulsport",
      courseName: course.name,
      type: "course",
      address: course.address, // TODO: shouldn't this be "course.gym.address"???
      description: course.description,
      price: -1,
      options: [],
  
      fgColor: "",
      bgColor: "",
    } as Item;
    setItem(item);
  }

  const [item, setItem] = useState<Item>({
    _id: "1",
    gymName: "ZHS Hochschulsport",
    courseName: "Yoga for Beginners",
    type: "course",
    "address": "Connollystraße 32, Munich",
    description: "A basic course variating over Hatha Yoga, and meditation practices. Unlike the more static and strengthening Hatha yoga style, a Vinyasa class is very dynamic.  The physical exercises, the so-called asanas, are not practised individually, but are strung together in flowing movements. The class is very calm and relaxed, and the students are able to focus on the breath and the body.",
    price: -1,
    options: [],

    fgColor: "",
    bgColor: "",
  });

  useEffect(() => {
    ApiCalls.getCourse(id!)
      .then((res) => {
        setCourse(res.data.response);
      })
      .catch((err) => {
        ApiCalls.getGym(id!)
          .then((res) => {
            setGym(res.data.response);
          })
          .catch((err) => {
            alert("TODO: Neither a gym nor a course with this ID exists");
            // navigate to 404?
          });
      });
      
      // Check if confirmation is needed
      if(stripeCallback !== undefined) {
        // TODO: call APIs to check validity of ("confirm") purchase, and redirect if valid
        let uid = String(localStorage.getItem("token"));
        ApiCalls.checkOrPurchase("629e3728de4e8b7edbf31c2d", uid, stripeCallback)
          .then((res) => {
            navigate("/user/tickets?highlight=" + id);
          })
          .catch((err) => {
            alert("TODO: Error checking purchase");
          }
        );
      }
  }, [id, navigate, stripeCallback]);
  
  let [cart, setCart] = useState<CartItem[]>([ {
    name: "Base Ticket",
    description: "Includes registration, max. 4 entrances/week",
    price: 28,
    base: true,
    _id: "1"
  } as CartItem ]);

  // TODO: all of the below will go into the useEffect hook
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
  ];

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
      backgroundColor: "#eee",
      marginTop: "3em"
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
        <PurchaseGrid 
          bases={items} 
          optionals={optionals} 
          cart={cart} 
          setCart={setCart} 
          editable={editable}
        />
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
        <PurchaseCart cart={cart} setCart={setCart} allowCheckout={editable} />
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
