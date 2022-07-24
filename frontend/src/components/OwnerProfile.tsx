import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";
import StripeConnected from "./stripe/StripeConnected";
import StripeOnboard from "./stripe/StripeOnboard";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";


const OwnerProfile: FC = () => {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const [loaded, setLoaded] = useState<boolean>(false)
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoaded(false)
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
        setLoaded(true)
      }).catch((err) => UnifiedErrorHandler.handle(err, "Cannot get user profile"));
  }, [token]);



  return (
    <>
      <div>
        Welcome to your dashboard, {profile?.firstName} {profile?.lastName}
      </div>
      {loaded ? (profile?.payouts_enabled ? <StripeConnected/> : <StripeOnboard/>): ''}

      

    </>
  );
}

export default OwnerProfile;
