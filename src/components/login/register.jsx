import React from "react";
import { useNavigate } from "react-router-dom";

export const Register = props => {

    let mail = props.mail;
    let firstName = props.firstName;
    let lastName = props.lastName;
    let password = props.password;
    let password2 = props.password2;

    const handleMail = (event) => {
        mail = event.target.value;
    }
    const handleFirstName = (event) => {
        firstName = event.target.value;
    }
    const handleLastName = (event) => {
        lastName = event.target.value;
    }
    const handlePassword = (event) => {
        password = event.target.value;
    }
    const handlePassword2 = (event) => {
        password2 = event.target.value;
    }

    const navigate = useNavigate();

    const signInFunction = () => { // NO FUNCIONA !!!

        if (password !== password2) {
            console.log("error: las contraseñas no coinciden");
        } else {
            //Parametros de la funcion POST
            //const element = document.querySelector('#post-request .id');
            const params = { mail: mail, first_name: firstName, last_name: lastName, password: password };
            const options = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Token ' + localStorage.getItem('token')
                }
            };
            const url = `http://localhost:8000/api/user?${new URLSearchParams(params)}`
            fetch(url, options)
                .then(data => data.json())
                .then(res => {
                    // console.log("Result is:", res["result"]);
                    // console.log("User id is:", res["user"]);
                    try {
                        //element.innerHTML = res.id;
                        console.log(res.id);
                        navigate("/home", { state: { user: mail, userId: res.id } });

                    } catch (e) {
                        console.log(e.message);
                    }
                    // if (res["result"] === "valid") {
                    //
                    //     console.log("Mail is:", mail);
                    //     console.log("First name is:", firstName);
                    //     console.log("Last name is:", lastName);
                    //     navigate("/home", { state: { user: mail, userId: res["user"] } });
                    // } else {
                    //     console.log("error: ", res["user"]);
                    //     //mensaje de error !!!
                    // }
                })

            //navigate("/home", {state: {user: mail, userId: res["user"]}});
        }
    }

    return (
        <div className="base-container" ref={props.containerRef}>
            <div className="header">Registrarse</div>
            <br/>
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
        </div>
    );
}