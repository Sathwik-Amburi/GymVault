import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StripeCallback() {
  let navigate = useNavigate();

  useEffect(() => {
    setStripeConnect();
  }, []);

  const setStripeConnect = async () => {
    try {
      const headers = {
        "x-access-token": String(localStorage.getItem("token")),
      };
      let response = await axios.post(
        "/stripe/set-stripeconnect-status",
        {},
        { headers }
      );
      response.data.payouts_enabled
        ? navigate("/gym/add")
        : navigate("/user/owner-profile");
    } catch (error) {
      // 403 error, normal user not allowed here
      navigate("/user/unauthorized");
    }
  };

  return (
    <>
      <div>Redirecting . . .</div>
    </>
  );
}

export default StripeCallback;
