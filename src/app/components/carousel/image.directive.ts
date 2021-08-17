import { Directive, ElementRef, HostBinding, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[octopus-carousel-image]'
})
export class OctopusCarouselImage {

    @Input('subject') subject: string = '';
    @Input('description') description: string = '';

    @HostBinding('class') class: string = 'octopus-carousel-image';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    public async addClass(name: string): Promise<void> {
        await this._render.addClass(this._ref.nativeElement, name);
    }

    public async removeClass(name: string): Promise<void> {
        await this._render.removeClass(this._ref.nativeElement, name);
    }

    public async setStyle(name: string, value: any): Promise<void> {
        await this._render.setStyle(this._ref.nativeElement, name, value);
    }

    public async setDimension(width: number, height: number): Promise<void> {
        await this._render.setStyle(this._ref.nativeElement, 'width', `${width}px`);
        await this._render.setStyle(this._ref.nativeElement, 'height', `${height}px`);
    }

}