import React, {useState} from "react";
import loginImg from "../../images/logo1.png";
import { useNavigate } from "react-router-dom";
import {Alert, AlertTitle, Button} from "@mui/material";

export const Login = props => {

    let mail = props.mail;
    let password = props.password;

    const [errorMessage, setMsg] = useState('');

    const handleMail = (event) => {
        mail = event.target.value;
    }

    const handlePassword = (event) => {
        password = event.target.value;
    }

    const navigate = useNavigate();

    const loginFunction = () => {
        setMsg('');
        //Parametros de la funcion get
        const params = { mail: mail, password: password };
        const options = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        };
        const url = `http://localhost:8000/api/user?${new URLSearchParams(params)}`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                console.log("Result is:", res["result"]);
                console.log("User id is:", res["user"]);

                if (res["result"] === "valid") {
                    console.log("Mail is:", mail);
                    navigate("/home", { state: { user: mail, userId: res["user"] } });
                } else {
                    console.log("error: ", res["user"]);
                    setMsg(res["user"]);
                }
            })
    }

    const renderError = msg => {
        if (msg === '') return null;
        //return <ErrorMessage message={msg}/>
        return (
            <div>
                {/*<Alert onClose={() => {}}>This is a success alert — check it out!</Alert>*/}
                <Alert severity="error"
                       action = {
                           <Button color="inherit" size="small" onClick={() => setMsg('')}>
                               X
                           </Button>
                       }
                >
                    <AlertTitle>Error</AlertTitle>
                    Error: <strong>{msg}</strong>
                </Alert>
            </div>
        );
    }

    return (
        <div className="base-container" ref={props.containerRef}>
            <div className="header">Iniciar sesión</div>
            <br/>
            <div className="image">
                <img src={loginImg} />
            </div>
            <div className="content">
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="mail">Correo electrónico</label>
                        <input type="text"
                               name="mail"
                               placeholder="correo electrónico"
                               onChange={handleMail}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password"
                               name="password"
                               placeholder="contraseña"
                               onChange={handlePassword}
                        />
                    </div>
                </div>
            </div>
            <div className="footer">
                <div>
                    <button type="button"
                            className="btn1"
                            onClick={loginFunction}>
                        Ingresar
                    </button>
                </div>
                <div>
                    <button type="button"
                            className="btn2"
                            onClick={() => {
                                navigate("/home", { state: { user: undefined } });
                            }}>
                        Ingresar como invitado
                    </button>
                </div>
                {renderError(errorMessage)}
            </div>
        </div>
    );

}

