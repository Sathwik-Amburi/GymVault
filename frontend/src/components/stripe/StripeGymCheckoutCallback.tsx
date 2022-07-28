import { Paper, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setErrorAlert } from "../../store/slices/errorAlertSlice";
import ChonkySpinner from "../widgets/ChonkySpinner";

function StripeCallback() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { gym_id } = useParams(); // gym id

  useEffect(() => {
    getPaymentStatus();
  }, []);

  const getPaymentStatus = async () => {
    try {
      const headers = {
        "x-access-token": String(localStorage.getItem("token")),
      };
      let response = await axios.get("/stripe/get-payment-status", { headers });
      if (response.data.paid === true) {
        // TODO: API POST Request to add record in subscriptions table to register user to gym with id: gym_id
        return navigate("/user/tickets?highlight=" + gym_id);
      } else {
        // payment associated with session is incomplete (payment_status: unpaid)

        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Payment incomplete",
          })
        );

        navigate("/user/unauthorized");
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setErrorAlert({
          showError: true,
          errorMessage: "No stripe session initiated",
        })
      );
      navigate("/user/unauthorized");
    }
  };

  return (
    <>
      <Paper elevation={3} style={{ padding: "1em" }}>
        <ChonkySpinner loading={true}>
          <></>
        </ChonkySpinner>
        <Typography variant="h5" style={{ display: "inline-block" }}>
          Processing payment
        </Typography>
        <Typography variant="body1">You will be redirected soon.</Typography>
      </Paper>
    </>
  );
}

export default StripeCallback;
