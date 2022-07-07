import React, { useEffect } from 'react'
import { Button } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from 'react-router-dom';


const OwnerHomePage: FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [availableBalances, setAvailableBalances] = useState<Array<any>>([])
    const [pendingBalances, setPendingBalances] = useState<Array<any>>([])

    const navigate = useNavigate()

    useEffect(() => {
        getBalances()
    })

    const getBalances = async () => {
        const headers = { "x-access-token": String(localStorage.getItem('token')) }
        let { data } = await axios.get('/stripe/balances', { headers })
        setAvailableBalances(data.balances.available)
        setPendingBalances(data.balances.pending)
    }

    const handlePayoutSettings = async () => {
        const headers = { "x-access-token": String(localStorage.getItem('token')) }
        setLoading(true)
        let response = await axios.post('/stripe/edit-payout-settings', {}, { headers })
        window.location.href = response.data.link
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px 10px", marginTop: "40px" }}>
                <i style={{ color: "#3a598c", textShadow: "7px 11px grey", margin: "20px 0", fontSize: "160px" }} className="fa fa-home" aria-hidden="true"></i>

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <div style={{ textAlign: "center", margin: "15px" }}>
                        {!loading ?
                            <Button onClick={handlePayoutSettings} variant="outlined"> <i style={{ fontSize: '27px', padding: "4px" }} className="fa-solid fa-money-check" aria-hidden="true"></i>Manage Earnings</Button>
                            : <Button disabled onClick={handlePayoutSettings} variant="outlined">Processing . . .</Button>}

                        <div style={{ fontSize: "12px", margin: "11px 3px", color: "grey" }}> <i>You will be redirected to your Stripe Connect dashboard</i> </div>
                    </div>

                    <div style={{ textAlign: "center", margin: "15px" }}>
                        <Button onClick={() => navigate('/gym/add')} variant="contained"> <i style={{ fontSize: '27px', padding: "4px" }} className="fa-solid fa-dumbbell" aria-hidden="true"></i> Gym Settings</Button>
                        <div style={{ fontSize: "12px", margin: "11px 3px", color: "grey" }}> <i>You can add/edit your gym's detail here</i> </div>
                    </div>
                </div>



                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", margin: "15px 40px", padding: "9px 15px", backgroundColor: "#f5f5f5", borderRadius: "25px" }}>
                        <div style={{ color: "green", fontSize: "20px" }}> <i style={{ fontSize: "30px" }} className="fa-solid fa-sack-dollar"></i> Available Balance </div>
                        {availableBalances.map((item) => <div style={{ color: "green", fontSize: "25px" }}> <b>{item.amount/100} {item.currency.toUpperCase()}</b></div> )}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", margin: "15px 40px", padding: "9px 15px", backgroundColor: "#f5f5f5", borderRadius: "25px" }}>
                        <div style={{ color: "green", fontSize: "20px" }}> <i style={{ fontSize: "30px" }} className="fas fa-clock"></i> Incoming Balance </div>
                        {pendingBalances.map((item) => <div style={{ color: "green", fontSize: "25px" }}> <b>{item.amount/100} {item.currency.toUpperCase()}</b></div> )}
                    </div>
                </div>




            </div>
        </div>
    );
}

export default OwnerHomePage
