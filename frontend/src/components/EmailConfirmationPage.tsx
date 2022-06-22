import * as React from 'react';
import Button from '@mui/material/Button';
export default function EmailConfirmationPage() {

    return (
        <div>
            <h1> Please check your email for further instructions!</h1>
             <Button variant="contained" href="/">
             Resend Email Confirmation
             </Button>
        </div>

    );
}
