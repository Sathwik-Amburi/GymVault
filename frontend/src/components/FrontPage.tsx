import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import mainLogo from "../images/gymvault.png";
import SearchType from "./SearchType";

import ToggleButton from "@mui/material/ToggleButton";
import { Button, Card, Grid } from "@mui/material";

/* retrieved from: https://mui.com/material-ui/getting-started/templates/pricing/*/

export default function FrontPage() {
  let [filter, setFilter] = React.useState<string>("gym");
  let [gymButton, setGymButton] = React.useState<object>({
    backgroundColor: "#3B66A5",
    color: "white",
    fontWeight: "bold",
  });
  let [courseButton, setCourseButton] = React.useState<object>({});

  const toggle = (event: any) => {
    if (filter == "gym") {
      setFilter("course");
      setGymButton({});
      setCourseButton({
        backgroundColor: "#3B66A5",
        color: "white",
        fontWeight: "bold",
      });
    } else {
      setFilter("gym");
      setGymButton({
        backgroundColor: "#3B66A5",
        color: "white",
        fontWeight: "bold",
      });
      setCourseButton({});
    }
  };

  return (
    <Container maxWidth="lg">
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Grid
        container
        spacing={3}
        style={{ textAlign: "center", padding: "5em" }}
      >
        <Grid item xs={12}>
          <img
            src={mainLogo}
            style={{
              width: "110px",
              height: "100px",
              position: "relative",
              top: "14px",
            }}
            alt="fireSpot"
          />
          <Typography
            component="h1"
            variant="h3"
            color="text.primary"
            style={{ display: "inline-block", margin: "0.5em" }}
            gutterBottom
          >
            GymVault
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Typography variant="h6" color="text.primary" gutterBottom>
            We help gym owners and clients connect{" "}
            <b>faster, easier, and hassle-free</b>
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} maxWidth="lg" style={{ padding: "5em" }}>
        <Grid item md={6} xs={12}>
          <Typography
            component="h2"
            variant="h5"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Find your next gym
          </Typography>
          <Typography
            component="h6"
            variant="body2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Browse our large gym and course catalog, choose the one that matches
            your exact needs, and pay only for what you use. All fully
            digitally.
          </Typography>
        </Grid>
        <Grid item md={2} xs={4}>
          <i
            className="fas fa-football"
            style={{ fontSize: "2em", float: "right", color: "#3B66A5" }}
          />
          <Typography
            component="h2"
            variant="body1"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            By Course
          </Typography>
          Learn new sports without the hassle of paperwork
        </Grid>
        <Grid item md={2} xs={4}>
          <i
            className="fas fa-mug-hot"
            style={{ fontSize: "2em", float: "right", color: "#3B66A5" }}
          />
          <Typography
            component="h2"
            variant="body1"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            By Services
          </Typography>
          Filter by amenities, subscription types, and pricing
        </Grid>
        <Grid item md={2} xs={4}>
          <i
            className="fas fa-bicycle"
            style={{ fontSize: "2em", float: "right", color: "#3B66A5" }}
          />
          <Typography
            component="h2"
            variant="body1"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            By Location
          </Typography>
          Be it at home or on the road, we have you covered.
        </Grid>
      </Grid>

      <Card elevation={3} style={{ borderRadius: "20px", margin: "3em" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5em",
            padding: "3em",
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            style={{ fontWeight: "bold", marginRight: "1em" }}
          >
            Show me
          </Typography>

          <ToggleButton
            size="small"
            onClick={toggle}
            style={gymButton}
            value="left"
            aria-label="left aligned"
          >
            Gyms
          </ToggleButton>
          <ToggleButton
            size="small"
            onClick={toggle}
            style={courseButton}
            value="right"
            aria-label="right aligned"
          >
            Courses
          </ToggleButton>
        </div>
        {filter === "gym" ? (
          <SearchType type="gyms" />
        ) : (
          <SearchType type="courses" />
        )}
      </Card>

      <Grid container spacing={3} style={{ paddingTop: "5em" }}>
        <Grid item md={6} xs={12}>
          <Typography
            component="h2"
            variant="h5"
            align="left"
            color="text.primary"
            gutterBottom
          >
            Our partners around Germany
          </Typography>
          <Typography
            component="h6"
            variant="body2"
            align="left"
            color="text.primary"
            gutterBottom
          >
            We have a large network of partners in Germany, so you can find the
            fitness centre that is closest to you, and that better satisfies
            your needs.
          </Typography>
        </Grid>
        <Grid item md={1} xs={12}></Grid>
        <Grid item md={5} xs={12}>
          <Card elevation={3} style={{ borderRadius: "20px", padding: "3em" }}>
            <Typography
              component="h2"
              variant="h5"
              align="right"
              color="text.primary"
              gutterBottom
            >
              Happen to own a gym?
            </Typography>
            <Typography
              component="h6"
              variant="body2"
              align="right"
              color="text.primary"
              gutterBottom
            >
              If so, you can list your gym to our platform.
              <br />
              It's free, and we will show it to our users right away.
            </Typography>
            <br />
            <Typography
              variant="body2"
              align="right"
              color="text.secondary"
              style={{ fontSize: "0.8em" }}
              gutterBottom
            >
              We will only take a share for each transaction processed by our
              users. Get in touch, and our team will tell you more.
            </Typography>
            <br />
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: "#3B66A5",
                color: "white",
                fontWeight: "bold",
                marginTop: "1em",
                float: "right",
              }}
              href="/gym-signup"
            >
              Add your gym
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
