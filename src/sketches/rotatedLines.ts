import { Slider } from "../helpers/slider";
import p5 from "p5";
import { tile } from "../helpers/util";

export const rotatedLinesSketch = (p: p5) => {
    const CANVAS_SIZE = 800;
    let densitySlider: Slider;
    let rotationSlider: Slider;
    let timeSlider: Slider;
    let noiseSlider: Slider;

    let time: number = 0;

    function rLine(x: number, y: number, w: number, h: number, col: number, row: number, rotation: number, maxCols: number, maxRows: number, timeScale: number, noiseScale: number) {
        let rotRad = p.radians((col / maxCols + row / maxRows) * 360 + time * timeScale + (p.random() * 360 - 180) * noiseScale);

        p.line(
            x + p.sin(rotRad) * w / 2 + w / 2 + (p.random() - 0.5) * 10 * noiseScale,
            y - p.cos(rotRad) * h / 2 + h / 2 + (p.random() - 0.5) * 10 * noiseScale,
            x - p.sin(rotRad) * w / 2 + w / 2 + (p.random() - 0.5) * 10 * noiseScale,
            y + p.cos(rotRad) * h / 2 + h / 2 + (p.random() - 0.5) * 10 * noiseScale
        );
    }

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);

        densitySlider = new Slider(p, "Density", 1, 200, 5);
        rotationSlider = new Slider(p, "Rotation", 0, 360, 0);
        timeSlider = new Slider(p, "Time Scale", 0, 1, 0, 0.05);
        noiseSlider = new Slider(p, "Noise Scale", 0, 1, 0, 0.05);
    };

    p.draw = () => {
        p.background(250);
        let density = densitySlider.value();
        tile(CANVAS_SIZE, density, rLine, rotationSlider.value(), density, density, timeSlider.value(), noiseSlider.value());

        densitySlider.update();
        rotationSlider.update();
        timeSlider.update();
        noiseSlider.update();

        time += p.deltaTime;
    };
};