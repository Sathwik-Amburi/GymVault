import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";

const UserProfile: FC = () => {
  const [profile, setProfile] = useState<UserProfileDetails>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <div>
        Hello {profile?.firstName} {profile?.lastName} ! Welcome to your user
        profile !
      </div>
      <div>Phone Number: {profile?.phoneNumber}</div>
      <div>Email: {profile?.email}</div>
    </>
  );
};

export default UserProfile;
