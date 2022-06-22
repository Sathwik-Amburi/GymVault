import { FC, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Link from "@mui/material/Link";
import { Avatar, Button } from "@mui/material";

const Navbar: FC = () => {
  const [user, setUser] = useState<string>("");
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
        { !user && ( <Button color="inherit" variant="outlined" style={{ marginRight: 16 }} href="/user/signin">
          Log in
        </Button> ) }
        { !user && ( <Button color="primary" variant="outlined" style={{ marginRight: 16 }} href="/user/signup">
          Sign up
        </Button> ) }

        { user && ( <Button color="inherit" variant="outlined" style={{ marginRight: 16 }}>
          My Tickets
        </Button> ) }
        { user && ( <Avatar alt="User" src="/avatar.jpg" style={{ marginRight: 16 }} sx={{bgcolor: "teal" }} /> ) }

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
