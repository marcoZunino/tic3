import React from "react";
import img from "../../images/logoCompletoN.png";
import {Link, useLocation} from "react-router-dom";

export const InitialView = props => {

    let user = props.user;
    let userId = props.userId;

    const location = useLocation();

    if (location.state.user !== "") {
        user = location.state.user;
        userId = location.state.userId;
    }

    const printId = () => {
        console.log("ID: ", userId);
    }

    return (
        <div className="inicio">
            <div className="header">Página de inicio</div>
            <li>
                <Link to="/">Salir</Link>
            </li>
            <div className="content">
                <div className="image">
                    <img src={img} />
                </div>
                <div className="form">
                    <label>Usuario:</label>
                    <br/>
                    <h1>{props.message} </h1>
                    <h1>Bienvenido, {user} </h1>

                    <div>
                        <button type="button"
                                className="btn1"
                                onClick={printId}>
                            ID
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}