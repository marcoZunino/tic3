import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Alert, AlertTitle, Button} from "@mui/material";

export const Register = props => {

    const [errorMessage, setMsg] = useState('');
    const [mail, setMail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleMail = (event) => {
        setMail(event.target.value);
    }
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const handleLastName = (event) => {
        setLastName(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handlePassword2 = (event) => {
        setPassword2(event.target.value)
    }

    const navigate = useNavigate();

    const signInFunction = () => { // NO FUNCIONA !!!
        setMsg('');

        if (password ==='' || password2 === '' || mail === '' || firstName === '' || lastName === '') {
            setMsg("Campos vacios");
            return;
        }
        if(password !== password2){
            setMsg("Constraseñas no coinciden");

        } else {
            // Parametros de la funcion POST
            // const element = document.querySelector('#post-request .id');
            const params = { mail: mail, first_name: firstName, last_name: lastName, password: password};
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body:JSON.stringify(params)
            };
            const url = `http://localhost:8000/api/user`
            fetch(url, options)
                .then(data => data)
                .then(res => {
                    try {
                        console.log(res.status)
                        //element.innerHTML = res.id;
                        console.log(res.json());
                        console.log(res)
                        console.log(res.id)
                        if(res.ok){ // Indica si la respuesta fue afirmativa
                            navigate("/home", {state: {user: mail, userId: undefined}});
                        } else{
                            setMsg("Invalid mail")
                        }

                    } catch (e) {
                        console.log(e.message);
                        setMsg("Invalid Mail");
                    }
                })
        }
    }

    const renderError = msg => {
        if (msg === '') return null;
        //return <ErrorMessage message={msg}/>
        return (
            <div>
                <Alert severity="error"
                       action = {
                           <Button color="inherit" size="small" onClick={() => setMsg('')}>
                               X
                           </Button>
                       }
                >
                    <AlertTitle>Error</AlertTitle>
                    {msg}
                </Alert>
            </div>
        );
    }

    // Si el sucede un error en el registro, no mostramos los botones de ingreso
    const buttonIngreso = msg => {
        if(msg === ''){
            return(
                <div className="footer">
                    <div>
                        <button type="button"
                                className="btn1"
                                onClick={signInFunction}>
                            Ingresar
                        </button>
                    </div>
                    <div>
                        <button type="button"
                                className="btn2"
                                onClick={() => navigate("/home", {state: { user: undefined }})}>
                            Ingresar como invitado
                        </button>
                    </div>
                </div>
            );
        }
        return null;
    }



    return (
        <div className="base-container" ref={props.containerRef}>
            <div className="header">Registrarse</div>

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
                        <label htmlFor="firstName">Nombre</label>
                        <input type="text"
                               name="firstName"
                               placeholder="nombre"
                               onChange={handleFirstName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Apellido</label>
                        <input type="text"
                               name="lastName"
                               placeholder="apellido"
                               onChange={handleLastName}
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
                    <div className="form-group">
                        <label htmlFor="password2">Ingrese de nuevo la contraseña</label>
                        <input type="password"
                               name="password2"
                               placeholder="contraseña"
                               onChange={handlePassword2}
                        />
                    </div>
                </div>
            </div>
            {buttonIngreso(errorMessage)}
            <br/>
            <br/>
            {renderError(errorMessage)}
        </div>
    );
}