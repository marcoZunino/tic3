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

export const InitialView = props => {

    let user = props.user;
    let userId = props.userId;

    const [open, setOpen] = useState(false);

    const location = useLocation();

    const back = () => {
        navigate("/");
    }

    const navigate = useNavigate();

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
            <ListItem button>
                <ListItemIcon>
                    <PublishIcon />
                </ListItemIcon>
                <ListItemText primary="Mis publicaciones" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ThumbUpOffAltIcon />
                </ListItemIcon>
                <ListItemText primary="Mis likes" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Mis chats" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Ajustes" />
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
                    <Button className="btnCont" size="big">
                        <ThumbUpOffAltIcon className="like" color="action"/>
                    </Button>
                    <Button className="btnCont" size="large">
                        <ThumbDownOffAltIcon className="dislike" color="action"/>
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
            <Drawer
                variant="permanent"
                // classes={{
                //     paper: "drawerPaper"//classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                // }}
                open={open}
            >
                {open && (
                    <div>
                        <div className="toolbarIcon">
                            <IconButton onClick={handleDrawerClose}>
                                <ArrowCircleRightIcon />
                            </IconButton>
                        </div>
                    <Divider />
                    {mainListItems}
                    </div>
                )}
            </Drawer>
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
                    <ArrowCircleLeftIcon className="arrow"/>
                    <MediaCard className="card"/>
                    <ArrowCircleRightIcon className="arrow"/>
                </div>
            </main>
        </div>

        // <div className="inicio">
        //     <div className="header">Página de inicio</div>
        //     <li>
        //         <Link to="/">Salir</Link>
        //     </li>
        //     <div className="content">
        //         <div className="image">
        //             <img src={img} />
        //         </div>
        //         <div className="form">
        //             <label>Usuario:</label>
        //             <br/>
        //             <h1>{props.message} </h1>
        //             <h1>Bienvenido, {user} </h1>
        //
        //             <div>
        //                 <button type="button"
        //                         className="btn1"
        //                         onClick={printId}>
        //                     ID
        //                 </button>
        //             </div>
        //
        //         </div>
        //     </div>
        // </div>
    );



}
