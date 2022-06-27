import { FC, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Link from "@mui/material/Link";
import { Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setIsAuthenticated } from "../../store/slices/authenticationSlice";
import { useNavigate } from "react-router-dom";

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.isAuthenticated
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setIsAuthenticated(false));
    navigate("/");
  };

  const handleAvatarClick = () => {
    navigate("/user/profile");
  };

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <img src="/favicon.ico" alt="Gym Sport" style={{ height: "32px" }} />
        <Link
          href="/"
          variant="h6"
          color="inherit"
          noWrap
          style={{ fontWeight: "bold", textDecoration: "none" }}
          sx={{ flexGrow: 1, paddingLeft: "1em" }}
        >
          GymVault
        </Link>
        {!isAuthenticated && (
          <>
            <Button
              color="inherit"
              variant="outlined"
              style={{ marginRight: 16 }}
              href="/user/login"
            >
              Log in
            </Button>
            <Button
              color="primary"
              variant="outlined"
              style={{ marginRight: 16 }}
              href="/user/signup"
            >
              Sign up
            </Button>
          </>
        )}

        {isAuthenticated && (
          <>
            <Button
              href="/user/tickets"
              color="inherit"
              variant="outlined"
              style={{ marginRight: 16 }}
            >
              My Tickets
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              style={{ marginRight: 16 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            {/* <Avatar
              alt="User"
              src="/avatar.jpg"
              style={{ marginRight: 16 }}
              sx={{ bgcolor: "teal" }}
              onClick={handleAvatarClick}
            /> */}
            <Link href="/user/profile">
              <Avatar
                alt="Firstname Lastname"
                src="/avatar.jpg"
                style={{ marginRight: 16 }}
                sx={{ bgcolor: "teal" }}
              />
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
