import MenuIcon from '@mui/icons-material/Menu';
import React, {useState} from "react";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
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

export const NewPubView = props => {

    let user = props.user;
    let userId = props.userId;
    const location = useLocation();
    if (location.state.user !== "") {
        user = location.state.user;
        userId = location.state.userId;
    }

    const [open, setOpen] = useState(false);
    const [errorMessage, setMsg] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [tipo, setTipo] = useState('');
    const [matricula, setMatricula] = useState('');
    const [precio, setPrecio] = useState('');
    const [imagen, setImagen] = useState(null);

    const handleMarca = (event) => {
        setMarca(event.target.value);
    }
    const handleModelo = (event) => {
        setModelo(event.target.value);
    }
    const handleTipo = (event) => {
        setTipo(event.target.value);
    }
    const handleMatricula = (event) => {
        setMatricula(event.target.value);
    }
    const handlePrecio = (event) => {
        setPrecio(event.target.value);
    }
    const handleImagen = (event) => {
        setImagen(event.target.value);
    }


    const navigate = useNavigate();
    const home = () => {
        navigate("/");
    }
    const back = () => {
        navigate("/home/pubs", {state: {user: user, userId: userId}});
    }

    const postVehiculo = () => {
        console.log(imagen);
        //return;
        //setImagen(`http://localhost:3000/${imagen}`);
        //Parametros de la funcion POST
        const params = { vendedor: userId, marca: marca, modelo: modelo, tipo: tipo,
            matricula: matricula, precio_base: precio};
        //const params = {vendedor: "5", matricula: matricula, tipo:tipo};
        console.log("USER ID:", userId);
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body:JSON.stringify(params)
        };
        const url = `http://localhost:8000/api/vehiculo`
        fetch(url, options)
            .then(data => data)
            .then(res => {
                try {
                    console.log("vehiculo POST res:", res);
                    if (res.ok) {
                        navigate("/home/pubs", {state: {user: user, userId: userId}});
                    } else {
                        //navigate("/home/pubs", {state: {user: user, userId: userId}});
                        setMsg("Error en registro de vehiculo")
                    }

                } catch (e) {
                    console.log(e.message);
                    setMsg("Unexpected error");
                }
            })

    }

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
                                    onClick={home}
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

                    <div className="formcontent">
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="marca">Marca</label>
                                <input type="text"
                                       name="marca"
                                       placeholder="marca"
                                       onChange={handleMarca}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="modelo">Modelo</label>
                                <input type="text"
                                       name="modelo"
                                       placeholder="modelo"
                                       onChange={handleModelo}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tipo">Tipo</label>
                                <input type="text"
                                       name="tipo"
                                       placeholder="Venta/Alquiler"
                                       onChange={handleTipo}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="matricula">Matricula</label>
                                <input type="text"
                                       name="matricula"
                                       placeholder="matricula"
                                       onChange={handleMatricula}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="precio">Precio base</label>
                                <input type="text"
                                       name="precio"
                                       placeholder="precio base"
                                       onChange={handlePrecio}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="imagen">Imagen</label>
                                <input type="file"
                                       name="imagen"
                                       placeholder="imagen"
                                       onChange={handleImagen}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button type="button"
                                className="btn1"
                                onClick={postVehiculo}>
                            Publicar
                        </button>
                        <button type="button"
                                className="btn2"
                                onClick={back}>
                            Atrás
                        </button>
                    </div>

                </main>

            </AppBar>
        </div>

    );


}