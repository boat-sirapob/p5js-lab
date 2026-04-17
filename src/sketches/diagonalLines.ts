import p5 from "p5";

export const diagonalLinesSketch = (p: p5) => {
    const CANVAS_SIZE = 800;
    let densitySlider: p5.Element;
    let densitySliderLabel: p5.Element;

    function rLine(x: number, y: number, w: number, h: number, col: number, row: number, rThreshold: number) {
        const r = p.noise(col, row);

        if (r < rThreshold) {
            p.line(x, y, x + w, y + h);
        } else {
            p.line(x + w, y, x, y + h);
        }
    }

    function tile<T extends unknown[]>(n: number, func: (x: number, y: number, w: number, h: number, col: number, row: number, ...args: T) => void, ...args: T) {
        const cellSize = CANVAS_SIZE / n;

        for (let x = 0; x < n; x++) {
            for (let y = 0; y < n; y++) {
                func(x * cellSize, y * cellSize, cellSize, cellSize, x, y, ...args);
            }
        }
    }

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);


        densitySliderLabel = p.createDiv();
        densitySlider = p.createSlider(1, 100);
    };

    p.draw = () => {
        p.background(250);
        tile(Number(densitySlider.value()), rLine, 0.5);
        densitySliderLabel.html(`Density: ${densitySlider.value()}`);
    };
};