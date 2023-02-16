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

    createInput(val, n: number) {
        return (
            <div className="input_row" key={`row_${n}`}>
                <input
                    step="0.01"
                    type="range"
                    min="-2"
                    max="2"
                    value={val}
                    onChange={this.onChange(n)}
                    id="slider_a"
                    />
                <input
                    step="0.01"
                    type="number"
                    min="-2"
                    max="2"
                    value={val}
                    onChange={this.onChange(n)}
                />
            </div>
        )
    }

    render() {
        return (
            <div className="control_panel">
                <div className="body">
                    {this.props.params.map((val, index) => this.createInput(val, index))}
                    <div className="input_row">
                        <button onClick={() => this.props.setColorScheme(0)}>1</button>
                        <button onClick={() => this.props.setColorScheme(1)}>2</button>
                        <button onClick={() => this.props.setColorScheme(2)}>3</button>
                        <button onClick={() => this.props.setColorScheme(3)}>4</button>
                    </div>
                </div>
                <div className="close"></div>
            </div>
        )
    };
}

export default Controls;
