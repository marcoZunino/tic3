import {Avatar} from "@mui/material";
import React from "react";

export const Chat = props => {

    const message = props.message;
    const profilePic = props.profilePic;
    const timestamp = props.timestamp;
    const userType = props.userType;

    const chat = props.chat;
    // json de cada chat:
    // chat {
    //        id
    //        like
    //        fechahora
    //        calif_vendedor
    //        calif_comprador
    //        vehiculo {
    //                campos de vehiculo
    //            }
    //        !<userType> {
    //                campos de !<userType>
    //            }
    //    }

    return (
        chat && (chat["comprador"] || chat["vendedor"]) && (
        <div>
            {/*<Link to = {'/chat/${name}'}>*/}
            <div>
                <div className='chat'>
                    <Avatar className = 'chat_images' src={profilePic} alt='chat_image' />
                    <div className= 'chat_details'>
                        { (userType === "comprador") && (
                            <h2 className='chat_info'>{chat["vendedor"]["first_name"]}{" "}{chat["vendedor"]["last_name"]}</h2>
                        )}
                        { (userType === "vendedor") && (
                            <h2 className='chat_info'>{chat["comprador"]["first_name"]}{" "}{chat["comprador"]["last_name"]}</h2>
                        )}
                        <h3 className='chat_info'>{chat["vehiculo"]["marca"]}{" "}{chat["vehiculo"]["modelo"]}</h3>
                        {/*<p>{message}</p>*/}
                    </div>
                    <p className= 'chat_timestamp'>{timestamp}</p>

                </div>
            </div>
            {/*</Link>*/}
        </div>
        )
    );

}