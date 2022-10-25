import React, {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import ChatIcon from '@mui/icons-material/Chat';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {
    AppBar, Avatar,
    Badge,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem, ListItemIcon, ListItemText,
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
import PublishIcon from '@mui/icons-material/Publish';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import {ArrowCircleRight} from "@mui/icons-material";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import {ErrorMessage} from "../errorMessage";

export const InitialView = props => {

    let user = props.user;
    let userId = props.userId;

    const [open, setOpen] = useState(false);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [errorMessage, setMsg] = useState('');
    const [getVehiculos, setGetVehiculos] = useState(false);

    function Base64ToImage(base64img, callback) {
        let img = new Image();
        img.onload = function() {
            callback(img);
        };
        img.src = base64img;

    }

    const getImages = () => {
        // Get de imagenes:

        if(!getVehiculos) {
            const url = `http://localhost:8000/api/vehiculo`;
            fetch(url)
                .then(data => data.json())
                .then(res => {
                    console.log(res);
                    console.log(res['vehiculo'][0]);
                    console.log(res['vehiculo'][0]['image']);
                    // imagen en res['vehiculo'][0]['image']
                    // Prueba para mostrar la imagen:
                    let base64img = res['vehiculo'][0]['image'];
                    // crecion de imagen
                    Base64ToImage(base64img, function(img) {
                        document.getElementById('main').appendChild(img);
                        var log = "w=" + img.width + " h=" + img.height;
                        document.getElementById('log').value = log;
                    });

                })
            setGetVehiculos(true); // No volvera a hacer el get
        }
    }

    const askLogin = () => {
        setMsg('Acción no permitida, debe iniciar sesión');

        //navigate("/");
    }

    const toLike = () => {
        if (userId === undefined) { // sin permisos
            askLogin();
            return;
        }


        if (!like && dislike) {
            setDislike(false);
        }
        setLike(!like);
    }
    const toDislike = () => {
        if (userId === undefined) { //sin permisos
            askLogin();
            return;
        }

        if (!dislike && like) {
            setLike(false);
        }
        setDislike(!dislike);

    }

    const location = useLocation();

    const back = () => {
        navigate("/");
    }
    const navigate = useNavigate();

    const prevCard = () => {
        console.log("PREV CARD");
        return null;
    }

    const nextCard = () => {
        return null;
    }


    if (location.state.user !== "") {
        user = location.state.user;
        userId = location.state.userId;
    }

    const printId = () => {
        console.log("ID: ", userId);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const mainListItems = (
        <div>
            <ListItem className="btn3">
                <ListItemIcon>
                    <PublishIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Mis publicaciones" />
            </ListItem>
            <ListItem className="btn3">
                <ListItemIcon>
                    <ThumbUpOffAltIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Mis likes" />
            </ListItem>
            <ListItem className="btn3">
                <ListItemIcon>
                    <ChatIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Mis chats" />
            </ListItem>
            <ListItem className="btn3" onClick={printId}>
                <ListItemIcon>
                    <AccountCircleIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Perfil" />
            </ListItem>
            <ListItem className="btn3">
                <ListItemIcon>
                    <SettingsIcon className="item-icon"/>
                </ListItemIcon>
                <ListItemText className="item-text" primary="Ajustes" />
            </ListItem>
        </div>
    );

    const MediaCard = () => {
        return (
            <Card sx={{maxWidth: 600, maxHeight: 600}} classname="card">
                <CardMedia
                    component="img"
                    height="400"
                    image="https://www.quieromotor.es/vehiculos/fotos/B92286947/B92286947-156275.jpg"
                    alt="imagen prueba"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        BMW Serie 3
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        65.000 km
                    </Typography>
                </CardContent>
                <CardActions className="cont">

                    <Button className="btnCont" onClick={toLike} size="large">
                        { !like && (
                            <ThumbUpOffAltIcon className="like" />
                        )}
                        { like && (
                            <ThumbUpIcon className="like" />
                        )}
                    </Button>

                    <Button className="btnCont" onClick={toDislike} size="large">
                        { !dislike && (
                            <ThumbDownOffAltIcon className="dislike" />
                        )}
                        { dislike && (
                            <ThumbDownIcon className="dislike" />
                        )}
                    </Button>

                </CardActions>
            </Card>
        )
    };

    return (
        <div className="root">
            <CssBaseline />
            <AppBar
                position="absolute"
                className={open && "appBarShift"}
            >
                {ErrorMessage(errorMessage, setMsg)}

                <Toolbar disableGutters={open} className="toolbar">

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

                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="title"
                    >
                        Página de inicio
                    </Typography>

                    <IconButton color="inherit">
                        { !userId && (
                            <Badge
                                //badgeContent={40}
                                color="secondary"
                                onClick={() => navigate("/")}
                            >
                                <AccountCircleIcon className="icon">
                                    <label>
                                        Iniciar sesión
                                    </label>
                                </AccountCircleIcon>
                            </Badge>
                        )}
                    </IconButton>
                    <IconButton color="inherit">

                        <Badge
                            //badgeContent={40}
                            color="secondary"
                            onClick={back}
                        >
                            <ArrowCircleLeftIcon className="icon">
                                <label>
                                    Salir
                                </label>
                            </ArrowCircleLeftIcon>
                        </Badge>

                    </IconButton>
                    Salir
                    {/*<Avatar alt="logo" src="../../images/logo1.png" />*/}

                </Toolbar>
            </AppBar>

            {open && (
            <Drawer variant="permanent" className="drawerPaper" open={open} >
                    {/*{open && (*/}
                        <div className="toolbar2">
                            <div className="toolbarIcon">
                                <IconButton onClick={handleDrawerClose} >
                                    <ArrowCircleRightIcon className="item-icon" />
                                </IconButton>
                            </div>
                            <Divider />
                            {mainListItems}
                        </div>
                    {/*)}*/}
            </Drawer>
            )}
            {/*{!open && (<Drawer variant="permanent" className="drawerPaperClose"/>)}*/}

            <main className="init-content">

                <div className="appBarSpacer" />

                <Typography variant="h4" gutterBottom component="h2">
                    ------------
                </Typography>
                {/*<Typography component="div" className="chartContainer">*/}
                {/*    <MenuIcon />*/}
                {/*</Typography>*/}

                <Typography variant="h4" gutterBottom component="h2">
                    Bienvenido {user}
                </Typography>

                <div className="card-container" >

                    <Badge
                        onClick={prevCard}
                    >
                        <ArrowCircleLeftIcon className="arrow" />
                    </Badge>

                    <MediaCard className="card"/>

                    <Badge
                        onClick={getImages}
                    >
                        <ArrowCircleRightIcon className="arrow" />
                    </Badge>


                </div>

            </main>
        </div>

    );


}
