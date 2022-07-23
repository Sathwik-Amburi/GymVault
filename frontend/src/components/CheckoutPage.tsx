import { Card, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import { Course, CourseSession, Gym, Item, Option, PurchaseOption, SubscriptionOffers } from "../models/allModels";
import PurchaseGrid from "./widgets/PurchaseGrid";
import PurchaseCart, { CartItem } from "./widgets/PurchaseCart";
import ApiCalls from "../api/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import ColorGenerator from "./widgets/utilities/ColorGenerator";
import CourseScheduleTable from "./CourseScheduleTable";
import moment from "moment";


const CheckoutPage: FC = () => {
  const { id, returnState } = useParams<{
    id: string;
    returnState: string;
  }>();
  if (!id) {
    alert("No ID provided! This should NOT happen");
  }
  const [editable, setEditable] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [basePurchases, setBasePurchases] = useState<PurchaseOption[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [courseSessions, setCourseSessions] = useState<CourseSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] = useState<string>("choose one");

  function validateStartDate(date: string) {
    return !(
      !moment(date, "DD/MM/YYYY").isValid() || 
      moment(date, "DD/MM/YYYY").isAfter(moment().add(1, "month")) ||
      moment(date, "DD/MM/YYYY").isBefore(moment())
    );
  }

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
      optionals: gym.optionals == undefined ? [] : gym.optionals.map((opt: Option) => { return optionToPurchase(opt, opt._id) }),
      subscriptionOffers: gym.subscriptionOffers,

      fgColor: "",
      bgColor: "",
    } as Item;
    setItem(item);
  }
  function setCourse(course: Course, gym: Gym) {
    let newItem = {
      _id: course._id,
      gymName: gym.name,
      courseName: course.name,
      type: "course",
      address: gym.address,
      description: course.description,
      optionals: gym.optionals == undefined ? [] : gym.optionals.map((opt: Option) => { return optionToPurchase(opt, opt._id) }),

      fgColor: "",
      bgColor: "",
    } as Item;
    setItem(newItem);
    setCourseSessions(course.sessions);
  }

  const [item, setItem] = useState<Item>({
    _id: "1",
    gymName: "",
    courseName: "",
    type: "",
    address: "",
    description: "",
    optionals: [],
    subscriptionOffers: [],

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
            setGym(res.data.response);
            setSubscriptionBases(res.data.response.subscriptionOffers);

            setLoading(false);
          }).catch((err) => UnifiedErrorHandler.handle(err, "Neither a gym nor a course with this ID exists"));
            // navigate to 404?
      });
      
      /* /confirm route taken
      if(stripeCallback !== undefined) {
        // TODO: call APIs to check validity of ("confirm") purchase, and redirect if valid
        let uid = String(localStorage.getItem("token"));
        ApiCalls.checkOrPurchase(id!, uid, stripeCallback)
          .then((res) => {
            navigate("/user/tickets?highlight=" + id);
          }).catch((err) => UnifiedErrorHandler.handle(err, "(display): Error checking purchase"));
      }*/
  }, [id, navigate, returnState]);
  
  function optionToPurchase(option: Option, colorHash: string): PurchaseOption {
    return {
      ...option,
      bgColor: ColorGenerator.nameToColor(colorHash),
      fgColor: "white",
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
          { returnState == "cancelled" ? 
            <Card style={{
              borderRadius: "8px",
              backgroundColor: "#a00",
              color: "#fff",
              padding: "1em",
              marginTop: "1em",
              marginBottom: "1em",
            }}>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                This order has been cancelled
              </Typography>
              <Typography variant="body1">
                To buy this item, please proceed to the checkout once again
              </Typography>
            </Card>
            : null }
          <Typography variant="h4" style={{ fontWeight: "bold" }}>
            {item.courseName}
          </Typography>
          <hr />
          <Typography variant="body1">{item.description}</Typography>
          <br />
          <br />
          <br />
          

          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            When
          </Typography>
          <Typography variant="body2">
            The range of validity depends on your ticket type
          </Typography>
          <hr className="mini-hr" />
          { item.type == "course" ? <>
            <CourseScheduleTable courseSessions={ courseSessions } selected={selectedSession} setSelected={setSelectedSession} />
          </> : <>
            <br />
            <Grid container spacing={3}>
              <Grid item md={3} xs={6}>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  Start Date
                </Typography>
                <Typography variant="body1">
                  { selectedStartDate }
                </Typography>
              </Grid>
              <Grid item md={3} xs={6}>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  Duration
                </Typography>
                <Typography variant="body1">
                  { cart == undefined ? "-" : 
                    cart.length == 0 ? "-" :
                    cart[0]._id == "1" ? "One day" :
                    cart[0]._id == "2" ? "30 days" :
                    cart[0]._id == "3" ? "365 days" :
                    "-" 
                  }
                </Typography>
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  id="date"
                  type="date"
                  defaultValue={new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()}
                  inputProps={{
                    min: moment().format("YYYY-MM-DD"),
                    max: moment().add(1, "month").format("YYYY-MM-DD"),
                  }}
                  sx={{ width: 220 }}
                  onChange={(e) => { setSelectedStartDate(moment(e.target.value).format("DD/MM/YYYY")) }}
                  error={ !validateStartDate(selectedStartDate) }
                />
              </Grid>
            </Grid>
          </> }

          <br />
          <br />
          <br />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Order Summary
          </Typography>
          <hr className="mini-hr" />
          <PurchaseCart
            baseId={id!}
            startDate={selectedSession ? selectedSession : selectedStartDate }
            dateValidator={validateStartDate}
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
