import { Pane } from "tweakpane";
import p5 from "p5";

export const displacedLinesSketch = (p: p5) => {
    const CANVAS_SIZE = 800;
    let params = {
        density: 50,
        numLines: 8,
        maxDisplacement: 100,
        noiseScale: 0,
        positionXScaleFactor: 1,
        positionYScaleFactor: 1,
        positionXOffset: 0,
        positionYOffset: 0,
        prevScale: 0.5,
    };
    let pane = new Pane();

    let time: number = 0;

    function displacedLines(
        density: number,
        nLines: number,
        maxDisplacement: number,
        noiseScale: number,
        positionXScaleFactor: number,
        positionYScaleFactor: number,
        positionXOffset: number,
        positionYOffset: number,
        prevScale: number,
    ) {
        let gapSize = CANVAS_SIZE / nLines;
        let lineWidth = CANVAS_SIZE / density;
        p.randomSeed(1);

        for (let i = 0; i < nLines; i++) {
            let prevOffset = 0;

            for (let j = 0; j < density; j++) {
                let positionScale = p.max(positionXScaleFactor * (i / nLines + positionXOffset), 0) + p.max(positionYScaleFactor * (j / density + positionYOffset), 0);
                let offset = positionScale * (p.noise(i, j) - 0.5) * maxDisplacement * noiseScale;
                p.line(
                    j * lineWidth,
                    i * gapSize + prevOffset,
                    (j + 1) * lineWidth,
                    i * gapSize + prevOffset * prevScale + offset
                );
                prevOffset = prevOffset * prevScale + offset;
            }
        }
    }

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);

        pane.addBinding(params, "density", { min: 1, max: 2000, step: 1 });
        pane.addBinding(params, "numLines", { min: 1, max: 100, step: 1 });
        pane.addBinding(params, "maxDisplacement", { min: 0, max: 200, step: 1 });
        pane.addBinding(params, "noiseScale", { min: 0, max: 1, step: 0.01 });
        pane.addBinding(params, "positionXScaleFactor", { min: 0, max: 1, step: 0.01 });
        pane.addBinding(params, "positionYScaleFactor", { min: 0, max: 1, step: 0.01 });
        pane.addBinding(params, "positionXOffset", { min: -1, max: 1, step: 0.01 });
        pane.addBinding(params, "positionYOffset", { min: -1, max: 1, step: 0.01 });
        pane.addBinding(params, "prevScale", { min: 0, max: 1, step: 0.01 });
    };

    p.draw = () => {
        p.background(250);

        displacedLines(
            params.density,
            params.numLines,
            params.maxDisplacement,
            params.noiseScale,
            params.positionXScaleFactor,
            params.positionYScaleFactor,
            params.positionXOffset,
            params.positionYOffset,
            params.prevScale,
        );

        time += p.deltaTime;
    };
};