import React, { Component } from "react"
import { Checkbox } from "@mui/material";
import { ArrowLeft, ArrowRight, BorderStyle } from '@mui/icons-material';

import { controlsProps, controlsState } from "./types";


class Controls extends Component<controlsProps, controlsState> {
    props;

    constructor(props: controlsProps) {
        super(props);
        this.props = props;
        this.state = {mouseOver: false, collapsed: false}

        this.onChange = this.onChange.bind(this);
    }

    onChange(index: number) {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            const val = parseFloat( event.currentTarget.value );
            this.props.setParams(val, index);
        }
    }

    render() {
        const {mouseOver, collapsed} = this.state;

        return (
            <div 
                style={{
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'row',
                }}
                onMouseOver={() => this.setState({mouseOver: true})}
                onMouseLeave={() => this.setState({mouseOver: false})}
            >
                <div style={{
                    display: collapsed ? 'none' : 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    padding: '0.4rem',
                    background: '#d9d9d9',
                    opacity: mouseOver ? '0.8' : '0.3',
                    userSelect: 'none'
                }}>
                    {this.props.params.map((val: number, index: number) => (
                        <div
                            key={`row_${index}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem'
                            }}
                        >
                            <input
                                step="0.01"
                                type="range"
                                min="-2"
                                max="2"
                                value={val}
                                onChange={this.onChange(index)}
                                onDoubleClick={() => this.props.setParams(0, index)}
                            />
                            {val}
                        </div>
                    ))}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                    }}>
                        <img 
                            src={require('./assets/colormap_1.png')}
                            width='30px'
                            style={{
                                cursor: 'pointer',
                                border: '2px solid',
                            }}
                            onClick={() => this.props.setColorScheme(0)}
                        />
                        <img 
                            src={require('./assets/colormap_2.png')}
                            width='30px'
                            style={{
                                cursor: 'pointer',
                                border: '2px solid',
                            }}
                            onClick={() => this.props.setColorScheme(1)}
                        />
                        <img 
                            src={require('./assets/colormap_3.png')}
                            width='30px'
                            style={{
                                cursor: 'pointer',
                                border: '2px solid',
                            }}
                            onClick={() => this.props.setColorScheme(2)}
                        />
                        <img 
                            src={require('./assets/colormap_4.png')}
                            width='30px'
                            style={{
                                cursor: 'pointer',
                                border: '2px solid',
                            }}
                            onClick={() => this.props.setColorScheme(3)}
                        />
                        <img 
                            src={require('./assets/colormap_5.png')}
                            width='30px'
                            style={{
                                cursor: 'pointer',
                                border: '2px solid',
                            }}
                            onClick={() => this.props.setColorScheme(4)}
                        />
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
                <div 
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#555',
                        color: 'white',
                        opacity: '70%',
                        cursor: 'pointer',
                      }}
                    onClick={() => this.setState({collapsed: !collapsed})}
                >
                    {collapsed? <ArrowRight/> : <ArrowLeft/>}
                </div>
            </div>
        )
    };
}

export default Controls;
