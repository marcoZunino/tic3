import React from "react";
import loginImg from "../../images/logo1.png";
import {Register} from "./register";
import ReactDOM from "react-dom/client";
import {InitialView} from "../init/initialView";
import {Route} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: ""
        };
    }

    navigate = useNavigate();

    handleMail(event) {
        this.setState(prevState => ({ mail: event.target.value, password: prevState.password }));
    }
    handlePassword(event) {
        this.setState(prevState => ({ mail: prevState.mail, password: event.target.value}));
    }


    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
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
                                   onChange={this.handleMail.bind(this)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input type="password"
                                   name="password"
                                   placeholder="contraseña"
                                   onChange={this.handlePassword.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button"
                            className="btn"
                            onClick={this.loginFunction}>
                        Ingresar
                    </button>
                </div>
            </div>
        );
    }

    loginFunction = () => {
        // const [token, setToken] = useState();
        // if (!token) {
        //     return <Login setToken={setToken}/>
        // }


        // buscar por mail (request)
        // if existe mail {
        //  comprobar contraseña {
        //      if pw correcta {
        //          ingresar a inicio
        //      } else {intentar nuevamente (contar intentos) }
        //  } else {error no existe mail}

        // fetch('http://127.0.0.1:8000/api/user',
        //     {mode:'no-cors'})
        //     .then(response => response.json())
        //     .then(data => console.log('get: ', data));

        // fetch('http://127.0.0.1:8000/api/user', {mode:'no-cors'});

        //fetch(https://jsonplaceholder.typicode.com/todos/1);


        console.log("Mail is:", this.state.mail);
        console.log("Pw is:", this.state.password);

        //return navigate("/home");
        // const root = ReactDOM.createRoot(document.getElementById('root'));
        // const element = <InitialView mail = {this.state.mail}/>;
        // root.render(element);


    }
}

// function navigate() {
//     return useNavigate();
// }