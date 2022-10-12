import React from "react";
import img from "../../images/login.svg";

export class InitialView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="base-container" ref={this.props.containerRef}>

                <div className="header">Página de inicio</div>

                <div className="content">
                    <div className="image">
                        <img src={img} />
                    </div>
                    <div className="form">
                        <label>Usuario:</label>
                        <br/>
                        {/*<text>mail</text>*/}

                    </div>
                </div>
            </div>
        );
    }
}