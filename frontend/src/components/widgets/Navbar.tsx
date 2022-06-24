import { FC, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Link from "@mui/material/Link";
import { Avatar, Button } from "@mui/material";

const Navbar: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
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
              href="/user/signin"
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
            <Avatar
              alt="User"
              src="/avatar.jpg"
              style={{ marginRight: 16 }}
              sx={{ bgcolor: "teal" }}
            />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
