import { Typography } from "@mui/material";
import { FC } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import ContactPageIcon from "@mui/icons-material/ContactPage";
const ContactUs: FC = () => {
  return (
    <div
      style={{ padding: "10%", borderRadius: "1rem", backgroundColor: "#eee" }}
    >
      <Typography variant="h4">
        <ContactPageIcon fontSize="large" />
        Contact us at hello@gymvault.com
      </Typography>
      <Typography variant="body1" style={{ marginTop: "1rem" }}>
        We appreciate your feedback and questions. Please do not hesitate to
        contact us!
      </Typography>
    </div>
  );
};

export default ContactUs;
