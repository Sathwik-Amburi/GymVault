import { FC, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ApiCalls from "../api/apiCalls";
import { NavLink, useNavigate } from "react-router-dom";
import { ValidationState } from "./SignUpPage";
import { useDispatch } from "react-redux";
import { setAuthentication } from "../store/slices/authenticationSlice";
import style from "../css/google.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const theme = createTheme();

const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registrationValidation, setRegistrationValidation] =
    useState<ValidationState>({
      status: "",
      message: "",
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email")!.toString();
    let password = data.get("password")!.toString();
    ApiCalls.userLogin(email, password)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        dispatch(
          setAuthentication({ isAuthenticated: true, role: res.data.role })
        );
        if (res.data.role === "gym_owner") {
          navigate("/user/owner-profile");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        if (
          error.response.data.error.type === "INVALID_CREDENTIALS" ||
          error.response.data.error.type === "EMAIL_NOT_VERIFIED" ||
          error.response.data.error.type === "EMAIL_NOT_FOUND"
        ) {
          setRegistrationValidation({
            status: "error",
            message: error.response.data.error.message,
          });
        }
      });
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      let response = await axios.post("oauth/google", {
        token: tokenResponse,
        flow: "auth",
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", "user");
        dispatch(setAuthentication({ isAuthenticated: true, role: "user" }));
        navigate("/");
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              error={registrationValidation.status === "error" ? true : false}
              helperText={
                registrationValidation.status === "error"
                  ? registrationValidation.message
                  : null
              }
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <button
              type="button"
              onClick={() => googleLogin()}
              className={style.google}
            >
              Google Login
            </button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <NavLink to="/user/signup" style={{ color: "blue" }}>
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default LoginPage;
