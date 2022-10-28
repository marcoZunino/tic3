import './chatView.css';

import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    AppBar, Avatar,
    Badge,
    CssBaseline,
    Divider,
    Drawer, Grid,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ArrowCircleRight} from "@mui/icons-material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {ErrorMessage} from "../../errorMessage";
import logo from "../../../images/logoCompletoN.png";
import {MainListItems} from "../mainListItems";
import ChatIcon from "@mui/icons-material/Chat";


export const ChatView = props => {

    let user = props.user;
    let userId = props.userId;
    const location = useLocation();
    if (location.state.user !== "") {
        user = location.state.user;
        userId = location.state.userId;
    }

    const images = ["https://upload.wikimedia.org/wikipedia/commons/6/69/Volkswagen_Gol_Hatchback_--_Front.JPG",
        "https://www.quieromotor.es/vehiculos/fotos/B92286947/B92286947-156275.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/09/1986_Fiat_Uno_Turbo_i.e_%2825420774522%29.jpg"];

    const [open, setOpen] = useState(false);
    const [errorMessage, setMsg] = useState('');
    const [allLikes, setAllLikes] = useState([]);
    const [like, setLike] = useState(false);

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

        const url = `http://localhost:8000/api/vehiculo`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                console.log("Result is:", res["result"]);
                console.log("Data is:", res["data"]);

                if (res["result"] === "ok") {
                    setAllLikes(res["data"]);
                } else {
                    console.log("error: ", res["data"]);
                    setMsg(res["data"]);
                }
            })

    } //falta filtrar por id segun likes

    useEffect(() => {
        if (userId === undefined) {
            askLogin();
        } else {
            getAllChats();
        }
    }, []);

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
                //{open && "appBarShift"}
            >
                {ErrorMessage(errorMessage, setMsg)}

                <Toolbar disableGutters={open} className="toolbar">

                    { open && (
                        <div className="margin" />
                    )}

                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className="menuButton"
                        //     classes.menuButton,
                        //     this.state.open && classes.menuButtonHidden,
                        // )}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <div className="image2">
                        <img src={logo}  alt="logo"/>
                    </div>

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="title"
                    >
                        Mis chats
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
                                <ArrowCircleLeftIcon className="icon" />
                            </Badge>
                            <label className="label">
                                Cerrar sesión
                            </label>
                        </IconButton>

                    )}

                    {/*<Avatar alt="logo" src="../../images/logo1.png" />*/}

                </Toolbar>
            </AppBar>

            {open && (
                <Drawer variant="permanent" className="drawerPaper" open={open} >
                    <div className="toolbar2">
                        <div className="toolbarIcon">
                            <IconButton onClick={handleDrawerClose} >
                                <ArrowCircleRightIcon className="item-icon" />
                            </IconButton>
                        </div>
                        {/*<Divider />*/}
                        <MainListItems user={user} userId={userId} />
                    </div>
                </Drawer>
            )}

            {!open && (<Drawer variant="permanent" className="drawerPaperClose"/>)}

            <main className="init-content">

                <div className="appBarSpacer" />

                <Typography variant="h4" gutterBottom component="h2">
                    ------------
                </Typography>

                <div className="chat-container" >

                    <chat> </chat>
                    <chatScreen></chatScreen>
                </div>

            </main>
        </div>

    );


}

