import {Link} from "react-router-dom";
import {Avatar} from "@mui/material";
import React from "react";

export const Chat = props => {
    const message = props.message;
    const name = props.name;
    const profilePic = props.profilePic;
    const timestamp = props.timestamp;

    return (
        <div>
            <Link to = {'/chat/${name}'}>
                <div className = 'chat'>
                    <Avatar className = 'chat_image' src={profilePic}/>
                    <div className= 'chat_details'>
                        <h2>{name}</h2>
                        <p>{message}</p>
                    </div>
                    <p className= 'chat_timestamp'>{timestamp}</p>

                </div>
            </Link>
        </div>
    );

}