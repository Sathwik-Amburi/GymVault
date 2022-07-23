import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Link from "@mui/material/Link";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setAuthentication } from "../../store/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";
import userIcon from "../../images/usericon.png";
import { S3_BASE_URL } from "../../config/config";

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.isAuthenticated
  );
  // alert(isAuthenticated)
  const role = useSelector((state: RootState) => state.authentication.role);
  let url = useSelector((state: RootState) => state.profilePicture.url);
  const profilePicture = url ? `${S3_BASE_URL}/${url}` : userIcon;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch(setAuthentication({ isAuthenticated: false, role: "" }));
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/user/login");
  };

  const handleSignUpClick = () => {
    navigate("/user/signup");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleTicketsClick = () => {
    navigate("/user/tickets");
  };

  const handleDashboardClick = () => {
    navigate("/user/owner-profile");
  };

  const handleAvatarClick = () => {
    if (role === "gym_owner") {
      navigate("/user/owner-profile");
    } else {
      navigate("/user/profile");
    }
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <img src="/favicon.ico" alt="Gym Sport" style={{ height: "32px" }} />
        <Link
          onClick={handleLogoClick}
          variant="h6"
          color="inherit"
          noWrap
          style={{
            fontWeight: "bold",
            textDecoration: "none",
            cursor: "pointer",
          }}
          sx={{ flexGrow: 1, paddingLeft: "1em" }}
        >
          GymVault
        </Link>
        {!isAuthenticated && (
          <>
            <Button
              color="primary"
              variant="text"
              style={{
                marginRight: 16,
                background: "white",
                fontWeight: "bold",
              }}
              onClick={handleLoginClick}
            >
              Log in
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              style={{ marginRight: 16, color: "white", fontWeight: "bold" }}
              onClick={handleSignUpClick}
            >
              Sign up
            </Button>
          </>
        )}

        {isAuthenticated && (
          <>
            {role === "gym_owner" ? (
              <Button
                onClick={handleDashboardClick}
                color="inherit"
                variant="outlined"
                style={{ marginRight: 16 }}
              >
                My Dashboard
              </Button>
            ) : (
              <Button
                onClick={handleTicketsClick}
                color="inherit"
                variant="outlined"
                style={{ marginRight: 16 }}
              >
                My Tickets
              </Button>
            )}
            <Button
              color="inherit"
              variant="outlined"
              style={{ marginRight: 16 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Avatar
              onClick={handleAvatarClick}
              alt="Firstname Lastname"
              src={String(profilePicture)}
              style={{ marginRight: 16, cursor: "pointer" }}
              sx={{ bgcolor: "teal" }}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
