import { Card, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";

import {
  Course,
  CourseSession,
  Gym,
  Item,
  Option,
  PurchaseOption,
  SubscriptionOffers,
  SubscriptionTypes,
} from "../models/allModels";
import PurchaseGrid from "./widgets/PurchaseGrid";
import PurchaseCart, { CartItem } from "./widgets/PurchaseCart";
import ApiCalls from "../api/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import ChonkySpinner from "./widgets/ChonkySpinner";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
import ColorGenerator from "./widgets/utilities/ColorGenerator";
import CourseScheduleTable from "./CourseScheduleTable";
import moment from "moment";
import { toCleanSubscriptionTypeFormat } from "../api/utils/formatters";
import EuropeanDatePicker from "./widgets/EuropeanDatePicker";
import { setErrorAlert } from "../store/slices/errorAlertSlice";
import { useDispatch } from "react-redux";

const CheckoutPage: FC = () => {
  const dispatch = useDispatch();
  const { id, returnState } = useParams<{
    id: string;
    returnState: string;
  }>();
  if (!id) {
    {
      dispatch(
        setErrorAlert({
          showError: true,
          errorMessage: "Error, no ID is provided",
        })
      );
    }
  }
  const [editable, setEditable] = useState(true);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [basePurchases, setBasePurchases] = useState<PurchaseOption[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [courseSessions, setCourseSessions] = useState<CourseSession[]>([]);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedStartDate, setSelectedStartDate] =
    useState<string>("choose one");

  function validateStartDate(date: string) {
    return !(
      !moment(date, "DD/MM/YYYY").isValid() ||
      moment(date, "DD/MM/YYYY").isAfter(moment().add(1, "month")) ||
      moment(date, "DD/MM/YYYY").isBefore(moment().startOf("day"))
    );
  }

  function setSubscriptionBases(subscriptionOffers: SubscriptionOffers[]) {
    if (subscriptionOffers !== undefined && subscriptionOffers.length > 0) {
      let items: PurchaseOption[] = [];
      subscriptionOffers.forEach((so) => {
        items.push({
          _id:
            so.subscriptionType === SubscriptionTypes.DAY_PASS
              ? "1"
              : so.subscriptionType === SubscriptionTypes.MONTHLY_PASS
              ? "2"
              : so.subscriptionType === SubscriptionTypes.YEARLY_PASS
              ? "3"
              : so.subscriptionType === SubscriptionTypes.SESSION_PASS
              ? "4"
              : "?",
          name: toCleanSubscriptionTypeFormat(so.subscriptionType),
          description: "Fixed duration, base-tier ticket",
          price: +so.subscriptionPrice.toFixed(2),
          priceDiscount: so.discount ? +((so.subscriptionPrice * (100 - so.discount)) / 100).toFixed(2) 
                                     : undefined,
          bgColor: "#030",
          fgColor: "#fff",
        } as PurchaseOption);
      });

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
      optionals:
        gym.optionals === undefined
          ? []
          : gym.optionals.map((opt: Option) => {
              return optionToPurchase(opt, opt._id);
            }),
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
      optionals:
        gym.optionals === undefined
          ? []
          : gym.optionals.map((opt: Option) => {
              return optionToPurchase(opt, opt._id);
            }),

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

    fgColor: "",
    bgColor: "",
  });

  useEffect(() => {
    // TODO: rewrite the other way around (get the gym first, then the course if it exists)
    ApiCalls.getCourse(id!)
      .then((res) => {
        let courseResponse = res.data.response;
        ApiCalls.getGym(res.data.response.gymId)
          .then((gymRes) => {
            setGym(gymRes.data.response);
            setCourse(courseResponse, gymRes.data.response);
            setSubscriptionBases(courseResponse.subscriptionOffers);
          })
          .catch((err) => {
            UnifiedErrorHandler.handle(err);
            dispatch(
              setErrorAlert({
                showError: true,
                errorMessage:
                  "Could not load gym for course. Please try again.",
              })
            );
          });

        setLoading(false);
      })
      .catch((err) => {
        // it's not a course, so see if a corresponding gym exists
        ApiCalls.getGym(id!)
          .then((res) => {
            setGym(res.data.response);
            setSubscriptionBases(res.data.response.subscriptionOffers);

            setLoading(false);
          })
          .catch((err) => {
            UnifiedErrorHandler.handle(err);
            dispatch(
              setErrorAlert({
                showError: true,
                errorMessage: "Neither a gym nor a course with this ID exists",
              })
            );
          });
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
          {returnState == "cancelled" ? (
            <Card
              style={{
                borderRadius: "8px",
                backgroundColor: "#a00",
                color: "#fff",
                padding: "1em",
                marginTop: "1em",
                marginBottom: "1em",
              }}
            >
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                This order has been cancelled
              </Typography>
              <Typography variant="body1">
                To buy this item, please proceed to the checkout once again
              </Typography>
            </Card>
          ) : null}
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
          {item.type == "course" &&
          cart.length > 0 &&
          cart[0].name ==
            toCleanSubscriptionTypeFormat(SubscriptionTypes.SESSION_PASS) ? (
            <>
              <CourseScheduleTable
                courseSessions={courseSessions}
                selected={selectedSession}
                setSelected={setSelectedSession}
                showNextSessionDate={true}
              />
            </>
          ) : (
            <>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <EuropeanDatePicker
                    defaultValue={new Date()}
                    min={moment().toDate()}
                    max={moment().add(1, "month").toDate()}
                    setValue={setSelectedStartDate}
                    value={selectedStartDate}
                    validator={validateStartDate}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Start Date
                  </Typography>
                  <Typography variant="body1">{selectedStartDate}</Typography>
                </Grid>
                <Grid item xs={6} style={{ textAlign: "right" }}>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    Duration
                  </Typography>
                  <Typography variant="body1">
                    {cart === undefined
                      ? "-"
                      : cart.length === 0
                      ? "-"
                      : cart[0].name ===
                        toCleanSubscriptionTypeFormat(
                          SubscriptionTypes.DAY_PASS
                        )
                      ? "One day"
                      : cart[0].name ===
                        toCleanSubscriptionTypeFormat(
                          SubscriptionTypes.SESSION_PASS
                        )
                      ? "One session"
                      : cart[0].name ===
                        toCleanSubscriptionTypeFormat(
                          SubscriptionTypes.MONTHLY_PASS
                        )
                      ? "30 days"
                      : cart[0].name ===
                        toCleanSubscriptionTypeFormat(
                          SubscriptionTypes.YEARLY_PASS
                        )
                      ? "365 days"
                      : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </>
          )}

          <br />
          <br />
          <br />
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Order Summary
          </Typography>
          <hr className="mini-hr" />
          <PurchaseCart
            baseId={id!}
            startDate={
              selectedSession &&
              cart[0].name ===
                toCleanSubscriptionTypeFormat(SubscriptionTypes.SESSION_PASS)
                ? selectedSession
                : selectedStartDate
            }
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
