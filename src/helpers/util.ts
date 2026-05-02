import type p5 from "p5";

export function tile<T extends unknown[]>(canvasSize: number, n: number, func: (x: number, y: number, w: number, h: number, col: number, row: number, ...args: T) => void, ...args: T) {
    const cellSize = canvasSize / n;

    for (let x = 0; x < n; x++) {
        for (let y = 0; y < n; y++) {
            func(
                x * cellSize,
                y * cellSize,
                cellSize,
                cellSize,
                x,
                y,
                ...args
            );
        }
    }
}

export function invertRect(p: p5, x: number, y: number, w: number, h: number) {
    withInverted(p, () => {
        p.rect(x - w / 2, y - h / 2, w, h);
    });
}

export function invertCircle(p: p5, x: number, y: number, r: number) {
    withInverted(p, () => {
        p.ellipse(x, y, r);
    });
}

export function withInverted(p: p5, drawFn: () => void) {
    p.push();
    p.blendMode(p.DIFFERENCE);
    p.fill(255);
    p.noStroke();

    drawFn();

    p.pop();
}

interface Color {
    r: number,
    g: number,
    b: number,
};

export function toPColor(p: p5, color: Color, opacity: number = 1): p5.Color {
    return p.color(`rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`)
}