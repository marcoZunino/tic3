import './chatView.css';

import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import {useLocation, useNavigate} from "react-router-dom";
import {
    AppBar,
    Badge,
    CssBaseline,
    Drawer,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ErrorMessage} from "../../errorMessage";
import logo from "../../../images/logoCompletoN.png";
import {MainListItems} from "../mainListItems";
import {ChatScreen} from "./chatScreen";
import {ChatList} from "./chatList";
import CloseIcon from "@mui/icons-material/Close";

export const ChatView = props => {

    let user = props.user;
    let userId = props.userId;
    const location = useLocation();
    if (location.state.user !== "") {
        user = location.state.user;
        userId = location.state.userId;
    }

    const [open, setOpen] = useState(false);
    const [errorMessage, setMsg] = useState('');
    const [allChats, setAllChats] = useState([]);

    const askLogin = () => {
        setMsg('Acción no permitida, debe iniciar sesión');

        //navigate("/");
    }

    const openChat = () => {
        return null;
    }

    const navigate = useNavigate();
    const back = () => {
        navigate("/");
    }

    const getAllChats = () => {

        const params = { comprador: userId , info_completa:"1"};
        const url = `http://localhost:8000/api/chat?${new URLSearchParams(params)}`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                console.log("Chats get result is:", res);

                if (res["result"] === "ok") {
                    setAllChats(res["data"]);   //array de chats

                    // json de cada chat:
                    // chat {
                    //        like
                    //        fechahora
                    //        calif_vendedor
                    //        calif_comprador
                    //        vehiculo {
                    //                campos de vehiculo
                    //                imagen
                    //            }
                    //        vendedor {
                    //                campos de vendedor
                    //            }
                    //    }

                } else {
                    console.log("error like");
                    setMsg(res["result"]);
                }
            })

    }

    useEffect(() => {
        if (userId === undefined) {
            askLogin();
        } else {
            getAllChats();
        }
    }, []);     // cargar estado inicial de chats

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className="root">
            <CssBaseline />
            <AppBar
                position="absolute"
                className="appBarShift"
                color="transparent"
            >
                {ErrorMessage(errorMessage, setMsg)}

                <Toolbar disableGutters={open} className="toolbar">

                    { open && (
                        <div className="margin" />
                    )}

                    <IconButton
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className="menuButton"
                    >
                        <MenuIcon sx={{ color: "white" }}/>
                    </IconButton>
                    <div className="image2">
                        <img src={logo}  alt="logo"/>
                    </div>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="white"
                        noWrap
                        className="title"
                    >
                        Mis chats
                    </Typography>

                    <Typography
                        component="h2"
                        variant="h6"
                        color="white"
                        noWrap
                        className="title"
                    >
                        {user}
                    </Typography>

                    { !userId && (
                        <IconButton color="inherit"
                                    onClick={() => navigate("/")}
                        >
                            <Badge
                                //badgeContent={40}
                                color="secondary"

                            >
                                <AccountCircleIcon className="icon" />
                            </Badge>
                            <label className="label">
                                Iniciar sesión
                            </label>
                        </IconButton>

                    )}

                    { userId && (
                        <IconButton color="inherit"
                                    onClick={back}
                        >

                            <Badge
                                //badgeContent={40}
                                color="secondary"
                            >
                                <LogoutIcon className="icon" />
                            </Badge>
                            <label className="label">
                                Cerrar sesión
                            </label>
                        </IconButton>

                    )}

                    {/*<Avatar alt="logo" src="../../images/logo1.png" />*/}

                </Toolbar>

                {open && (
                    <Drawer  anchor={"left"}
                             className="drawerPaper"
                             open={open} >
                        <div className="toolbar2">
                            <div className="toolbarIcon">
                                <IconButton onClick={handleDrawerClose}>
                                    <CloseIcon className="item-icon" />
                                </IconButton>
                            </div>
                            <MainListItems user={user} userId={userId} />
                        </div>
                    </Drawer>
                )}

                <main className="init-content">

                    <div className="chat-container" >
                        <div className= "chatList-container">
                            <ChatList chats={allChats} />
                        </div>

                        <div className= "chatScreen-container">
                            <ChatScreen/>
                        </div>


                    </div>

                </main>
            </AppBar>
        </div>

    );


}

