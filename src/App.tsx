import React, { Component } from "react";

import Controls from "./controls";
import Main from "./main";
import './App.css';


class App extends Component {
  state = {
    params: [0, 0, 0, 0],
  };

  instance: Main;

  componentDidMount() {
    this.instance = new Main({params: this.state.params});
  }

  setParams(value, index) {
    const newParams = [...this.state.params];
    newParams[index] = value;

    this.setState({params: newParams});

    this.instance.update(newParams);
    this.instance.render();
  }

  render() {
    return (
      <>
        <Controls
          params={this.state.params}
          setParams={this.setParams.bind(this)}
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
