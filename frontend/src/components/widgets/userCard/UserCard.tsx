import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import userIcon from "../../../images/usericon.png";
import axios from "axios";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';


function UserCard(props: any) {

    const [srcImg, setSrcImg] = useState<string>("")
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        if (props.profilePicture === undefined || !props.profilePicture) {
            setSrcImg(userIcon)
        }
        else {
            let src = `https://gymvaultv1.s3.amazonaws.com/${props.profilePicture}`
            setSrcImg(src)
        }
    }, [])


    const handleChange = async (event: any) => {
        setLoading(true)
        const file: File = event.target.files[0]
        let response = await axios.post(`user/s3/putItem`, { fileName: file.name, type: file.type }, { headers: { "x-access-token": String(localStorage.getItem('token')) } })
        const url = response.data.url
        const key = response.data.key
        let src = `https://gymvaultv1.s3.amazonaws.com/${key}`
        let headers = { 'Content-Type': file.type }
        await axios.put(url, file, { headers })
        setTimeout(() => {
            setSrcImg(src)
            setLoading(false)
        }, 2000)

    }

    return (
        <>

            <div className="card-container">
                <header className="header-profile" style={{ padding: "50px 40px" }}>
                    <img style={{ width: "200px", height: "200px", display: loading ? 'none' : 'block' }} className="user-pic" src={srcImg} alt='f' />
                    <Box style={{ display: loading ? 'block' : 'none' }} sx={{ width: '100%' }}>
                        <CircularProgress />
                    </Box>
                </header>
                <h1 className="bold-text">
                    {props.firstName} {props.lastName}
                </h1>
                <h2 className="normal-text">{props.email}</h2>
                <h2 className="normal-text">Ph.No: {props.phNo}</h2>


                <input
                    type="file"
                    accept="image/*"
                    id="contained-button-file"
                    onChange={handleChange}
                />
            </div>

        </>

    );
}

export default UserCard;