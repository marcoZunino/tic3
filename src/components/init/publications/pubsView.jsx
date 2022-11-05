import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
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
import CloseIcon from "@mui/icons-material/Close";

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

    const openChat = () => {
        return null;
    }

    const editPub = () => {
        return null;
    }

    const newPublish = () => {

        // registrar al usuario como vendedor al crear su primer publicacion
        if (allPubs.length === 0) {
            let ok = false;
            try {
                ok = verifyVendedor();
            } catch (e) {
                console.log(e.message);
            }

            if (!ok) { // error en registro como vendedor
                return;
            }
        }

        navigate("new", {state: {user: user, userId: userId}});

    }

    const verifyVendedor = () => {
        let ok = false;

        // Buscamos el id del usuario con un get para verificar si ya existe el vendedor
        const params = { id: userId };
        const urlUser = `http://localhost:8000/api/vendedor?${new URLSearchParams(params)}`;
        fetch(urlUser)
            .then(data => data.json())
            .then(res => {
                console.log("verify: ", res);
                if (res["result"] === "true") { // el vendedor ya esta registrado
                    ok = true;
                } else if (res["result"] === "false") {
                    ok = postVendedor();
                } else {
                    setMsg("Unexpected error");
                }
            });

        return ok;
    }

    const postVendedor = () => {
        //Parametros de la funcion POST
        let ok = false;

        const params = { user: userId };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body:JSON.stringify(params)
        };
        const url = `http://localhost:8000/api/vendedor`
        fetch(url, options)
            .then(data => data)
            .then(res => {
                try {
                    console.log("vendedor POST res:", res);
                    if (!res.ok) {
                        setMsg("Error en registro de vendedor")
                        // exception
                    }

                } catch (e) {
                    console.log(e.message);
                    setMsg("Unexpected error");
                }
                ok = res.ok;
            })

        return ok;

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
            <Card sx={{maxWidth: 300, maxHeight: 200, boxShadow: "0px 0px 12px 1px #737373"}} classname="card">
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

                    <Button className="btnCont" onClick={editPub} size="large">
                        <EditIcon className="item-icon"/>
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

                    <div className="card-container" >

                        <Grid sx={{marginTop: "100px"}} container rowSpacing={1} columnSpacing={1}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid sx={{marginBottom: "50px"}} containter columnSpacing={2} xs={2} sm={4} md={4} key={index}>
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