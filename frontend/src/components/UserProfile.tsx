import { FC, useEffect, useState } from "react";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";
import UserCard from "./widgets/userCard/UserCard"
import TicketCard from "./widgets/ticketCard/TicketCard";
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
        <TicketCard
            type = "course"
            gymName = "The Olympian Gym"
            address = "89 Film avenue, Hamburg, Germany"
            courseName = "Yoga for Beginners"
            description = "A basic course variating over Hatha Yoga, and meditation practices. Unlike the more static and strengthening Hatha yoga style, a Vinyasa class is very dynamic. The physical exercises, the so-called asanas, are not practised individually, but are strung together in flowing movements. The class is very calm and relaxed, and the students are able to focus on the breath and the body."

        />
    </>
  );
};

export default UserProfile;
