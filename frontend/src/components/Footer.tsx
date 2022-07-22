// import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="/">
                GymVault
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/");
    };
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mt:'25vh',
            }}
        >
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }}
            >
                <Container maxWidth="sm">
                    <Grid container>
                        <Grid className="footer-logo" xs={12} md={12}>
                            <img src="/favicon.ico" alt="Gym Sport" style={{ height: "32px" }} />
                            <Link
                                onClick={handleLogoClick}
                                variant="h6"
                                color="inherit"
                                noWrap
                                style={{ fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}
                                sx={{ flexGrow: 1, paddingLeft: "1em" }}
                            >GymVault
                            </Link>
                        </Grid>
                        <Grid className="footer-links">
                            <Link href="#" underline="hover" sx={{ p: 1 }} color="#519DD9">
                                {"About Us"}
                            </Link><Link href="/contact-us" underline="hover" sx={{ p: 1 }} color="#519DD9">
                            {'Contact Us'}
                        </Link><Link href="/gym-signup" underline="hover" sx={{ p: 1 }} color="#519DD9">
                            {"SignUp as a Gym!"}
                        </Link>
                        </Grid>
                        <Grid className="footer-links">
                            <Link href="#" underline="hover" sx={{ p: 1 }} >
                                <FacebookIcon />
                            </Link><Link href="#" underline="hover" sx={{ p: 1 }}>
                            <InstagramIcon />
                        </Link><Link href="#" underline="hover" sx={{ p: 1 }}>
                            <TwitterIcon />
                        </Link>
                            <Link href="#" underline="hover" sx={{ p: 1 }}>
                                <LinkedInIcon />
                            </Link>
                        </Grid>
                        <Grid xs={12} className="footer-links">
                            <Copyright />
                        </Grid>
                    </Grid>

                </Container>
            </Box>
        </Box>
    );
}