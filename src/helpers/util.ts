
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
