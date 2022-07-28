import { Button } from "@mui/material";
import Typography from '@mui/material/Typography';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
export default function EmailConfirmationPage() {
  return (
    <div><div
        style={{ padding: "10%", borderRadius: "1rem", backgroundColor: "#eee" }}
    >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Welcome to GymVault
        </Typography>
        <Typography variant="h4">
            <VerifiedUserIcon sx={{mt:1,mr:2,fontSize: 32 }} />
            Thank you for verifying your account.
        </Typography>
        <Typography variant="body1" style={{ marginTop: "1rem", textAlign:"right" }}>
            <Button variant="contained" href="/user/login">
                Go to login
            </Button>
        </Typography>
    </div>
    </div>
  );
}
