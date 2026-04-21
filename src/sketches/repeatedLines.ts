import p5, { Color } from "p5";

import { Pane } from "tweakpane";

export const repeatedLinesSketch = (p: p5) => {
    const CANVAS_SIZE = 800;
    let params = {
        density: 150,
        maxDisplacement: 200,
        noiseScale: 1,
        smoothFactorX: 0.005,
        smoothFactorY: 0.005,
        prevScale: 0.5,
        repeatTime: 0,
        lineOpacity: 0.15,
        color: { r: 255, g: 0, b: 0 },
        bgColor: "rgb(0, 0, 0)",
    };
    let pane = new Pane();
    let repeatTimer: number = 0;
    let repetition: number = 0;

    function displacedLineSmooth(
        x: number,
        y: number,
        w: number,
        noiseFactor: number,
        smoothFactorX: number,
        smoothFactorY: number,
        density: number,
        maxDisplacement: number,
        noiseScale: number,
        prevScale: number,
        color: Color,
    ) {
        let lineWidth = w / density;
        const addSmoothVertex = (vx: number, vy: number) => {
            const curveVertex = (p as p5 & { curveVertex?: (x: number, y: number) => void }).curveVertex;
            if (typeof curveVertex === "function") {
                curveVertex.call(p, vx, vy);
                return;
            }
            p.vertex(vx, vy);
        };

        let prevOffset = 0;
        p.beginShape();
        p.stroke(color);
        p.noFill();

        addSmoothVertex(x, y);
        for (let j = 0; j < density; j++) {
            let offset = (p.noise(j * smoothFactorX, noiseFactor * smoothFactorY) - 0.5) * maxDisplacement * noiseScale;
            addSmoothVertex(
                x + (j + 1) * lineWidth,
                y + prevOffset * prevScale + offset
            );
            prevOffset = prevOffset * prevScale + offset;
        }
        addSmoothVertex(x + density * lineWidth, y + prevOffset);

        p.endShape();
    }

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        p.background(params.bgColor);

        pane.addBinding(params, "density", { min: 1, max: 2000, step: 1 });
        pane.addBinding(params, "maxDisplacement", { min: 0, max: 200, step: 1 });
        pane.addBinding(params, "noiseScale", { min: 0, max: 1, step: 0.01 });
        pane.addBinding(params, "smoothFactorX", { min: 0, max: 0.3, step: 0.001 });
        pane.addBinding(params, "smoothFactorY", { min: 0, max: 0.3, step: 0.001 });
        pane.addBinding(params, "prevScale", { min: 0, max: 1, step: 0.001 });
        pane.addBinding(params, "repeatTime", { min: 0, max: 1000, step: 1 });
        pane.addBinding(params, "lineOpacity", { min: 0, max: 1, step: 0.01 });
        pane.addBinding(params, "color");
        pane.addBinding(params, "bgColor");

        const btn = pane.addButton({
            title: 'Reset',
        });

        btn.on("click", () => {
            p.background(params.bgColor);
        })
    };

    p.draw = () => {

        if (repeatTimer > params.repeatTime) {
            repeatTimer = 0;

            // p.copy(0, 1, CANVAS_SIZE, CANVAS_SIZE - 1, 0, 0, CANVAS_SIZE, CANVAS_SIZE - 1);
            // p.noStroke();
            // p.fill(params.bgColor);
            // p.rect(0, CANVAS_SIZE - 1, CANVAS_SIZE, 1);

            displacedLineSmooth(
                0,
                CANVAS_SIZE,
                CANVAS_SIZE,
                repetition,
                params.smoothFactorX,
                params.smoothFactorY,
                params.density,
                params.maxDisplacement,
                params.noiseScale,
                params.prevScale,
                p.color(`rgba(${params.color.r}, ${params.color.g}, ${params.color.b}, ${params.lineOpacity})`),
            );
            repetition += 1;
        }

        repeatTimer += p.deltaTime;
    };
};