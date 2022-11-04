import MenuIcon from '@mui/icons-material/Menu';
import React, {useEffect, useState} from "react";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
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
import {blue, red} from "@mui/material/colors";

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

        //navigate("/");
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
        const params = { vehiculo:id_vehiculo, comprador: userId };
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

    const deleteLike = (id_vehiculo) => {
        //Parametros de la funcion DELETE
        const params = { vehiculo: id_vehiculo, comprador: userId };
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

    // POST chat, luego abrirlo en la ventana de chats:
    const openChat = () => {
        return null;
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


        const clickLike = () =>{

        }

        let show_like = !likeUndo[item];
        return (
            <Card sx={{maxWidth: 400, boxShadow: "0px 0px 12px 1px #737373"}} classname="card">
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">

                        </Avatar>

                    }
                    title={`${thisVehicle["data_vendedor"]["first_name"]} ${thisVehicle["data_vendedor"]["last_name"]}`}
                />
                <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/png;base64,${thisVehicle["data_vehiculo"]["imagen"]}`}
                    //image=thisVehicle["imagen"]
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
                        {/*Kilometraje: {thisVehicle["kilometros"]} <br/>*/}
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

                    <Button className="btnCont" onClick={openChat} size="large">
                        <ChatIcon className="item-icon"/>
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


                    <div className="card-container" >

                        <Grid container rowSpacing={1} columnSpacing={1}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid containter columnSpacing={2} xs={2} sm={4} md={4} key={index}>
                                    <LikeCard className="card"
                                              thisVehicle={allLikes[index]}
                                              item={index}
                                        //thisVehicle={undefined}
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