import { CircularProgress, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import NotAuthorizedPage from '../NotAuthorizedPage';
import ChonkySpinner from '../widgets/ChonkySpinner';


function StripeCallback() {

    let navigate = useNavigate()
    const { gym_id } = useParams() // gym id

    useEffect(() => {
        getPaymentStatus()
    }, []);

    const getPaymentStatus = async () => {
        try {

            const headers = { "x-access-token": String(localStorage.getItem('token')) }
            let response = await axios.get('/stripe/get-payment-status', { headers })
            if (response.data.paid === true) {
                // TODO: API POST Request to add record in subscriptions table to register user to gym with id: gym_id
                return navigate('/user/tickets?highlight=' + gym_id)
            }
            else { // payment associated with session is incomplete (payment_status: unpaid)
                alert("Payment Incomplete")
                navigate('/user/unauthorized')

            }

        } catch (error) {
            console.log(error)
            alert("No stripe session initiated!")
            navigate('/user/unauthorized')
        }
    }


    return (
        <>
            <Paper elevation={3} style={{ padding: '1em' }}>
                <ChonkySpinner loading={true}>
                    <></>
                </ChonkySpinner>
                <Typography variant="h5" style={{ display: 'inline-block' }}>
                    Processing payment
                </Typography>
                <Typography variant="body1">
                    You will be redirected soon.
                </Typography>
            </Paper>
        </>

    )
}

export default StripeCallback
