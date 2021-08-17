export class OctopusCarouselChange {

    previousValue: number;
    currentValue: number;

    constructor(_previousValue: number, _currentValue: number) {
        this.previousValue = _previousValue;
        this.currentValue = _currentValue;
    }

}

export enum OctopusCarouselShape {

    square = 'square', circle = 'circle'

}