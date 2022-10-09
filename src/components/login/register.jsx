import React from "react";
import loginImg from "../../images/logo1.png";

export class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: "",
            password: "",
            password2: ""
        };
    }

    handleMail(event) {
        this.setState(prevState => ({
                mail: event.target.value,
                password: prevState.password,
                password2: prevState.password2
        }));
        console.log('mail is:', event.target.value);
    }
    handlePassword(event) {
        this.setState(prevState => ({
            mail: prevState.mail,
            password: event.target.value,
            password2: prevState.password2
        }));
        console.log('pw is:', event.target.value);
    }
    handlePassword2(event) {
        this.setState(prevState => ({
            mail: prevState.mail,
            password: prevState.password,
            password2: event.target.value
        }));
        console.log('pw2 is:', event.target.value);
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>
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
                        <div className="form-group">
                            <label htmlFor="password2">Ingrese de nuevo la contraseña</label>
                            <input type="password"
                                   name="password2"
                                   placeholder="contraseña"
                                   onChange={this.handlePassword2.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <button type="button"
                            className="btn"
                            onClick={this.signInFunction.bind(this)}>
                        Ingresar
                    </button>
                </div>
            </div>
        );
    }

    signInFunction() {
        // const [token, setToken] = useState();
        // if (!token) {
        //     return <Login setToken={setToken}/>
        // }
        console.log("Mail is:", this.state.mail);
        console.log("Pw is:", this.state.password);

        if(this.state.password !== this.state.password2) {
            console.log("error");
        } else {
            console.log("Mail is:", this.state.mail);
            console.log("Pw is:", this.state.password);
        }
    }
}