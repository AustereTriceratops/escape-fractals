import React, { Component } from "react";

import Controls from "./controls";
import Main from "./main";
import './App.css';


class App extends Component {
  state = {
    value: 0.2
  };

  instance: Main;

  componentDidMount() {
    this.instance = new Main({value: this.state.value});
  }

  setValue(newValue) {
    this.setState({value: newValue});
    
    this.instance.update(newValue);
    this.instance.render();
  }

  render() {
    return (
      <>
        <Controls
          value={this.state.value}
          setValue={this.setValue.bind(this)}
        />
        <div
          className="canvas-wrapper"
          id="canvas"
        />
      </>
    );
  }
}

export default App;
