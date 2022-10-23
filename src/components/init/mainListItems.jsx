import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import {useNavigate} from "react-router-dom";

export const MainListItems = props => {

    let user = props.user;
    let userId = props.userId;

    const navigate = useNavigate();

    const pubsView = () => {
        navigate("/home/pubs", {state: {user: user, userId: userId}});
    };
    const likesView = () => {
        navigate("/home/likes", {state: {user: user, userId: userId}});
    };
    const chatsView = () => {
        navigate("/home/chats", {state: {user: user, userId: userId}});
    };

    return (
        <div>
            <ListItem className="btn3" onClick={pubsView}>
                <ListItemIcon>
                    <PublishIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Mis publicaciones"/>
            </ListItem>

            <ListItem className="btn3" onClick={likesView}>
                <ListItemIcon>
                    <ThumbUpOffAltIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Mis likes"/>
            </ListItem>

            <ListItem className="btn3" onClick={chatsView}>
                <ListItemIcon>
                    <ChatIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Mis chats"/>
            </ListItem>

            <ListItem className="btn3" onClick={() => console.log("ID: ", userId) }>
                <ListItemIcon>
                    <AccountCircleIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Perfil"/>
            </ListItem>

            <ListItem className="btn3">
                <ListItemIcon>
                    <SettingsIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Ajustes"/>
            </ListItem>
        </div>

    );
}