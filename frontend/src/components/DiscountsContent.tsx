import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button } from '@mui/material';

let newOffers: any = {}

function valuetext(value: number) {
    return `${value}`;
}

interface subscriptionOffer {
    subscriptionType: string,
    subscriptionPrice: number,
    discount: number,
}

interface DiscountsPageProps {
    subscriptionOffers: subscriptionOffer[],
    editSubscriptionOffers: (subscriptionOffers: subscriptionOffer[]) => Promise<void>,
    children?: React.ReactNode,
}




const DiscountsPage: React.FC<DiscountsPageProps> = ({ subscriptionOffers, editSubscriptionOffers }) => {


    const handleChange = (event: Event, s: subscriptionOffer) => {
        const key = s.subscriptionType
        const value = (event.target as HTMLInputElement).value
        newOffers[String(key)] = [s.subscriptionType, s.subscriptionPrice, value]
    }

    const displaySubscriptionOffers = (s: subscriptionOffer) => {

        return <>
            <div>{s.subscriptionType}</div>
            <Box sx={{ width: 300 }}>
                <Slider
                    onChange={(event: Event) => handleChange(event, s)}
                    aria-label="Discount"
                    defaultValue={s.discount}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={90}
                />
            </Box>
        </>
    }

    const handleSubmit = async (event : any, subscriptionOffers: subscriptionOffer[]) => {
        event.preventDefault()
        let subscriptionTypes = Object.keys(newOffers)
        let x = subscriptionOffers.map((subscriptionOffer: subscriptionOffer) => {
            if (subscriptionTypes.includes(subscriptionOffer.subscriptionType)) {
                let index = subscriptionOffer.subscriptionType
                return { subscriptionType: newOffers[index][0], subscriptionPrice: newOffers[index][1], discount: newOffers[index][2], }
            }
            else {
                return subscriptionOffer
            }
        })
        await editSubscriptionOffers(x)
    }



    return (
        <>
            <h1>Discount Percentage </h1>

            <>
                {subscriptionOffers.map((s) => displaySubscriptionOffers(s))}
            </>

            <Button onClick={(event: any) => handleSubmit(event, subscriptionOffers)} style={{ float: 'right' }} variant="contained">Save</Button>
        </>
    )
}

export default DiscountsPage
