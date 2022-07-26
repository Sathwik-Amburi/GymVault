import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Navbar from "./components/widgets/Navbar";
import GymViewPage from "./components/GymDetails";
import CourseViewPage from "./components/CourseDetails";
import { Container } from "@mui/system";
import ResultsPage from "./components/ResultsPage";
import CheckoutPage from "./components/CheckoutPage";
import UserSubscriptionsPage from "./components/UserSubscriptionsPage";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import EmailConfirmationPage from "./components/EmailConfirmationPage";
import PageNotFound from "./components/PageNotFound";

import "./index.css";

// EXP: use Montserrat font
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CourseResultsPage from "./components/CourseResultsPage";
import EmailConfirmedPage from "./components/EmailConfirmedPage";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import NotAuthorizedPage from "./components/NotAuthorizedPage";
import RoleWrapper from "./components/RoleWrapper";
import OwnerProfile from "./components/OwnerProfile";
import Terms from "./components/Terms";
import CreateGym from "./components/CreateGym";
import StripeConnectCallback from "./components/stripe/StripeConnectCallback";
import StripeGymCallback from "./components/stripe/StripeGymCheckoutCallback";
import Footer from "./components/Footer";
import GymSignUpPage from "./components/GymSignUpPage";
import ContactUs from "./components/ContactUs";

const THEME = createTheme({
  typography: {
    fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  palette: {
    primary: {
      main: "#D7053E",
    },
    secondary: {
      main: "#519DD9",
    },
    background: {
      default: "white",
    },
  },
});

const PrivateRoute: FC<any> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.authentication.isAuthenticated
  );

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={{ pathname: "/user/login" }} />
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={THEME}>
        <Navbar />
        <Routes>
          {/* Route without outer container*/}
          <Route
            path="/user/tickets"
            element={
              <PrivateRoute>
                <UserSubscriptionsPage />
              </PrivateRoute>
            }
          />
          {/* All other routes */}
          <Route
            path="/*"
            element={
              <>
                <Container maxWidth="lg" style={{ padding: "3em", position: "relative", minHeight: "90vh" }}>
                  <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/terms" element={<Terms />} />
                    {/* <Route path="/gym/add" element={<CreateGym />} /> */}
                    <Route path="/gym/:id" element={<GymViewPage />} />
                    <Route path="/course/:id" element={<CourseViewPage />} />
                    <Route path="/user/signup" element={<SignUpPage />} />
                    <Route
                      path="/user/confirmation/:email"
                      element={<EmailConfirmationPage />}
                    />
                    <Route
                      path="/user/email-verified"
                      element={<EmailConfirmedPage />}
                    />
                    <Route path="/user/login" element={<LoginPage />} />
                    <Route
                      path="/results/courses/search"
                      element={<CourseResultsPage />}
                    />

                    <Route
                      path="/results/gyms/search"
                      element={<ResultsPage />}
                    />
                    <Route
                      path="/buy/:id"
                      element={
                        <PrivateRoute>
                          <CheckoutPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/buy/:id/:returnState"
                      element={
                        <PrivateRoute>
                          <CheckoutPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/user/profile"
                      element={
                        <PrivateRoute>
                          <UserProfile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/stripe/connect/callback"
                      element={
                        <RoleWrapper allowedRoles={["gym_owner"]}>
                          <StripeConnectCallback />
                        </RoleWrapper>
                      }
                    />

                    <Route
                      path="/gym/add"
                      element={
                          <CreateGym />
                      }
                    />

                    <Route
                      path="/stripe/checkout/callback/gym/:gym_id"
                      element={
                        <PrivateRoute>
                          <StripeGymCallback />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/user/owner-profile"
                      element={
                        <RoleWrapper allowedRoles={["gym_owner"]}>
                          <OwnerProfile />
                        </RoleWrapper>
                      }
                    />

                    <Route
                      path="/user/unauthorized"
                      element={<NotAuthorizedPage />}
                    />
                    <Route path="/*" element={<PageNotFound />} />
                    <Route path="/gym-signup" element={<GymSignUpPage />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                  </Routes>
                </Container>
              </>
            }
          />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
