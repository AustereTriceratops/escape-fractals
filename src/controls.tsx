import React from "react"
import { Component } from "react"



class Controls extends Component {
    props;

    constructor(props) {
        super(props);
        this.props = props;

        this.onChange = this.onChange.bind(this);
    }

    onChange(index) {
        return (event) => {
            this.props.setParams(event.target.value, index);
        }
    }

    render() {
        return (
            <div className="control_panel">
                <input
                    step="0.01"
                    type="range"
                    min="-1"
                    max="1"
                    value={this.props.params[0]}
                    onChange={this.onChange(0)}
                    id="slider_a"
                />
                <input
                    step="0.01"
                    type="range"
                    min="-1"
                    max="1"
                    value={this.props.params[1]}
                    onChange={this.onChange(1)}
                    id="slider_b"
                />
                <input
                    step="0.01"
                    type="range"
                    min="-1"
                    max="1"
                    value={this.props.params[2]}
                    onChange={this.onChange(2)}
                    id="slider_c"
                />
                <input
                    step="0.01"
                    type="range"
                    min="-1"
                    max="1"
                    value={this.props.params[3]}
                    onChange={this.onChange(3)}
                    id="slider_d"
                />
            </div>
        )
    };
}

export default Controls;
