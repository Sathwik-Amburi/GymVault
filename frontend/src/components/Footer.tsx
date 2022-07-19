import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from "@mui/material/Link";
import {useNavigate} from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CopyrightIcon from '@mui/icons-material/Copyright';

export default function Footer(){
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <>
        <Box position="static">
        <div className="footer">

                <Grid container>
                   <Grid className = "footer-logo" xs ={12} md={12}>
                       <img src="/favicon.ico" alt="Gym Sport" style={{ height: "32px" }} />
                       <Link
                           onClick={handleLogoClick}
                           variant="h6"
                           color="inherit"
                           noWrap
                           style={{ fontWeight: "bold", textDecoration: "none",  cursor: "pointer"}}
                           sx={{ flexGrow: 1, paddingLeft: "1em" }}
                       >GymVault
                       </Link>
                   </Grid>
                    <Grid className="footer-links">
                        <Link href="#" underline="hover" sx={{ p: 1 }} color = "#519DD9">
                            {"About Us"}
                        </Link><Link href="#" underline="hover" sx={{ p: 1 }} color = "#519DD9">
                        {'Contact Us'}
                    </Link><Link href="#" underline="hover" sx={{ p: 1 }} color = "#519DD9">
                        {"SignUp as a Gym!"}
                    </Link><Link href="#" underline="hover" sx={{ p: 1 }} color = "#519DD9">
                        {"Subscribe to our newsletter!"}
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
                    <Grid xs = {12} className="footer-links">
                        <Link href ="x" underline="hover" >
                           <CopyrightIcon /> 2022 GymVault. All Rights Reserved.
                        </Link>
                    </Grid>
                </Grid>


        </div>
        </Box>
        </>
    )

}