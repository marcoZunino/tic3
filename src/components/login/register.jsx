import React from "react";
import loginImg from "../../images/logo1.png";
import { useNavigate } from "react-router-dom";

export const Register = props => {

    let mail = props.mail;
    let password = props.password;
    let password2 = props.password2;

    const handleMail = (event) => {
        mail = event.target.value;
    }

    const handlePassword = (event) => {
        password = event.target.value;
    }

    const handlePassword2 = (event) => {
        password2 = event.target.value;
    }

    const navigate = useNavigate();

    const signInFunction = () => {

        if (password !== password2) {
            console.log("error");
        } else {
            console.log("Mail is:", mail);
            console.log("Pw is:", password);

            navigate("/home", {state: { user:mail }});
        }
    }

    return (
        <div className="base-container" ref={props.containerRef}>
            <div className="header">Registrarse</div>
            <br/>
            <div className="image" align>
                <img src={loginImg} />
            </div>
            <div className="content">
                <div className="form">
                    {/*<div className="form-group">*/}
                    {/*    <label htmlFor="username">Username</label>*/}
                    {/*    <input type="text" name="username" placeholder="username" />*/}
                    {/*</div>*/}
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
                            onClick={() => navigate("/home", {state: { user:"" }})}>
                        Ingresar como invitado
                    </button>
                </div>
            </div>
        </div>
    );
}