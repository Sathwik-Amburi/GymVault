import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Button } from '@mui/material';


function valuetext(value: number) {
    return `${value}`;
}

export default function DiscountsPage() {

    const handleChange = (event: Event) => {
        console.log((event.target as HTMLInputElement).value)
    }

    return (
        <>
            <h1>Discount Percentage </h1>

            <div>Daily Subscription</div>
            <Box sx={{ width: 300 }}>
                <Slider
                    onChange={handleChange}
                    aria-label="Discount"
                    defaultValue={30}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={90}
                />
            </Box>

            <div>Monthly Subscription</div>
            <Box sx={{ width: 300 }}>
                <Slider
                    onChange={handleChange}
                    aria-label="Discount"
                    defaultValue={60}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={90}
                />
            </Box>

            <div>Yearly Subscription</div>
            <Box sx={{ width: 300 }}>
                <Slider
                    onChange={handleChange}
                    aria-label="Discount"
                    defaultValue={15}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={5}
                    marks
                    min={0}
                    max={90}
                />
            </Box>
            <Button style={{float:'right'}} variant="contained">Save</Button>
        </>
    )
}
