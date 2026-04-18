import { Slider } from "../helpers/slider";
import p5 from "p5";
import { tile } from "../helpers/util";

export const straightLinesSketch = (p: p5) => {
    const CANVAS_SIZE = 800;
    let densitySlider: Slider

    function rLine(x: number, y: number, w: number, h: number, col: number, row: number, rThreshold: number) {
        const r = p.noise(col, row);

        let midX = x + w / 2;
        let midY = y + h / 2;

        if (r < rThreshold) {
            p.line(midX, y, midX, y + h);
        } else {
            p.line(x, midY, x + w, midY);
        }
    }

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);

        densitySlider = new Slider(p, "Density", 1, 100);
    };

    p.draw = () => {
        p.background(250);
        tile(CANVAS_SIZE, densitySlider.value(), rLine, 0.5);

        densitySlider.update();
    };
};