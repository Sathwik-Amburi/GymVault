import React from 'react'
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
import { allCities } from "../../config/cities";


export default function GymSearchBar() {

    const cities = allCities.map((c) => {
        return { "label": c }
      })


    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <TextField
                    // onChange={handleChange}
                    style={{ width: "70%" }}
                    fullWidth
                    label="Gym Name"
                    id="fullWidth"
                />
                <i
                    // onClick={() => {
                    //     filter();
                    // }}
                    style={{
                        fontSize: "25px",
                        position: "relative",
                        right: "40px",
                        top: "15px",
                        cursor: "pointer",
                    }}
                    className="fas fa-search"
                ></i>
            </div>

            <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "center", "margin": "30px 0px 320px 0px" }}>

                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={cities}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="City" />}
                />

            </div>

        </>
    )
}
