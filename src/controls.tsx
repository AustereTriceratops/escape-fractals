import React from "react"
import { Component } from "react"



class Controls extends Component {
    props;

    constructor(props) {
        super(props);
        this.props = props;

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.props.setValue(event.target.value);
    }

    render() {
        return (
            <input
                step="0.01"
                type="range"
                min="-1"
                max="1"
                value={this.props.value}
                onChange={this.onChange}
                id="slider"
            />
        )
    };
}

export default Controls;
