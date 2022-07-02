import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import mainLogo from "../images/gymvault.png";
import axios from "axios";
import SearchType from "./SearchType";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

/* retrieved from: https://mui.com/material-ui/getting-started/templates/pricing/*/

export default function FrontPage() {
  let [filter, setFilter] = React.useState<string>("gym");
  let [gymButton, setGymButton] = React.useState<object>({
    backgroundColor: "#3259ad",
    color: "white",
  });
  let [courseButton, setCourseButton] = React.useState<object>({});

  const toggle = (event: any) => {
    if (filter == "gym") {
      setFilter("course");
      setGymButton({});
      setCourseButton({ backgroundColor: "#3259ad", color: "white" });
    } else {
      setFilter("gym");
      setGymButton({ backgroundColor: "#3259ad", color: "white" });
      setCourseButton({});
    }
  };

  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          GymVault{" "}
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
        </Typography>
        <div
          style={{ whiteSpace: "pre-wrap", color: "grey", fontStyle: "italic" }}
        >
          We help gym owners and clients <b>connect faster, easier, and hassle-free</b>.
          Browse our large gym and course catalog, choose the one that matches your exact
          needs, and pay only for what you use. All fully digitally.
        </div>
      </Container>
      <Container maxWidth="md" component="main">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: "50px",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "1em", color: "grey" }}>
            Look for
          </span>

          <ToggleButtonGroup
            // value={alignment}
            exclusive
            // onChange={handleAlignment}
            aria-label="text alignment"
          >
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
          </ToggleButtonGroup>
        </div>
        {filter === "gym" ? (
          <SearchType type="gyms" />
        ) : (
          <SearchType type="courses" />
        )}
      </Container>
    </React.Fragment>
  );
}
