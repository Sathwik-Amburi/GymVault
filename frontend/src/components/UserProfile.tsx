import axios from "axios";
import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";
import UserCard from "./widgets/userCard/UserCard"
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const UserProfile: FC = () => {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const [loaded, setLoaded] = useState<Boolean>(false)
  const token = localStorage.getItem("token");

  useEffect(() => {
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
        setLoaded(true)
      })
      .catch((err) => UnifiedErrorHandler.handle(err, "TODO: The user you're seeing does not exist in the database"));
  }, []);



  return (
    <>

      {loaded? <UserCard {... profile} /> : ''}

    </>
  );
};

export default UserProfile;
