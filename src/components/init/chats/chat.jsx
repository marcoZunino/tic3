import {Avatar} from "@mui/material";
import React, {useEffect, useState} from "react";

export const Chat = props => {

    const profilePic = props.profilePic;
    const userType = props.userType;
    const selected = props.selected;

    const [className, setClassName] = useState('');

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
    //        }
    //        !<userType> {
    //                campos de !<userType>
    //        }
    //        mensaje {  //ultimo mensaje
    //                campos de mensaje
    //        }
    //    }

    useEffect(() => {
        if (selected) {
            setClassName('chat_selected');
        } else {
            setClassName('chat');
        }
    });

    return (
        chat && (chat["comprador"] || chat["vendedor"]) && (
        <div>
            {/*<Link to = {'/chat/${name}'}>*/}
            <div>
                <div className={className}>
                    <Avatar className = 'chat_images' src={profilePic} alt='chat_image' />
                    <div className= 'chat_details'>
                        { (userType === "comprador") && (
                            <h2 className='chat_info'>{chat["vendedor"]["first_name"]}{" "}{chat["vendedor"]["last_name"]}</h2>
                        )}
                        { (userType === "vendedor") && (
                            <h2 className='chat_info'>{chat["comprador"]["first_name"]}{" "}{chat["comprador"]["last_name"]}</h2>
                        )}
                        <h3 className='chat_info'>{chat["vehiculo"]["marca"]}{" "}{chat["vehiculo"]["modelo"]}</h3>

                        <p className='chat_message'>{chat["mensaje"]["contenido"]}</p>
                    </div>
                    <p className= 'chat_timestamp'>{chat["mensaje"]["fechahora"]}</p>

                </div>
            </div>
            {/*</Link>*/}
        </div>
        )
    );

}