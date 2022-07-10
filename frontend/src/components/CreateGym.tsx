import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, Select, Typography } from '@mui/material';
import Lightbox from './widgets/Lightbox';

export default function CreateGym() {
  let [images, setImages] = React.useState<string[]>([
    "https://thecatapi.com/api/images/get?format=src&type=png",
    "https://thecatapi.com/api/images/get?format=src&type=png&2",
    "https://thecatapi.com/api/images/get?format=src&type=png&3",
  ]);

  return (
    <Grid container spacing={3} style={{
      padding: "3em",
      borderRadius: "20px",
      backgroundColor: "#eee",
      marginTop: "3em",
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Grid item xs={12}>
        <Typography variant="h5" style={{fontWeight: "bold" }}>
          Welcome onboard
        </Typography>
        <Typography variant="body1">
          Please enter your gym details to start
        </Typography>
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          required
          fullWidth
          label="Name"
          placeholder="HyperGym"
          inputProps={{ style: {fontWeight: "bold" }}}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          label="Website"
          type="url"
          placeholder="https://hypergym.com"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline={true}
          fullWidth
          rows={4}
          label="Description"
          placeholder="A great gym in the heart of the city"
          variant="outlined"
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          Location
        </Typography>
        <Typography variant="body2">
          Where we'll find you
        </Typography>
        <hr className="mini-hr" />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField fullWidth
          label="Address"
          placeholder="Infinite Loop 1"
          required
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <Select fullWidth
          label="City"
          required
        >
          <option value="todo">TODO</option>

        </Select>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          Contact Info
        </Typography>
        <Typography variant="body2">
          How customers, and the GymVault staff, can reach you
        </Typography>
        <hr className="mini-hr" />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField fullWidth
          label="Email"
          type="email"
          defaultValue={"the one you're signed up with lol"}
          disabled
          required
        />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField fullWidth
          label="Phone"
          type="phone"
          placeholder="0049 123 4567890"
          required
        />
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          Subscriptions
        </Typography>
        <Typography variant="body2">
          What kind of entry tickets your customers can buy. All are optional
        </Typography>
        <hr className="mini-hr" />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Checkbox size="small" color="secondary" />
            <Typography variant="body1" style={{ display: "inline-block" }}>
              Daily Ticket
            </Typography>
            <br />
            <TextField
              fullWidth
              label="Price (EUR)"
              type="number"
              placeholder="6.69"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Checkbox size="small" color="secondary" />
            <Typography variant="body1" style={{ display: "inline-block" }}>
              Monthly Subscription
            </Typography>
            <br />
            <TextField
              fullWidth
              label="Price (EUR)"
              type="number"
              placeholder="69.69"
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Checkbox size="small" color="secondary" />
            <Typography variant="body1" style={{ display: "inline-block" }}>
              Yearly Subscription
            </Typography>
            <br />
            <TextField
              fullWidth
              label="Price (EUR)"
              type="number"
              placeholder="699.69"
            />
          </Grid>
        </Grid>
      </Grid>
      

      <Grid item xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          Courses
        </Typography>
        <Typography variant="body2">
          Sports classes that are offered separately from fixed subscriptions
        </Typography>
        <hr className="mini-hr" />
      </Grid>
      <Grid item xs={12} style={{ padding: "15em" }}>
        TODO courses UI - come up with something
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          Pictures
        </Typography>
        <Typography variant="body2">
          Paste in the URLs of the pictures you want to use on the right, see their preview on the left. Easy, right?
        </Typography>
        <hr className="mini-hr" />
      </Grid>
      <Grid item md={6} xs={12}>
        <Lightbox states={images} />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField fullWidth
          multiline
          placeholder={`https://hypergym.com/images/gym.jpg\nhttps://hypergym.com/images/gym2.jpg\n...`}
          required
          rows={20}
          label="Picture URLs (one per line)"
          onChange={(e) => {
            let urls = e.target.value.split("\n");
            setImages(urls);
          }}
        />
      </Grid>


      <Grid item xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          Offerings
        </Typography>
        <Typography variant="body2">
          What else you offer to your customers
        </Typography>
        <hr className="mini-hr" />
      </Grid>
      <Grid item md={6} xs={12}>
        <TextField fullWidth
          multiline
          rows={4}
          label="Amenities (one per line)"
          placeholder={`Sauna\nWheelchair Entrance\nFree Wi-Fi`}
        />
      </Grid>
      <Grid item md={6} xs={12}>
        TODO options-builder UI
      </Grid>

      <Grid item xs={12} style={{ marginTop: "5em" }} />
      <Grid item md={9} xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold" }}>
          All Done.
        </Typography>
        <Typography variant="body2">
          By continuing, you confirm your agreement to our Terms of Service. The gym will be visible to the public immediately.
        </Typography>
      </Grid>
      <Grid item md={3} xs={12}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={() => alert("lol")}
        >
          Create Gym
        </Button>
      </Grid>
    </Grid>
  );
}
