import React, { useEffect } from 'react'
import { Button } from "@mui/material";
import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DiscountsModal from '../DiscountsModal';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import home from '../../images/gymhome.jpg'
import CircularProgress from '@mui/material/CircularProgress';


interface StripeConnectProps {
    gymAddPermission: boolean;
}


const StripeConnect: FC<StripeConnectProps> = (props: any) => {

    const [loaded, setLoaded] = useState<boolean>(false)
    const [processing, setProcessing] = useState<boolean>(false)
    const [availableBalances, setAvailableBalances] = useState<Array<any>>([])
    const [pendingBalances, setPendingBalances] = useState<Array<any>>([])
    const [gym, setGym] = useState<string>("")
    const [activeSubs, setActiveSubs] = useState<number>(0)

    const navigate = useNavigate()

    useEffect(() => {
        getGym()
        getBalances()
        countActiveSubscriptions()
        setTimeout(() => {
            setLoaded(true)
        }, 1000)

    }, [])

    const getBalances = async () => {
        const headers = { "x-access-token": String(localStorage.getItem('token')) }
        let { data } = await axios.get('/stripe/balances', { headers })
        setAvailableBalances(data.balances.available)
        setPendingBalances(data.balances.pending)
    }

    const getGym = async () => {
        const headers = { "x-access-token": String(localStorage.getItem('token')) }
        let { data } = await axios.get('/gyms/get-gym-by-owner', { headers })
        setGym(data.gym.name)
    }

    const countActiveSubscriptions = async () => {
        const headers = { "x-access-token": String(localStorage.getItem('token')) }
        let { data } = await axios.get('/subscriptions/count-active-subscriptions', { headers })
        setActiveSubs(data.countActiveSubscriptions)
    }

    const handlePayoutSettings = async () => {
        const headers = { "x-access-token": String(localStorage.getItem('token')) }
        setProcessing(true)
        let response = await axios.post('/stripe/edit-payout-settings', {}, { headers })
        window.location.href = response.data.link
    }

    const navigateToOverview = () => {
        props.gymAddPermission ? navigate('/gym/add') : navigate("/gym/revenue-overview")

    }

    return (
        <div>
            <div style={loaded ? { display: 'none' } : { display: 'block' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'relative', top: '25vh' }}>
                    <CircularProgress size={180} />
                </Box>
            </div>

            <div style={loaded ? { display: 'block' } : { display: 'none' }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "10px 10px", marginTop: "40px" }}>

                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            '& > :not(style)': {
                                m: 1,
                                width: 296,
                                height: 296,
                            },
                        }}
                    >
                        <Paper onClick={navigateToOverview} style={{
                            cursor: 'pointer', marginBottom: "25px", borderRadius: "15px 50px 30px", outline: '2px solid #d1d1d1',
                        }} elevation={3}>


                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px' }}>
                                <img src={home} style={{ width: "190px" }} alt="" />
                                <div style={{ textAlign: 'center', padding: '5px', fontWeight: 'bold', fontSize: '21px' }}>{gym}</div>
                                {activeSubs > 0 ? <div style={{ color: 'darkblue', fontSize: '14px' }}>{activeSubs} active {activeSubs == 1 ? 'subscription' : 'subscriptions'}</div> : ''}
                                {props.gymAddPermission ? <div style={{ textAlign: "center", margin: "15px" }}>
                                    <Button onClick={() => navigate('/gym/add')} variant="outlined"> <i style={{ fontSize: '27px', padding: "4px" }} className="fa-solid fa-dumbbell" aria-hidden="true"></i> Add Gym</Button>
                                </div> : ''}
                            </div>

                        </Paper>
                    </Box>



                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>

                        <div style={{ textAlign: "center", margin: "15px" }}>
                            <Button disabled={processing} onClick={handlePayoutSettings} variant="outlined"><i style={{ fontSize: '27px', padding: "4px" }} className="fa-solid fa-money-check" aria-hidden="true"></i>{processing ? 'Processing . . . ' : 'Manage Earnings'}</Button>
                            <div style={{ fontSize: "12px", margin: "11px 3px", color: "grey" }}> <i>You will be redirected to your Stripe Connect dashboard</i> </div>
                        </div>


                        <div style={{ textAlign: "center", margin: "15px" }}>
                            <DiscountsModal />
                            <div style={{ fontSize: "12px", margin: "11px 3px", color: "grey" }}> <i>You can add discounts to your gym's subscription here</i> </div>
                        </div>
                    </div>



                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", margin: "15px 40px", padding: "9px 15px", backgroundColor: "#f5f5f5", borderRadius: "25px" }}>
                            <div style={{ color: "green", fontSize: "20px" }}> <i style={{ fontSize: "30px" }} className="fa-solid fa-sack-dollar"></i> Available Balance </div>
                            {availableBalances.map((item) => <div style={{ color: "green", fontSize: "25px" }}> <b>{item.amount / 100} {item.currency.toUpperCase()}</b></div>)}
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", margin: "15px 40px", padding: "9px 15px", backgroundColor: "#f5f5f5", borderRadius: "25px" }}>
                            <div style={{ color: "green", fontSize: "20px" }}> <i style={{ fontSize: "30px" }} className="fas fa-clock"></i> Incoming Balance </div>
                            {pendingBalances.map((item) => <div style={{ color: "green", fontSize: "25px" }}> <b>{item.amount / 100} {item.currency.toUpperCase()}</b></div>)}
                        </div>
                    </div>




                </div>
            </div>


        </div>
    );
}

export default StripeConnect
