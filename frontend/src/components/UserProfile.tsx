import axios from "axios";
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

  const handleChange = async (event: any) => {
    const file: File = event.target.files[0]

    // const formData = new FormData()
    // formData.append("file", event.target.files[0]);
    // formData.append("fileName", event.target.files[0].name);

    let response = await axios.post(`user/s3/putItem`, {fileName: file.name , type: file.type}, {headers: { "x-access-token": String(localStorage.getItem('token')) }})
    const url = response.data.url
    let headers = { 'Content-Type':  file.type }
    await axios.put(url, file, {headers})

  }

  return (
    <>
      {/*<div>*/}
      {/*  Hello {profile?.firstName} {profile?.lastName} ! Welcome to your user*/}
      {/*  profile !*/}
      {/*</div>*/}
      {/*<div>Phone Number: {profile?.phoneNumber}</div>*/}
      {/*<div>Email: {profile?.email}</div>*/}
      <UserCard
        firstName={profile?.firstName}
        lastName={profile?.lastName}
        email={profile?.email}
        phNo={profile?.phoneNumber}
      />

      <input
        type="file"
        accept="image/*"
        id="contained-button-file"
        onChange={handleChange}
      />
    </>
  );
};

export default UserProfile;
