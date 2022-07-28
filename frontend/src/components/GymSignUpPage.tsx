import { Typography } from "@mui/material";
import { FC } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const GymSignUpPage: FC = () => {
  return (
    <div
      style={{ padding: "10%", borderRadius: "1rem", backgroundColor: "#eee" }}
    >
      <Typography variant="h4">
        <ContactPageIcon fontSize="large" />
        Contact us at gymvault@gmail.com!
      </Typography>
      <Typography variant="body1" style={{ marginTop: "1rem" }}>
        Hi!, Thank you for your interest in signing up as gym. Please contact us
        at the above email and we will provide you with your own login details.
        Thank you!.
      </Typography>
    </div>
  );
};

export default GymSignUpPage;
