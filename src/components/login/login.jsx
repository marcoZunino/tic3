import React from "react";
import loginImg from "../../images/logo1.png";
import {Register} from "./register";
import ReactDOM from "react-dom/client";
import {InitialView} from "../init/initialView";


export class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: ""
        };
    }

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
                            onClick={this.loginFunction.bind(this)}>
                        Ingresar
                    </button>
                </div>
            </div>
        );
    }

    loginFunction() { //request
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

        console.log("Mail is:", this.state.mail);
        console.log("Pw is:", this.state.password);
        // <div className="container" ref={ref => (this.container = ref)}>
        //     <InitialView containerRef={ref => (this.current = ref)}/>
        // </div>

        const root = ReactDOM.createRoot(document.getElementById('root'));
        const element = <InitialView mail = {this.state.mail}/>;
        root.render(element);


    }
}