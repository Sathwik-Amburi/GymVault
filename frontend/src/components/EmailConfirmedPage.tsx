import { Button } from "@mui/material";

export default function EmailConfirmationPage() {
  return (
    <div>
      <h1> Welcome to GymVault</h1>
      <h2> Thank you for verifying your account =)</h2>
      <Button variant="contained" href="/user/signin">
        Go to login
      </Button>
    </div>
  );
}
