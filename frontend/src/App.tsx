import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Navbar from "./components/widgets/Navbar";
import GymViewPage from "./components/GymDetails";
import CourseViewPage from "./components/courseDetails";
import { Container } from "@mui/system";
import ResultsPage from "./components/ResultsPage";
import CheckoutPage from "./components/CheckoutPage";
import UserSubscriptionsPage from "./components/UserSubscriptionsPage";
import SignUpPage from "./components/SignUpPage";
import SignInPage from "./components/SignInPage";
import EmailConfirmationPage from "./components/EmailConfirmationPage";
import PageNotFound from "./components/PageNotFound";

// EXP: use Montserrat font
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CourseResultsPage from "./components/CourseResultsPage";
import EmailConfirmedPage from "./components/EmailConfirmedPage";
const THEME = createTheme({
  typography: {
    fontFamily: `"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
    fontSize: 13,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const App: FC = () => {
  return (
    <ThemeProvider theme={THEME}>
      <Navbar />

      <Container maxWidth="lg" style={{ padding: "3em" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/gym/add" element={<>TODO</>} />
            <Route path="/gym/:id" element={<GymViewPage />} />
            <Route path="/gym/:id/reviews" element={<>TODO</>} />
            <Route path="/course/:id" element={<CourseViewPage />} />
            <Route path="/user/tickets" element={<UserSubscriptionsPage />} />
            <Route path="/user/signup" element={<SignUpPage />} />
            <Route
              path="/user/confirmation"
              element={<EmailConfirmationPage />}
            />
            <Route
              path="/user/email-verified"
              element={<EmailConfirmedPage />}
            />
            <Route path="/user/signin" element={<SignInPage />} />
            <Route
              path="/results/courses/search"
              element={<CourseResultsPage />}
            />
            <Route path="/results/gyms/search" element={<ResultsPage />} />
            <Route path="/buy/:id" element={<CheckoutPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
