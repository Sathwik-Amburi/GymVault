import { FC, useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

const Navbar: FC = () => {
  return (  
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <img src="/favicon.ico" alt="Gym Sport" style={{ height: "32px" }} />
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, paddingLeft: "1em" }}>
          <span style={{fontWeight: 'bold', cursor: 'pointer'}}>GymVault</span>
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
