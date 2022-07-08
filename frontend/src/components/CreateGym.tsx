import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Select, Typography } from '@mui/material';

export default function CreateGym() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" style={{fontWeight: "bold" }}>
        Welcome onboard
      </Typography>
      <Typography variant="body1">
        Please enter your gym details to continue
      </Typography>
      <br />
      <div>
        <TextField
          required
          id="outlined-required"
          label="Name"
          placeholder="HyperGym"
        />
        <TextField
          id="outlined-read-only-input"
          label="Website"
          defaultValue="https://hypergym.com"
        />
        <TextField
          multiline={true}
          rows={4}
          id="p-description"
          label="Description"
          defaultValue="Default Value"
          variant="outlined"
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
    </Box>
  );
}
