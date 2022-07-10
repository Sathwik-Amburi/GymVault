import { Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Course, Gym, Item, Option, PurchaseOption, SubscriptionOffers } from "../models/allModels";
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
  const [editable, setEditable] = useState(stripeCallback === undefined);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [basePurchases, setBasePurchases] = useState<PurchaseOption[]>([]);
  let [cart, setCart] = useState<CartItem[]>([]);

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
      setCart([{ ...items[0], base: true } as CartItem]);
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
      price: -1, // TODO: this "price" here can be dropped from the schema i think?
      optionals: gym.optionals.map((opt: Option) => { return optionToPurchase(opt, opt._id) }),

      fgColor: "",
      bgColor: "",
    } as Item;
    setItem(item);
  }
  function setCourse(course: Course, gym: Gym) {
    // values left to "item.xxx" are recycled from setGym
    let newItem = {
      _id: course._id,
      gymName: gym.name,
      courseName: course.name,
      type: "course",
      address: gym.address,
      description: course.description,
      optionals: gym.optionals.map((opt: Option) => { return optionToPurchase(opt, opt._id) }),

      fgColor: "",
      bgColor: "",
    } as Item;
    setItem(newItem);
  }

  const [item, setItem] = useState<Item>({
    _id: "1",
    gymName: "",
    courseName: "",
    type: "",
    address: "",
    description: "",
    optionals: [],

    fgColor: "",
    bgColor: "",
  });

  useEffect(() => {
    // TODO: rewrite the other way around (get the gym first, then the course if it exists)
    ApiCalls.getCourse(id!)
      .then((res) => {
        setSubscriptionBases(res.data.response.subscriptionOffers);
        let courseResponse = res.data.response;
        ApiCalls.getGym(res.data.response.gymId)
          .then((res) => {
            console.log(res);
            setGym(res.data.response);
            setCourse(courseResponse, res.data.response);
            setSubscriptionBases(res.data.response.subscriptionOffers);
          }).catch((err) => UnifiedErrorHandler.handle(err, "Could not load gym for course"));

        setLoading(false);
      })
      .catch((err) => {
        // it's not a course, so see if a corresponding gym exists
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

  /*let optionals: PurchaseOption[] = [
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
  ];*/
  function optionToPurchase(option: Option, colorHash: string): PurchaseOption {
    // technically, custom ones would be saved in the backend too, but that's way overkill
    let colorSchemas: [string, string][] = [
      ["#555", "#fff"],
      ["#CD9400", "#fff"],
      ["#f00", "#fff"],
      ["#fff", "#57f"],
    ];

    // copied from: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
    function simpleHash(str: string): number {
      var hash = 0, i, chr;
      if (str.length === 0) return hash;
      for (i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    };

    let h = simpleHash(colorHash);
    return {
      ...option,
      bgColor: colorSchemas[h % colorSchemas.length][0],
      fgColor: colorSchemas[h % colorSchemas.length][1],
    } as PurchaseOption;
  }

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
            optionals={item.optionals}
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
            setEditable={setEditable}
          />
        </Grid>
      </Grid>
    </ChonkySpinner>
  );
};

export default CheckoutPage;
