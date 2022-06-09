import { FC, useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import ApiCalls from "../../api/apiCalls";
import { Gym } from "../../models/allModels";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/material/Menu";

const Navbar: FC = () => {
  return (  
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" component="div">
          Gym Vault
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
