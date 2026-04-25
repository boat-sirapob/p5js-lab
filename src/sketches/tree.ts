import p5, { Color } from "p5";

import { Pane } from "tweakpane";

export const treeSketch = (p: p5) => {
    const CANVAS_SIZE = 800;
    let params = {
        color: { r: 0, g: 0, b: 0 },
        bgColor: "rgb(255, 255, 255)",
        nBranches: 3,
        branchAngle: 133,
        depthThreshold: 7,
        length: 114,
        width: 35,
        lengthMultiplier: 0.88,
        widthMultiplier: 0.54,
        seed: 2,
        leafColor: { r: 245, g: 65, b: 230 },
        leafRadius: 10,
        leafOpacity: 0.25,
    };
    let pane = new Pane();

    function tree(
        rootX: number,
        rootY: number,
        angle: number,
        length: number,
        width: number,
        depth: number,
        depthThreshold: number,
        color: Color,
        nBranches: number,
        branchAngle: number,
        lengthMultiplier: number,
        widthMultiplier: number,
        seed: number,
        leafColor: Color,
        leafRadius: number,
    ) {

        p.randomSeed(seed);

        function _leaf(x: number, y: number) {
            let temp = p.color(leafColor);
            let temp2 = p.lerpColor(temp, p.color(255), p.random() * 0.6);

            p.fill(temp2);
            p.ellipse(x, y, leafRadius);
        }

        function _tree(
            rootX: number,
            rootY: number,
            angle: number,
            length: number,
            width: number,
            depth: number,
        ) {
            if (depth > depthThreshold) {
                if (p.random() > 0.06) {
                    _leaf(rootX, rootY);
                    return;
                }
            }

            let angleRads = p.radians(angle);
            let endX = rootX + p.sin(angleRads) * length;
            let endY = rootY - p.cos(angleRads) * length;

            let endWidth = width * widthMultiplier;

            p.noStroke();
            p.fill(color);
            p.beginShape();
            p.vertex(rootX - width / 2, rootY);
            p.vertex(rootX + width / 2, rootY);
            p.vertex(endX + endWidth / 2, endY);
            p.vertex(endX - endWidth / 2, endY);
            p.endShape(p5.CLOSE);

            if (p.random() > 0.5) {
                _leaf(endX, endY);
            }

            for (let i = 0; i < nBranches; i++) {
                _tree(
                    endX,
                    endY,
                    angle + (p.random() - 0.5) * branchAngle,
                    length * lengthMultiplier * p.random(0.75, 1),
                    width * widthMultiplier,
                    depth + 1,
                );
            }
        }

        _tree(rootX, rootY, angle, length, width, depth);
    }

    function invertRect(x: number, y: number, w: number, h: number) {
        withInverted(() => {
            p.rect(x - w / 2, y - h / 2, w, h);
        });
    }

    function invertCircle(x: number, y: number, r: number) {
        withInverted(() => {
            p.ellipse(x, y, r);
        });
    }

    function withInverted(drawFn: () => void) {
        p.push();
        p.blendMode(p.DIFFERENCE);
        p.fill(255);
        p.noStroke();

        drawFn();

        p.pop();
    }

    function drawScene() {
        tree(
            CANVAS_SIZE / 2,
            CANVAS_SIZE,
            0,
            params.length,
            params.width,
            0,
            params.depthThreshold,
            p.color(`rgba(${params.color.r}, ${params.color.g}, ${params.color.b}, 1)`),
            params.nBranches,
            params.branchAngle,
            params.lengthMultiplier,
            params.widthMultiplier,
            params.seed,
            p.color(`rgba(${params.leafColor.r}, ${params.leafColor.g}, ${params.leafColor.b}, ${params.leafOpacity})`),
            params.leafRadius,
        );

        // invertRect(CANVAS_SIZE / 2, CANVAS_SIZE / 2, 300, 300);
        // invertCircle(CANVAS_SIZE / 2, CANVAS_SIZE - 200, 400);
    }

    p.setup = () => {
        p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
        p.background(params.bgColor);

        pane.addBinding(params, "seed");
        pane.addBinding(params, "color");
        pane.addBinding(params, "bgColor");
        pane.addBinding(params, "nBranches", { min: 0, max: 20, step: 1 });
        pane.addBinding(params, "branchAngle", { min: 0, max: 360, step: 0.1 });
        pane.addBinding(params, "depthThreshold", { min: 1, max: 10, step: 1 });
        pane.addBinding(params, "length", { min: 1, max: 400, step: 1 });
        pane.addBinding(params, "width", { min: 1, max: 100, step: 1 });
        pane.addBinding(params, "lengthMultiplier", { min: 0, max: 1, step: 0.01 });
        pane.addBinding(params, "widthMultiplier", { min: 0, max: 1, step: 0.01 });
        pane.addBinding(params, "leafColor");
        pane.addBinding(params, "leafRadius", { min: 0, max: 30, step: 0.1 });
        pane.addBinding(params, "leafOpacity", { min: 0, max: 1, step: 0.01 });

        const btn = pane.addButton({
            title: 'Reset',
        });

        btn.on("click", () => {
            params.seed = p.int(p.random(0, 65565));
            p.background(params.bgColor);
            drawScene();
            pane.refresh();
        })

        pane.on("change", () => {
            p.background(params.bgColor);
            drawScene();
        });

        drawScene();
    };

    p.draw = () => {

    };
};