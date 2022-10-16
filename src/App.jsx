import React, {useState} from "react";
import "./App.scss";
import { Login, Register, InitialView } from "./components";
import loginImg from "./images/logoCompletoN.png";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginActive: true
    };
  }

  componentDidMount() {
    //Add .right by default
    this.rightSide.classList.add("right");
  }

  changeState() {
    const { isLoginActive } = this.state;
    if (isLoginActive) {
      this.rightSide.classList.remove("right");
      this.rightSide.classList.add("left");
    } else {
      this.rightSide.classList.remove("left");
      this.rightSide.classList.add("right");
    }
    this.setState(prevState => ({ isLoginActive: !prevState.isLoginActive }));
  }

  render() {
    const { isLoginActive } = this.state;
    const current = isLoginActive ? "Registrarse" : "Iniciar sesión";
    const currentActive = isLoginActive ? "login" : "register";
    return (
        <div id="root" className="App">
          <div className="login">
            <div className="container" ref={ref => (this.container = ref)}>
              {isLoginActive && (
                  <Login containerRef={ref => (this.current = ref)}/>
              )}
              {!isLoginActive && (
                  <Register containerRef={ref => (this.current = ref)} />
              )}
            </div>
            <RightSide
                current={current}
                currentActive={currentActive}
                containerRef={ref => (this.rightSide = ref)}
                onClick={this.changeState.bind(this)}
            />
          </div>
        </div>
    );
  }
}

const RightSide = props => {
  return (
      <div
          className="right-side"
          ref={props.containerRef}
          onClick={props.onClick}
      >
        <div className="inner-container">
          <div className="text">{props.current}</div>
        </div>
      </div>
  );
};



export default App;