import { FC, useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import ApiCalls from "../../api/apiCalls";
import { Gym } from "../../models/allModels";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/Menu";
import { Breadcrumbs, Button, Link } from "@mui/material";

const Navbar: FC = () => {
  return (  
    <AppBar position="static" color="default">
      <Toolbar>
        <img src="/favicon.ico" alt="Gym Sport" style={{ height: "32px" }} />
        <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }} style={{ paddingLeft: "1em" }}>
          Gym Vault
        </Typography>
        <Button color="inherit" variant="outlined" style={{ marginRight: 16 }}>
          Log in
        </Button>
        <Button color="primary" variant="outlined">
          Sign up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
