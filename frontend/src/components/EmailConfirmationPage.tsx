import { Typography, Paper } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

const EmailConfirmationPage: FC = () => {
  const { email } = useParams();
  return (
    <div
      style={{ padding: "10%", borderRadius: "1rem", backgroundColor: "#eee" }}
    >
      <Typography variant="h4">
        <i className="fas fa-paper-plane" style={{ paddingRight: "0.5em" }} />
        Check your Inbox!
      </Typography>
      <Typography variant="body1" style={{ marginTop: "1rem" }}>
        We have sent an email to <b>{email}</b> with a link to confirm your
        email address.
      </Typography>
    </div>
  );
};

export default EmailConfirmationPage;
