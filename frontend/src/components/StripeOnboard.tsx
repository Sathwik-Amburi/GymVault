import React from 'react'
import { Button } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";


const StripeOnboard : FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const handleClick = async () => {
        const headers = { "x-access-token": String(localStorage.getItem('token')) }
        setLoading(true)
        let response = await axios.post('/stripe/connect', {}, { headers })
        window.location.href = response.data.link
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px 10px", marginTop: "40px" }}>
                <i style={{ margin: "20px 0", fontSize: "90px" }} className="fa-brands fa-cc-stripe" aria-hidden="true"></i>
                <div style={{ margin: "20px 0" }}><b>Set up your payouts to be able to post your gym for everyone to enjoy!</b> </div>
                {!loading ? <Button onClick={handleClick} variant="contained">Onboard</Button> : <Button disabled onClick={handleClick} variant="contained">Processing . . .</Button>}
                <div style={{ fontSize: "12px", margin: "11px 3px", color: "grey" }}> <i>You will be redirected to Stripe to start the onboarding process</i> </div>
            </div>
        </>
    );
}

export default StripeOnboard
