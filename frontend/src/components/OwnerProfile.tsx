import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";
import StripeConnected from "./stripe/StripeConnected";
import StripeOnboard from "./stripe/StripeOnboard";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";


const OwnerProfile: FC = () => {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const [loaded, setLoaded] = useState<boolean>(false)
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  const [gymAddPermission, setGymAddPermission] = useState<boolean>(false)

  useEffect(() => {
    setLoaded(false)
    checkPermission().then((val) => {
      val === "allowed" ? setGymAddPermission(true) : setGymAddPermission(false)
    })
        
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
        setLoaded(true)
      }).catch((err) => UnifiedErrorHandler.handle(err, "Cannot get user profile"));
  }, [token]);


  const checkPermission = async () => {
    try {
      const headers = { "x-access-token": String(localStorage.getItem('token')) }
      const { data } = await axios.get('/gyms/add-permission', { headers })
      return "allowed"
    } catch (error) {
      return "notAllowed"
    }
  }



  return (
    <>
      {/* <div>
        Welcome to your dashboard, {profile?.firstName} {profile?.lastName}
      </div> */}
      {loaded ? (profile?.payouts_enabled ? <StripeConnected gymAddPermission={gymAddPermission}/> : <StripeOnboard/>): ''}
    </>
  );
}

export default OwnerProfile;
