import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
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

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

    const images = ["https://www.quieromotor.es/vehiculos/fotos/B92286947/B92286947-156275.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/0/09/1986_Fiat_Uno_Turbo_i.e_%2825420774522%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/6/69/Volkswagen_Gol_Hatchback_--_Front.JPG",
        "https://upload.wikimedia.org/wikipedia/commons/4/46/Enzo_FerRari.jpg"];

    const [errorMessage, setMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [viewChange, setViewChange] = useState(false);

    const [vehicles, setVehicles] = useState([]);
    const [allVehicles, setAllVehicles] = useState([]);

    const [vehicleItem, setVehicleItem] = useState(0);
    const [prevItem, setPrevItem] = useState(0);
    const [venta, setVenta] = useState(false);
    const [alquiler, setAlquiler] = useState(false);

    const [userLikes, setUserLikes] = useState([]);
    const [userDislikes, setUserDislikes] = useState([]);
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);

    const [likeChange, setLikeChange] = useState(false);
    const [dislikeChange, setDislikeChange] = useState(false);

    const vehicleId = (id) => {
        if (vehicles[id] !== undefined) {
            return vehicles[id]["id"];
        }
        return undefined;
    } // vehicleItem => id de vehiculo

    const askLogin = () => {
        setMsg('Acción no permitida, debe iniciar sesión');
    }

    const navigate = useNavigate();
    const back = () => {
        setViewChange(!viewChange); // para actualizar bd antes de salir
        navigate("/");
    }

    const getAllVehicles = () => { // falta filtrar para descartar los vehiculos likeados o dislikeados

        const url = `http://localhost:8000/api/vehiculo`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                //console.log("All vehicles result is:", res["result"]);
                console.log("All vehicles data is:", res["data"]);

                if (res["result"] === "ok") {
                    res["data"].sort(() => Math.random() - 0.5); // orden random para mostrar los vehiculos
                    setAllVehicles(res["data"]); // todos los vehiculos
                    setVehicles(res["data"]);   // array solo de los vehiculos que se muestran
                } else {
                    console.log("all vehicles error: ", res["data"]);
                    setMsg(res["data"]);
                }
            })

    } // get de todos los vehiculos

    const getUserLikes = () => {

        const params = { comprador: userId };
        const url = `http://localhost:8000/api/like?${new URLSearchParams(params)}`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                const dataList = res["data"];
                console.log("Likes get result is:", dataList);

                if (res["result"] === "ok") {
                    let ids = [];
                    for (let i = 0; i < dataList.length; i++) { // traer los id de vehiculos con like
                        ids.push(dataList[i]["vehiculo"]);
                    }
                    setUserLikes(userLikes.concat(ids));    // se agregan los id a userLikes
                } else {
                    console.log("error like", res["result"]);
                    setMsg(res["result"]);
                }
            })

    }
    const getUserDislikes = () => {

        const params = { comprador: userId };
        const url = `http://localhost:8000/api/dislike?${new URLSearchParams(params)}`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                const dataList = res["data"];
                console.log("Dislikes result is:", dataList);

                if (res["result"] === "ok") {
                    let ids = [];
                    for (let i = 0; i < dataList.length; i++) { // traer los id de vehiculos con dislike
                        ids.push(dataList[i]["vehiculo"]);
                    }
                    setUserDislikes(userDislikes.concat(ids));
                } else {
                    console.log("error dislike", res["result"]);
                    setMsg(res["result"]);
                }
            })

    }

    const toLike = () => {
        if (userId === undefined) { // sin permisos
            askLogin();
            return;
        }

        if (!like) { // si se intenta dar like
            setUserLikes(userLikes.concat(vehicleId(vehicleItem))); //agregar id al array de likes

            if (dislike) {  // si le habia dado dislike debe quitarse
                toDislike(); // dislike => false
            }

        } else { // si se intenta deshacer like

            setUserLikes(userLikes.filter(item => item !== vehicleId(vehicleItem))); // remove id del array de likes

        }

        setLikeChange(!likeChange); // se notifica cambio en like
    }

    const toDislike = () => {

        if (userId === undefined) { //sin permisos
            askLogin();
            return;
        }

        if (!dislike) { // si se intenta dar dislike
            setUserDislikes(userDislikes.concat(vehicleId(vehicleItem))); //agregar id al array de dislikes

            if (like) { // si intento dar dislike cuando di like
                toLike();  // deshace like
            }

        } else { //si se intenta deshacer dislike

            setUserDislikes(userDislikes.filter(item => item !== vehicleId(vehicleItem))); // remove del id en array de dislikes

        }

        setDislikeChange(!dislikeChange); // notifica cambio en dislike
    }

    const postLike = (vID) => {
        //Parametros de la funcion POST
        const params = { vehiculo: vehicleId(vID), comprador: userId };
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
                    console.log("like POST res:", res);
                    if (!res.ok) {
                        setMsg("Error en like")
                    }

                } catch (e) {
                    console.log(e.message);
                    setMsg("Unexpected error");
                }
            })
    }
    const deleteLike = (vID) => {
        //Parametros de la funcion DELETE
        const params = { vehiculo: vehicleId(vID), comprador: userId };
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            //body:JSON.stringify(params)
        };
        const url = `http://localhost:8000/api/like?${new URLSearchParams(params)}`
        fetch(url, options)
            .then(data => data)
            .then(res => {
                try {
                    console.log("like DELETE res:", res);
                    if (!res.ok) {
                        setMsg("Error en delete like")
                    }

                } catch (e) {
                    console.log(e.message);
                    setMsg("Unexpected error");
                }
            })

    }

    const postDislike = (vID) => {

        const params = { vehiculo: vehicleId(vID), comprador: userId };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body:JSON.stringify(params)
        };
        const url = `http://localhost:8000/api/dislike`
        fetch(url, options)
            .then(data => data)
            .then(res => {
                try {
                    console.log("dislike POST res: ", res);
                    if (!res.ok) {
                        setMsg("Error en dislike")
                    }

                } catch (e) {
                    console.log(e.message);
                    setMsg("Unexpected error");
                }
            })

    }
    const deleteDislike = (vID) => {
        //Parametros de la funcion DELETE
        const params = { vehiculo: vehicleId(vID), comprador: userId };
        const options = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            //body:JSON.stringify(params)
        };
        const url = `http://localhost:8000/api/dislike?${new URLSearchParams(params)}`
        fetch(url, options)
            .then(data => data)
            .then(res => {
                try {
                    console.log("dislike DELETE res:", res);
                    if (!res.ok) {
                        setMsg("Error en delete dislike")
                    }

                } catch (e) {
                    console.log(e.message);
                    setMsg("Unexpected error");
                }
            })

    }

    useEffect(() => {
        getAllVehicles();
        getUserLikes();
        getUserDislikes();

    }, []); // cargar estado inicial

    useEffect(() => {
        setLike(userLikes.includes(vehicleId(vehicleItem)));    //si id de vehiculo actual está en likes
        setDislike(userDislikes.includes(vehicleId(vehicleItem)));    //si id de vehiculo actual está en dislikes
    }); // actualizar botones de like y dislike constantemente

    const updateDB = (vID) => {

        if (likeChange) {   // si hubo cambio en like
            if (like) {     // si like quedó en true
                postLike(vID);
            } else {     // si like quedó en false
                deleteLike(vID);
            }
        }

        if (dislikeChange) {    // si hubo cambio en dislike
            if (dislike) {      // si dislike quedó en true
                postDislike(vID);
            } else {      // si dislike quedó en false
                deleteDislike(vID);
            }
        }

    } // actualizar likes y dislikes del vehiculo vID en la bd

    const filterVenta = () => {
        if (!venta) {   // se dejan solo los vehiculos de tipo Venta
            setVehicles(allVehicles.filter(item => item["tipo"] === "Venta"));
            if (alquiler) { // se saca el filtro por alquiler
                setAlquiler(false);
            }
        } else {   // se vuelven a mostrar todos los vehiculos
            setVehicles(allVehicles);
        }
        setVenta(!venta);   // actualiza filtro de venta
        setViewChange(!viewChange); // actualiza db
    }

    const filterAlquiler = () => {
        if (!alquiler) {    // se dejan solo los vehiculos de tipo alquiler
            setVehicles(allVehicles.filter(item => item["tipo"] === "Alquiler"));
            if (venta) { // se saca el filtro por venta
                setVenta(false);
            }
        } else {    // se vuelven a mostrar todos los vehiculos
            setVehicles(allVehicles);
        }
        setAlquiler(!alquiler);     // actualiza filtro de alquiler
        setViewChange(!viewChange); // actualiza db
    }

    useEffect(() => {
        updateDB(prevItem);
        setLikeChange(false);
        setDislikeChange(false);

    }, [vehicleItem]);  // cargar like y dislike al pasar de una publicacion a otra

    useEffect(() => {
        updateDB(vehicleItem);
        setLikeChange(false);
        setDislikeChange(false);
    }, [viewChange]); // cargar like y dislike al cambiar de vista

    const prevCard = () => {
        setPrevItem(vehicleItem); // guarda item del anterior vehiculo mostrado
        setVehicleItem((vehicles.length + vehicleItem - 1) % vehicles.length); // item previo
    }
    const nextCard = () => {
        setPrevItem(vehicleItem); // guarda item del anterior vehiculo mostrado
        setVehicleItem((vehicleItem + 1) % vehicles.length); // item siguiente
    }

    const handleDrawerOpen = () => {
        setOpen(true);
        setViewChange(!viewChange); // actualiza db al abrir el menu
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
            <Card sx={{maxWidth: 600, maxHeight: 600, boxShadow: "0px 0px 12px 1px #737373"}} classname="card">
                <CardMedia
                    component="img"
                    height="400"
                    image={`data:image/png;base64,${thisVehicle["imagen"]}`}
                    alt="imagen del vehiculo"
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
                        Página de inicio
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

                    <IconButton color="inherit"
                                onClick={filterVenta}
                    >
                        <Badge
                            //badgeContent={40}
                            color="secondary"
                            className="filter_badge"
                        >
                            {venta &&
                                <CheckBoxIcon className="filter_icon"/>
                            }
                            {!venta &&
                                <CheckBoxOutlineBlankIcon className="filter_icon"/>
                            }
                        </Badge>
                        <label className="filter_label">
                            Filtrar por venta
                        </label>
                    </IconButton>
                    <br/>
                    <IconButton color="inherit"
                                onClick={filterAlquiler}
                    >
                        <Badge
                            //badgeContent={40}
                            color="secondary"
                            className="filter_badge"
                        >
                            {alquiler &&
                                <CheckBoxIcon className="filter_icon"/>
                            }
                            {!alquiler &&
                                <CheckBoxOutlineBlankIcon className="filter_icon"/>
                            }
                        </Badge>
                        <label className="filter_label">
                            Filtrar por alquiler
                        </label>
                    </IconButton>

                    <div className="card-container" >

                        <Badge
                            onClick={prevCard}
                        >
                            <ArrowCircleLeftIcon className="arrow" />
                        </Badge>

                        <VehicleCard className="card"
                                     thisVehicle={vehicles[vehicleItem]}
                            //thisLike={like}
                        />

                        <Badge
                            onClick={nextCard}
                        >
                            <ArrowCircleRightIcon className="arrow" />
                        </Badge>


                    </div>

                </main>
            </AppBar>
        </div>

    );


}