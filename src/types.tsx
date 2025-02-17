type controlsProps = {
    params: number[];
    controls_hidden: boolean;
    colors_inverted: number;

    setParams: (value: number, index: number) => void;
    setColorScheme: (value: number) => void;
    toggleColorsInverted: () => void;
    toggleControls: () => void;
}

type controlsState = {
    mouseOver: boolean;
}

type mainProps = {
    params: number[];
    color_scheme: number;
    colors_inverted: number;
    controls_hidden: boolean;
}

export { type controlsProps, type mainProps, type controlsState }