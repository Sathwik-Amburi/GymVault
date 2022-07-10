import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";
import StripeConnected from "./stripe/StripeConnected";
import StripeOnboard from "./stripe/StripeOnboard";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";


const OwnerProfile: FC = () => {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
      }).catch((err) => UnifiedErrorHandler.handle(err, "Cannot get user profile"));
  }, []);



  return (
    <>
      <div>
        Hello dear gym owner {profile?.firstName} {profile?.lastName} ! Welcome
        to your dashboard
      </div>
      <div>Phone Number: {profile?.phoneNumber}</div>
      <div>Email: {profile?.email}</div>

      {profile?.payouts_enabled ? <StripeConnected/> : <StripeOnboard/>}

      

    </>
  );
}

export default OwnerProfile;
