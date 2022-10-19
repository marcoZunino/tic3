import React from "react";
import "./App.scss";
import { Login, Register } from "./components";

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
        <div id ="root" className="App">
          <div className="login">
            <div className="container">
              {isLoginActive && (
                  <Login containerRef={ref => (this.current = ref)} mail="" password=""/>
              )}
              {!isLoginActive && (
                  <Register containerRef={ref => (this.current = ref)} mail="" password="" password2=""/>
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