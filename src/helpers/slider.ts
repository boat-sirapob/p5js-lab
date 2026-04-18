import p5 from "p5";

export class Slider {
    slider: p5.Element;
    sliderLabelElement: p5.Element;
    sliderLabelText: string;

    constructor(p: p5, label: string, min: number, max: number, value?: number, step?: number) {
        this.sliderLabelText = label;
        this.sliderLabelElement = p.createDiv();
        this.slider = p.createSlider(min, max, value, step);
    }

    getLabelText(): string {
        return `${this.sliderLabelText}: ${this.slider.value()}`
    }

    update(): void {
        this.sliderLabelElement.html(this.getLabelText());
    }

    value(): number {
        return Number(this.slider.value());
    }
}
