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
    Drawer,
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
import {ErrorMessage} from "../errorMessage";
import logo from "../../images/logoCompletoN.png";
import {MainListItems} from "./mainListItems";

export const InitialView = props => {

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
    const [allVehicles, setAll] = useState([]);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [vehicleItem, setVehicleItem] = useState(0);

    const askLogin = () => {
        setMsg('Acción no permitida, debe iniciar sesión');

        //navigate("/");
    }

    const toLike = () => {
        if (userId === undefined) { //sin permisos
            askLogin();
            return;
        }

        if (!like) {//post like

            // Parametros de la funcion POST
            const params = { vehiculo: allVehicles[vehicleItem]["id"], comprador: userId };
            console.log("params: ", params);
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body:JSON.stringify(params)
            };
            const url = `http://localhost:8000/api/like`
            fetch(url, options)
                .then(data => data)
                .then(res => {
                    try {
                        console.log(res.status);
                        console.log(res.ok);
                        //console.log(res.json());
                        console.log(res);
                        //console.log(res.id);
                        if (res.ok) { // Indica si la respuesta fue afirmativa

                            if (dislike) { //si intento dar like cuando ya di dislike
                                toDislike(); //deshace dislike
                            }

                            setLike(true);

                        } else {
                            setMsg("Error en like")
                        }

                    } catch (e) {
                        console.log(e.message);
                        setMsg("Unexpeted error");
                    }
                })

        } else { // deshacer like
            //DELETE

            setLike(false);

        }


    }

    const toDislike = () => {
        if (userId === undefined) { //sin permisos
            askLogin();
            return;
        }

        if (!dislike) {

            // POST dislike

            if (like) { // si intento dar dislike cuando di like
                toLike();  // deshace like
            }

            setDislike(true);

        } else { //deshacer dislike
            // DELETE

            setDislike(false);

        }



    }

    const navigate = useNavigate();
    const back = () => {
        navigate("/");
    }

    const getAllVehicles = () => {

        const url = `http://localhost:8000/api/vehiculo`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                console.log("Result is:", res["result"]);
                console.log("Data is:", res["data"]);

                if (res["result"] === "ok") {
                    setAll(res["data"]);
                } else {
                    console.log("error: ", res["data"]);
                    setMsg(res["data"]);
                }
            })

    }

    useEffect(getAllVehicles, []);

    //useEffect(() => console.log(vehicleItem), [vehicleItem]);

    const prevCard = () => {
        setVehicleItem((allVehicles.length + vehicleItem - 1) % allVehicles.length);
        setLike(false);
        setDislike(false);
    }
    const nextCard = () => {
        setVehicleItem((vehicleItem + 1) % allVehicles.length);
        setLike(false);
        setDislike(false);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const VehicleCard = props => {

        const thisVehicle = props.thisVehicle;

        if (thisVehicle === undefined) {
            return null;
        }

        return (
            <Card sx={{maxWidth: 600, maxHeight: 600}} classname="card">
                <CardMedia
                    component="img"
                    height="400"
                    //image="https://www.quieromotor.es/vehiculos/fotos/B92286947/B92286947-156275.jpg"
                    image={images[vehicleItem]}
                    //image=thisVehicle["imagen"]
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
                        Página de inicio
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
                {/*<Typography component="div" className="chartContainer">*/}
                {/*    <MenuIcon />*/}
                {/*</Typography>*/}

                <Typography variant="h5" gutterBottom component="h2">
                    Bienvenido {user}
                </Typography>

                <div className="card-container" >

                    <Badge
                        onClick={prevCard}
                    >
                        <ArrowCircleLeftIcon className="arrow" />
                    </Badge>

                    <VehicleCard className="card"
                               thisVehicle={allVehicles[vehicleItem]}
                    />

                    <Badge
                        onClick={nextCard}
                    >
                        <ArrowCircleRightIcon className="arrow" />
                    </Badge>


                </div>

            </main>
        </div>

    );


}
