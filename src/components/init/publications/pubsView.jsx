import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import {useLocation, useNavigate} from "react-router-dom";
import {
    AppBar,
    Badge,
    CssBaseline,
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ErrorMessage} from "../../errorMessage";
import logo from "../../../images/logoCompletoN.png";
import {MainListItems} from "../mainListItems";
import ChatIcon from "@mui/icons-material/Chat";

export const PubsView = props => {

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
    const [allPubs, setAllPubs] = useState([]);

    const askLogin = () => {
        setMsg('Acción no permitida, debe iniciar sesión');

        //navigate("/");
    }

    const openChat = () => {
        return null;
    }

    const newPublish = () => {
        return null;
    }

    const navigate = useNavigate();
    const back = () => {
        navigate("/");
    }

    const getAllPubs = () => {

        const params = { vendedor: userId };
        const url = `http://localhost:8000/api/vehiculo?${new URLSearchParams(params)}`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                console.log("Pubs result is:", res["data"]);

                if (res["result"] === "ok") {
                    setAllPubs(res["data"]);
                } else {
                    if (res["data"] === "no hay") {
                        // "Comenzar a publicar vehiculos!"
                        return;
                    }
                    console.log("error: ", res["data"]);
                    setMsg(res["data"]);
                }
            })

    }

    useEffect(() => {
        if (userId === undefined) {
            askLogin();
        } else {
            getAllPubs();
        }
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const PubCard = props => {

        const thisVehicle = props.thisVehicle;
        const item = props.item;

        if (thisVehicle === undefined) {
            return null;
        }

        return (
            <Card sx={{maxWidth: 300, maxHeight: 200}} classname="card">
                <CardMedia
                    component="img"
                    height="60"
                    image={`data:image/png;base64,${thisVehicle["imagen"]}` || images[item]}
                    //image={`data:image/png;base64,${thisVehicle["imagen"]}`}
                    alt="imagen prueba"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {/*BMW Serie 3*/}
                        {thisVehicle["marca"]} {"  "}
                        {thisVehicle["modelo"]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/*65.000 km*/}
                        Precio base: {thisVehicle["precio_base"]} <br/>
                        {/*Kilometraje: {thisVehicle["kilometros"]} <br/>*/}
                        {thisVehicle["tipo"]}
                    </Typography>
                </CardContent>
                <CardActions className="cont">

                    <Button className="btnCont" onClick={openChat} size="large">
                        <ChatIcon className="item-icon"/>
                    </Button>

                </CardActions>
            </Card>
        )
    };  //reemplazar por una card mas chica

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
                        Mis publicaciones
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

                    <Typography variant="h5" gutterBottom component="h2" color="black">
                        Bienvenido {user}
                    </Typography>

                    <div className="card-container" >

                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid xs={2} sm={4} md={4} key={index}>
                                    <PubCard className="card"
                                             thisVehicle={allPubs[index]}
                                             item={index % allPubs.length}
                                        //thisVehicle={undefined}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                    </div>

                    <div>
                        <button type="button"
                                className="btn1"
                                onClick={newPublish}>
                            Publicar nuevo vehículo
                        </button>
                    </div>

                </main>

            </AppBar>
        </div>

    );


}