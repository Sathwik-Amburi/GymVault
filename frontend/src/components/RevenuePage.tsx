import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RevenueTable from "./RevenueTable";

export default function RevenueOverview() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [subscriptions, setSubscriptions] = useState<any>([]);

  const getActiveSubscriptions = async () => {
    setLoaded(false);
    const headers = { "x-access-token": String(localStorage.getItem("token")) };
    try {
      let { data } = await axios.get(
        "/subscriptions/get-active-subscriptions",
        { headers }
      );
      setSubscriptions(data.subscriptions);
      setLoaded(true);
    } catch (error) {
      navigate("/user/owner-profile");
    }
  };

  useEffect(() => {
    getActiveSubscriptions();
  }, []);

  return (
    <>
      {loaded ? (
        subscriptions.length > 0 ? (
          <RevenueTable subscriptions={subscriptions} />
        ) : (
          <Container
            maxWidth="lg"
            style={{ padding: "2em", textAlign: "center" }}
          >
            <div className="twrapper">
              <i
                className="fa-solid fa-ticket"
                style={{ fontSize: "80px", marginBottom: "4vh" }}
              ></i>
              <div className="typing-demo">No Active Subscriptions.</div>
            </div>
            <br />
          </Container>
        )
      ) : (
        ""
      )}
    </>
  );
}
