import {Link} from "react-router-dom";
import {Avatar} from "@mui/material";
import React from "react";

export const Chat = props => {

    const message = props.message;
    const profilePic = props.profilePic;
    const timestamp = props.timestamp;

    const chat = props.chat;
    // json de cada chat:
    // chat {
    //        like
    //        fechahora
    //        calif_vendedor
    //        calif_comprador
    //        vehiculo {
    //                campos de vehiculo
    //            }
    //        vendedor {
    //                campos de vendedor
    //            }
    //    }

    return (
        chat && chat["vendedor"] && (
        <div>
            <Link to = {'/chat/${name}'}>
                <div className = 'chat'>
                    <Avatar className = 'chat_image' src={profilePic}/>
                    <div className= 'chat_details'>
                        <h2>{chat["vendedor"]["first_name"]}{" "}{chat["vendedor"]["last_name"]}</h2>
                        <p>{message}</p>
                    </div>
                    <p className= 'chat_timestamp'>{timestamp}</p>

                </div>
            </Link>
        </div>
        )
    );

}