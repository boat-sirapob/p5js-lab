import p5, { Color } from "p5";
import { tile, toPColor } from "../helpers/util";

import { Pane } from "tweakpane";

export const tileArcSketch = (p: p5) => {
    const CANVAS_SIZE = 800;
    let params = {
        seed: 1,
        color: { r: 0, g: 0, b: 0 },
        bgColor: "rgb(255, 255, 255)",
        density: 100,
        strokeWeight: 1,
        noiseScale: 0.04,
        timeScale: 0.0011,
        timeOffsetScale: 0.0011,
    };
    let pane = new Pane();

    let time = 0;

    function tiledArc(x: number, y: number, w: number, h: number, col: number, row: number, t: number, color: p5.Color, strokeWeight: number, noiseScale: number, timeScale: number, timeOffsetScale: number) {
        let r = p.int(p.noise(col * noiseScale + t * timeOffsetScale, row * noiseScale + t * timeOffsetScale, t * timeScale) * 3);

        p.stroke(color);
        p.strokeWeight(strokeWeight);
        p.noFill();

        if (r === 0) {
            // bottom right
            p.arc(x + w, y + h, w, h, p.PI, p.PI + p.HALF_PI);

            // top left
            p.arc(x, y, w, h, 0, p.HALF_PI);
        }
        else if (r === 1) {
            // bottom left
            p.arc(x, y + h, w, h, p.PI + p.HALF_PI, 0);
            // top right
            p.arc(x + w, y, w, h, p.HALF_PI, p.PI);
        }
        else if (r === 2) {
            p.line(x + w / 2, y, x + w / 2, y + h);
            p.line(x, y + h / 2, x + w, y + h / 2);
        }
    }

    function drawScene() {
        tile(CANVAS_SIZE, params.density, tiledArc, time, toPColor(p, params.color), params.strokeWeight, params.noiseScale, params.timeScale, params.timeOffsetScale);
    }

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        p.background(params.bgColor);

        pane.addBinding(params, "seed");
        pane.addBinding(params, "color");
        pane.addBinding(params, "bgColor");
        pane.addBinding(params, "density", { min: 0, max: 200, step: 1 });
        pane.addBinding(params, "strokeWeight", { min: 0, max: 20, step: 1 });
        pane.addBinding(params, "noiseScale", { min: 0, max: 1, step: 0.01 });
        pane.addBinding(params, "timeScale", { min: 0, max: 0.1, step: 0.0001 });
        pane.addBinding(params, "timeOffsetScale", { min: 0, max: 0.1, step: 0.0001 });

        drawScene();
    };

    p.draw = () => {
        time += p.deltaTime;

        p.background(params.bgColor);
        drawScene();
    };
};