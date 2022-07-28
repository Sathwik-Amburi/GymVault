import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import userIcon from "../../../images/usericon.png";
import axios from "axios";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import moment from "moment";
import { S3_BASE_URL } from "../../../config/config";
import { useDispatch } from "react-redux";
import { setProfilePicture } from "../../../store/slices/profilePictureSlice";

function UserCard(props: any) {
  const [srcImg, setSrcImg] = useState<string>("");
  const [loading, setLoading] = useState<Boolean>(false);
  let dispatch = useDispatch();

  useEffect(() => {
    if (props.profilePicture === undefined || !props.profilePicture) {
      setSrcImg(userIcon);
    } else {
      let src = `${S3_BASE_URL}/${props.profilePicture}`;
      setSrcImg(src);
    }
  }, []);

  const handleChange = async (event: any) => {
    setLoading(true);
    const file: File = event.target.files[0];
    let response = await axios.post(
      `user/s3/putItem`,
      { fileName: file.name, type: file.type },
      { headers: { "x-access-token": String(localStorage.getItem("token")) } }
    );
    const url = response.data.url;
    const key = response.data.key;
    let src = `${S3_BASE_URL}/${key}`;
    let headers = { "Content-Type": file.type };
    await axios.put(url, file, { headers });
    setTimeout(() => {
      setSrcImg(src);
      localStorage.setItem("profilepicture", key);
      dispatch(setProfilePicture({ url: key }));
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <div className="card-container">
        <header className="header-profile" style={{ padding: "10px 20px" }}>
          <img
            style={{
              width: "200px",
              height: "200px",
              display: loading ? "none" : "block",
            }}
            className="user-pic"
            src={srcImg}
            alt="f"
          />
          <Box
            style={{ display: loading ? "block" : "none" }}
            sx={{ width: "100%" }}
          >
            <CircularProgress />
          </Box>

          <input
            type="file"
            accept="image/*"
            id="contained-button-file"
            style={{ display: "none" }}
            onChange={handleChange}
          />

          <label htmlFor="contained-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera
                style={{
                  fontSize: "45px",
                  display: loading ? "none" : "block",
                }}
              />
            </IconButton>
          </label>
        </header>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="bold-text">Email</h1>
            <h1 className="normal-text">{props.email}</h1>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="bold-text">Name</h1>
            <h1 className="normal-text">
              {props.firstName} {props.lastName}
            </h1>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="bold-text">Member since</h1>
            <h1 className="normal-text">
              {moment(props.created).format("DD/MM/YYYY")}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCard;
