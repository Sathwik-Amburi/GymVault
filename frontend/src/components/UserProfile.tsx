import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApiCalls from "../api/apiCalls";
import { UserProfileDetails } from "../models/allModels";
import { setErrorAlert } from "../store/slices/errorAlertSlice";
import UserCard from "./widgets/userCard/UserCard";
import UnifiedErrorHandler from "./widgets/utilities/UnifiedErrorHandler";

const UserProfile: FC = () => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<UserProfileDetails>();
  const [loaded, setLoaded] = useState<Boolean>(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    ApiCalls.getUserProfile(token)
      .then((res) => {
        setProfile(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        UnifiedErrorHandler.handle(err);
        dispatch(
          setErrorAlert({
            showError: true,
            errorMessage: "Error while fetching user",
          })
        );
      });
  }, []);

  return <>{loaded ? <UserCard {...profile} /> : ""}</>;
};

export default UserProfile;
