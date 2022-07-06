import { Button } from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";


const OwnerProfile: FC = () => {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const [loading, setLoading] = useState<boolean>(false)
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  useEffect(() => {
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
      }).catch((err) => UnifiedErrorHandler.handle(err, "Cannot get user profile"));
  }, []);

  const handleClick = async () => {

    const headers = {"x-access-token": String(localStorage.getItem('token'))}
    setLoading(true)
    let response = await axios.post('/stripe/connect', {}, {headers})
    window.location.href = response.data.link
  }

  return (
    <>
      <div>
        Hello dear gym owner {profile?.firstName} {profile?.lastName} ! Welcome
        to your dashboard
      </div>
      <div>Phone Number: {profile?.phoneNumber}</div>
      <div>Email: {profile?.email}</div>

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px 10px", marginTop:"40px" }}>
        <i style={{ margin: "20px 0", fontSize: "90px" }} className="fa-brands fa-cc-stripe" aria-hidden="true"></i>
        <div style={{ margin: "20px 0" }}><b>Set up your payouts to be able to post your gym for everyone to enjoy!</b> </div>
        {!loading ? <Button onClick={handleClick} variant="contained">Onboard</Button> : <Button disabled onClick={handleClick} variant="contained">Processing . . .</Button>}
        <div style={{ fontSize: "12px", margin: "11px 3px", color:"grey" }}> <i>You will be redirected to Stripe to start the onboarding process</i> </div>
      </div>
    </>
  );
}

export default OwnerProfile;
