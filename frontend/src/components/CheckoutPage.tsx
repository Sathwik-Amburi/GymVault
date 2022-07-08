import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Course, Gym, Item, PurchaseOption, SubscriptionOffers } from "../models/allModels";
import PurchaseGrid from "./widgets/PurchaseGrid";
import PurchaseCart, { CartItem } from "./widgets/PurchaseCart";
import ApiCalls from "../api/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const CheckoutPage: FC = () => {
  const { id, stripeCallback } = useParams<{
    id: string;
    stripeCallback: string;
  }>();
  if (!id) {
    alert("No ID provided! This should NOT happen");
  }
  const editable = stripeCallback === undefined;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [basePurchases, setBasePurchases] = useState<PurchaseOption[]>([]);

  function setSubscriptionBases(subscriptionOffers: SubscriptionOffers[]) {
    if (subscriptionOffers !== undefined && subscriptionOffers.length > 0) {
      let items: PurchaseOption[] = [];
      if(subscriptionOffers.length > 0)
        items.push({
          _id: "1",
          name: "Daily Entrance",
          description: "Fixed duration, base-tier ticket",
          price: subscriptionOffers[0].subscriptionPrice,
          bgColor: "#030",
          fgColor: "#fff"
        } as PurchaseOption);

      if(subscriptionOffers.length > 1)
        items.push({
          _id: "2",
          name: "Monthly Ticket",
          description: "Fixed duration, base-tier ticket",
          price: subscriptionOffers[1].subscriptionPrice,
          bgColor: "#060",
          fgColor: "#fff"
        } as PurchaseOption);
      
      if(subscriptionOffers.length > 2)
        items.push({
          _id: "3",
          name: "Yearly Subscription",
          description: "Fixed duration, base-tier ticket",
          price: subscriptionOffers[2].subscriptionPrice,
          bgColor: "#090",
          fgColor: "#fff"
        } as PurchaseOption);

      setBasePurchases(items);
    }
  }
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
    let newItem = {
      _id: course._id,
      gymName: item.gymName,
      courseName: course.name,
      type: "course",
      address: course.address, // TODO: shouldn't this be "course.gym.address"???
      description: course.description,
      price: -1,
      options: [],

      fgColor: "",
      bgColor: "",
    } as Item;
    setItem(newItem);
  }

  const [item, setItem] = useState<Item>({
    _id: "1",
    gymName: "ZHS Hochschulsport",
    courseName: "Yoga for Beginners",
    type: "course",
    address: "Connollystraße 32, Munich",
    description:
      "A basic course variating over Hatha Yoga, and meditation practices. Unlike the more static and strengthening Hatha yoga style, a Vinyasa class is very dynamic.  The physical exercises, the so-called asanas, are not practised individually, but are strung together in flowing movements. The class is very calm and relaxed, and the students are able to focus on the breath and the body.",
    price: -1,
    options: [],

    fgColor: "",
    bgColor: "",
  });

  useEffect(() => {
    // TODO: rewrite the other way around (get the gym first, then the course if it exists)
    ApiCalls.getCourse(id!)
      .then((res) => {
        setCourse(res.data.response);
        setSubscriptionBases(res.data.response.subscriptionOffers);
        let response = res.data.response;
        let course = item;
        ApiCalls.getGym(res.data.response.gymId)
          .then((res) => {
            console.log(res);
            setGym(res.data.response);
            setCourse(response);
            //setSubscriptionBases(res.data.response.subscriptionOffers);
          }).catch((err) => UnifiedErrorHandler.handle(err, "Could not load gym for course"));

        setLoading(false);
      })
      .catch((err) => {
        ApiCalls.getGym(id!)
          .then((res) => {
            console.log(res.data.response);
            setGym(res.data.response);
            setSubscriptionBases(res.data.response.subscriptionOffers);

            setLoading(false);
          }).catch((err) => UnifiedErrorHandler.handle(err, "Neither a gym nor a course with this ID exists"));
            // navigate to 404?
      });
      
      // /confirm route taken
      if(stripeCallback !== undefined) {
        // TODO: call APIs to check validity of ("confirm") purchase, and redirect if valid
        let uid = String(localStorage.getItem("token"));
        ApiCalls.checkOrPurchase(id!, uid, stripeCallback)
          .then((res) => {
            navigate("/user/tickets?highlight=" + id);
          }).catch((err) => UnifiedErrorHandler.handle(err, "(display): Error checking purchase"));
      }
  }, [id, navigate, stripeCallback]);
  
  let [cart, setCart] = useState<CartItem[]>([]);

  let optionals: PurchaseOption[] = [
    {
      _id: "1",
      name: "Equipment Rental",
      description: "Rent mat and accessories during course sessions",
      price: 16,
      bgColor: "#555",
      fgColor: "#fff",
    } as PurchaseOption,
    {
      _id: "4",
      name: "VIP Subscription 👑️",
      description: "24h entry (auto scan), premium equipment",
      price: 99,
      bgColor: "#CD9400",
      fgColor: "#fff",
    } as PurchaseOption,
    {
      _id: "3",
      name: "Sauna Access",
      description: "Enter our built-in sauna after your workouts",
      price: 40,
      bgColor: "#f00",
      fgColor: "#fff",
    } as PurchaseOption,
    {
      _id: "2",
      name: "Special Needs ♿️",
      description: "Require assistance for disabilities",
      price: 0,
      bgColor: "#fff",
      fgColor: "#57f",
    } as PurchaseOption,
  ];

  return (
    <ChonkySpinner loading={loading}>
      <Grid
        container
        spacing={3}
        style={{
          padding: "3em",
          borderRadius: "20px",
          backgroundColor: "#eee",
          marginTop: "3em",
        }}
      >
        <Grid item xs={12}>
          <span style={{ float: "right" }}>
            <Typography variant="h5">
              <span style={{ fontWeight: "800", color: "#999" }}>
                {item.type}
              </span>
            </Typography>
          </span>
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            {item.gymName}
          </Typography>
          <span>{item.address}</span>
          <hr />
        </Grid>

        <Grid item md={6} xs={12}>
          <PurchaseGrid 
            bases={basePurchases} 
            optionals={optionals} 
            cart={cart} 
            setCart={setCart} 
            editable={editable}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            {item.courseName}
          </Typography>
          <hr />
          <Typography variant="body1">{item.description}</Typography>
          <br />
          <br />
          <br />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Order Summary
          </Typography>
          <hr className="mini-hr" />
          <PurchaseCart
            baseId={id!}
            cart={cart}
            setCart={setCart}
            allowCheckout={editable}
          />
        </Grid>
      </Grid>
    </ChonkySpinner>
  );
};

export default CheckoutPage;
