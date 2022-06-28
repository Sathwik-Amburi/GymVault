import { Typography } from "@mui/material";
import { FC } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const NotAuthorizedPage: FC = () => {
  return (
    <div
      style={{ padding: "10%", borderRadius: "1rem", backgroundColor: "#eee" }}
    >
      <Typography variant="h4">
        <i className="fas fa-lock" style={{ paddingRight: "0.5em" }} />
        Access denied
      </Typography>
      <Typography variant="body1" style={{ marginTop: "1rem" }}>
        Sorry, but it seems you are not authorized to access this page. If you
        believe this is a mistake, please contact the admins
      </Typography>
    </div>
  );
};

export default NotAuthorizedPage;
