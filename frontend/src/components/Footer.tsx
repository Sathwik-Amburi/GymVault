// import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CopyrightIcon from "@mui/icons-material/Copyright";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {"Copyright © "}
      GymVault {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "25vh",
        backgroundColor: "#DB0038",
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 1,
          px: 2,
          mt: "auto",
          boxShadow: 10,
        }}
      >
        <Container maxWidth="sm">
          <Grid container>
            <Grid className="footer-logo" xs={12} md={12}>
              <img
                src="/favicon.ico"
                alt="Gym Sport"
                style={{ height: "32px" }}
              />
              <Link
                onClick={handleLogoClick}
                variant="h6"
                color="inherit"
                noWrap
                style={{
                  fontWeight: "bold",
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                }}
                sx={{ flexGrow: 1, paddingLeft: "1em" }}
              >
                GymVault
              </Link>
            </Grid>
            <Grid className="footer-links" style={{ fontWeight: "bold" }}>
              <Link href="/" underline="hover" sx={{ p: 1, color: "white" }}>
                {"About Us"}
              </Link>
              <Link
                href="/contact-us"
                underline="hover"
                sx={{ p: 1, color: "white" }}
              >
                {"Contact Us"}
              </Link>
              <Link
                href="/gym-signup"
                underline="hover"
                sx={{ p: 1, color: "white" }}
              >
                {"Sign up as a Gym!"}
              </Link>
            </Grid>
            <Grid className="footer-links">
            {/*  <Link href="#" underline="hover" sx={{ p: 1, color: "white" }}>*/}
            {/*    <FacebookIcon sx={{ color: "white" }} />*/}
            {/*  </Link>*/}
            {/*  <Link href="#" underline="hover" sx={{ p: 1 }}>*/}
            {/*    <InstagramIcon sx={{ color: "white" }} />*/}
            {/*  </Link>*/}
            {/*  <Link href="#" underline="hover" sx={{ p: 1 }}>*/}
            {/*    <TwitterIcon sx={{ color: "white" }} />*/}
            {/*  </Link>*/}
            {/*  <Link href="#" underline="hover" sx={{ p: 1 }}>*/}
            {/*    <LinkedInIcon sx={{ color: "white" }} />*/}
            {/*  </Link>*/}

              <ul className="wrapper">
                  <li className="icon facebook">
                      <span className="tooltip">Facebook</span>
                      <span><i className="fab fa-facebook-f"></i></span>
                  </li>
                  <li className="icon twitter">
                      <span className="tooltip">Twitter</span>
                      <span><i className="fab fa-twitter"></i></span>
                  </li>
                  <li className="icon instagram">
                      <span className="tooltip">Instagram</span>
                      <span><i className="fab fa-instagram"></i></span>
                  </li>
                  <li className="icon youtube">
                      <span className="tooltip">Youtube</span>
                      <span><i className="fab fa-youtube"></i></span>
                  </li>
              </ul>
                </Grid>
            <Grid xs={12} className="footer-links">
              <Copyright />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
