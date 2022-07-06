import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";
import UserCard from "./widgets/userCard/UserCard"
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";
const UserProfile: FC = () => {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => UnifiedErrorHandler.handle(err, "TODO: The user you're seeing does not exist in the database"));
  }, []);

  return (
    <>
      {/*<div>*/}
      {/*  Hello {profile?.firstName} {profile?.lastName} ! Welcome to your user*/}
      {/*  profile !*/}
      {/*</div>*/}
      {/*<div>Phone Number: {profile?.phoneNumber}</div>*/}
      {/*<div>Email: {profile?.email}</div>*/}
      <UserCard
          firstName = {profile?.firstName}
          lastName = {profile?.lastName}
          email = {profile?.email}
          phNo = {profile?.phoneNumber}
      />
    </>
  );
};

export default UserProfile;
