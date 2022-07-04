import React from "react";
import "./ProfileCard.css";
import avatar from "../../../images/emoji.png";

function UserCard(props:any) {
    return (
        <div className="card-container">
            <header className="header-profile">
                <img className="user-pic" src={avatar} alt={props.firstName} />
            </header>
            <h1 className="bold-text">
                {props.firstName} {props.lastName}
            </h1>
            <h2 className="normal-text">{props.email}</h2>
            <h2 className="normal-text">Ph.No: {props.phNo}</h2>
        </div>
    );
}

export default UserCard;