import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import {useLocation, useNavigate} from "react-router-dom";
import {
    AppBar, Avatar,
    Badge, CardHeader,
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
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {ErrorMessage} from "../../errorMessage";
import logo from "../../../images/logoCompletoN.png";
import {MainListItems} from "../mainListItems";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

export const LikesView = props => {

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
    const [userLikes, setUserLikes] = useState([]);
    const [like, setLike] = useState(0);
    const [likeUndo, setLikeUndo] = useState([]);
    const [likes, setLikes] = useState([]);

    const askLogin = () => {
        setMsg('Acción no permitida, debe iniciar sesión');

    }

    const undoLike = (event) => {

        let id_vehiculo = event.currentTarget.getAttribute('vehiculo');
        let index = event.currentTarget.getAttribute('index');
        setLike(index);

        if(!likeUndo[index]){
            console.log("VERDADERO");
        }

        if (!likeUndo[index]) {
            console.log("Undo like", id_vehiculo);
            deleteLike(id_vehiculo);

        } else { // agregamos el like:
            console.log("Post like", id_vehiculo);
            postLike(id_vehiculo);
        }

        likeUndo[index] = !likeUndo[index];
        setLikeUndo(likeUndo);

        return undefined
    }

    useEffect(() => {
        setLike(1);
        console.log("Se corre el use efect");
        console.log(likeUndo);
    }, [likeUndo, like])

    const postLike = (id_vehiculo) => {
        //Parametros de la funcion POST
        const params = { vehiculo: id_vehiculo, comprador: userId };
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

    const deleteLike = (vehicleId) => {
        //Parametros de la funcion DELETE
        const params = { vehiculo: vehicleId, comprador: userId };
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

    // abrir chat en la ventana de chats, crearlo si no existe:
    const openChat = (event) => {
        //const vehicleId = event.currentTarget.getAttribute('vehiculo');
        const likeId = event.currentTarget.getAttribute('like');
        verifyChatExists(likeId);
    }

    const verifyChatExists = (likeId) => {

        // Buscamos el id del usuario con un get para verificar si ya existe el vendedor
        const params = { like: likeId };
        const urlUser = `http://localhost:8000/api/chat?${new URLSearchParams(params)}`;
        fetch(urlUser)
            .then(data => data.json())
            .then(res => {
                console.log("verify: ", res);
                if (res["result"] === "true") {
                    const chatId = res["data"]["id"];
                    navigate('/home/chats', { state: { user: user, userId: userId, chatId: chatId } });
                } else if (res["result"] === "false") {
                    postChat(likeId);     // registrar chat si no existe
                } else {
                    setMsg("Unexpected error");

                }
            });

    }


    const postChat = (likeId) => {
        const params = { like: likeId };
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body:JSON.stringify(params)
        };
        const url = `http://localhost:8000/api/chat`
        fetch(url, options)
            .then(data => data)
            .then(res => {
                try {
                    console.log("like POST res:", res);
                    if (res.ok) {
                        verifyChatExists(likeId);
                    } else {
                        setMsg("Error en chat")
                    }

                } catch (e) {
                    console.log(e.message);
                    setMsg("Unexpected error");
                }
            })

    }

    const navigate = useNavigate();
    const back = () => {
        navigate("/");
    }

    const getAllLikes = () => {

        const params = { comprador: userId , info_completa:"1"};
        const url = `http://localhost:8000/api/like?${new URLSearchParams(params)}`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                console.log("Likes get result is:", res);

                if (res["result"] === "ok") {
                    setAllLikes(res["data"]);
                    const dataList = res["data"];
                    let ids = [];
                    let undoLikes = [];
                    let likesUser = []
                    for (let i = 0; i < dataList.length; i++) { // traer los id de vehiculos con like
                        ids.push(dataList[i]["vehiculo"]);
                        console.log("Vendedor", dataList[i]["data_vendedor"]);
                        undoLikes.push(false);
                        likesUser.push(true);
                    }
                    setLikes(likesUser);
                    setLikeUndo(undoLikes);
                    setUserLikes(userLikes.concat(ids));

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
            getAllLikes();
        }
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const LikeCard = props => {

        const thisVehicle = props.thisVehicle;
        const item = props.item;

        if (thisVehicle === undefined) {
            return null;
        }

        let show_like = !likeUndo[item];
        return (
            <Card sx={{maxWidth: 400, boxShadow: "0px 0px 12px 1px #737373"}} classname="card">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: "#f36424" }} aria-label="recipe">

                        </Avatar>

                    }
                    title={`${thisVehicle["data_vendedor"]["first_name"]} ${thisVehicle["data_vendedor"]["last_name"]}`}
                />
                <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/png;base64,${thisVehicle["data_vehiculo"]["imagen"]}`}
                    alt="imagen prueba"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {/*BMW Serie 3*/}
                        {thisVehicle["data_vehiculo"]["marca"]} {"  "}
                        {thisVehicle["data_vehiculo"]["modelo"]}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {/*65.000 km*/}
                        Precio base: {thisVehicle["data_vehiculo"]["precio_base"]} <br/>
                        {/*Venta o Alquiler*/}
                        {thisVehicle["data_vehiculo"]["tipo"]}
                    </Typography>
                </CardContent>
                <CardActions className="cont">
                    <Button className="btnCont" onClick={undoLike} vehiculo={thisVehicle["data_vehiculo"]["id"]} index={item} size="large">
                        { !show_like && (
                            <ThumbUpOffAltIcon className="like" />
                        )}
                        { show_like && (
                            <ThumbUpIcon className="like" />
                        )}
                    </Button>

                    <Button className="btnCont" onClick={openChat} size="large" like={thisVehicle["id"]}>
                        <ChatIcon className="chat-icon"/>
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
                        Mis likes
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

                    <div className="card-container" >

                        <Grid sx={{marginTop: "100px", marginLeft: "50px"}} container rowSpacing={1} columnSpacing={1}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid sx={{marginBottom: "50px"}} containter columnSpacing={2} xs={2} sm={4} md={4} key={index}>
                                    <LikeCard className="card"
                                              thisVehicle={allLikes[index]}
                                              item={index}
                                    />
                                </Grid>
                            ))}
                        </Grid>

                    </div>

                </main>
            </AppBar>
        </div>

    );


}