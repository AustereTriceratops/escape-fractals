import React, { Component } from "react"
import { Checkbox } from "@mui/material";

import { controlsProps, controlsState } from "./types";


class Controls extends Component<controlsProps, controlsState> {
    props;

    constructor(props: controlsProps) {
        super(props);
        this.props = props;
        this.state = {mouseOver: false}

        this.onChange = this.onChange.bind(this);
    }

    onChange(index: number) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat( event.currentTarget.value )
            this.props.setParams(val, index);
        }
    }

    createInput(val: number, n: number) {
        return (
            <div className="input_row" key={`row_${n}`}>
                <input
                    step="0.01"
                    type="range"
                    min="-2"
                    max="2"
                    value={val}
                    onChange={this.onChange(n)}
                    onDoubleClick={() => this.props.setParams(0, n)}
                    />
                <input
                    step="0.01"
                    type="number"
                    min="-2"
                    max="2"
                    value={val}
                    onChange={this.onChange(n)}
                    onDoubleClick={() => this.props.setParams(0, n)}
                />
            </div>
        )
    }

    render() {
        return (
            <div 
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'absolute',
                    width: '20%',
                    height: '30%',
                    background: '#d9d9d9',
                    opacity: this.state.mouseOver ? '0.8' : '0.3',
                }}
                onMouseOver={() => this.setState({mouseOver: true})}
                onMouseLeave={() => this.setState({mouseOver: false})}
            >
                { this.props.controls_hidden? null : 
                    <div className="body">
                        {this.props.params.map((val: number, index: number) => this.createInput(val, index))}
                        <div className="input_row">
                            <button onClick={() => this.props.setColorScheme(0)}>1</button>
                            <button onClick={() => this.props.setColorScheme(1)}>2</button>
                            <button onClick={() => this.props.setColorScheme(2)}>3</button>
                            <button onClick={() => this.props.setColorScheme(3)}>4</button>
                            <button onClick={() => this.props.setColorScheme(4)}>5</button>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                gap: '20px',
                                alignItems: 'center'
                            }}
                        >
                            <Checkbox
                                checked={(this.props.colors_inverted > 0.0)}
                                onChange={() => this.props.toggleColorsInverted()}
                            />
                            <div>Invert Colors</div>
                        </div>
                    </div>
                }
                <div className="close" onClick={this.props.toggleControls}></div>
            </div>
        )
    };
}

export default Controls;
