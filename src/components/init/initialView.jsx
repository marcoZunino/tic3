import React from "react";
import img from "../../images/logoCompletoN.png";

export class InitialView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="inicio">

                <div className="header">Página de inicio</div>

                <div className="content">
                    <div className="image">
                        <img src={img} />
                    </div>
                    <div className="form">
                        <label>Usuario:</label>
                        <br/>
                        <h1>{this.props.message} </h1>
                        <h1>Bienvenido, {this.props.mail} </h1>

                    </div>
                </div>
            </div>
        );
    }
}