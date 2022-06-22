import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontPage from "./components/FrontPage/FrontPage";
import Navbar from "./components/widgets/Navbar";
import GymViewPage from "./components/GymDetails";
import CourseViewPage from "./components/courseDetails";
import { Container } from "@mui/system";
import ResultsPage from "./components/ResultsPage";
import CheckoutPage from "./components/CheckoutPage";
import UserSubscriptionsPage from "./components/UserSubscriptionsPage";
import SignUpPage from "./components/SignUpPage"
import EmailConfirmationPage from "./components/EmailConfirmationPage"

const App: FC = () => {
  return (
    <>
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
            <Route path="/user/confirmation" element={<EmailConfirmationPage />} />
            <Route path="/user/login" element={<>TODO</>} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/buy/:id" element={<CheckoutPage />} />
            <Route
              path="/*"
              element={
                <>
                  <br />
                  <br />
                  <br />
                  404 lol
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
