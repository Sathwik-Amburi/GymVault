import * as React from 'react';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/* retrieved from: https://mui.com/material-ui/getting-started/templates/pricing/*/

export default function navBar() {
    return (
        <Toolbar sx={{ flexWrap: 'wrap', backgroundColor:'gray' }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <span style={{fontWeight: 'bold', cursor: 'pointer'}}>GymVault</span>
        </Typography>

        <Button href="#" variant="contained" sx={{ my: 1, mx: 1.5 }}>
          Login
        </Button>
        <Button href="#" variant="contained" sx={{ my: 1, mx: 1.5 }}>
          Register
        </Button>
      </Toolbar>
      )
}


