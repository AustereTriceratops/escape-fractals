import React, { Component } from "react";

import Controls from "./controls";
import Main from "./main";
import './App.css';


class App extends Component {
  state = {
    params: [0, 0, 0, 0],
    color_scheme: 3,
    controls_hidden: false,
  };

  instance: Main;

  componentDidMount() {
    this.instance = new Main(this.state);
  }

  setParams(value, index) {
    const newParams = [...this.state.params];
    newParams[index] = value;

    this.setState({params: newParams});

    this.instance.update(newParams);
    this.instance.render();
  }

  setColorScheme(value) {
    this.setState({color_scheme: value})

    this.instance.updateColors(value);
    this.instance.render();
  }

  toggleControls() {
    const val = ! this.state.controls_hidden;
    this.setState({controls_hidden: val});
  }

  render() {
    return (
      <>
        <Controls
          params={this.state.params}
          setParams={this.setParams.bind(this)}
          setColorScheme={this.setColorScheme.bind(this)}
          controls_hidden={this.state.controls_hidden}
          toggleControls={this.toggleControls.bind(this)}
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
