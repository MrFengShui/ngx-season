import {
    AfterViewInit,
    Component, Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette, OctopusTextAlign} from "../global/enums.utils";

@Component({
    selector: 'octo-icon',
    template: `<ng-content></ng-content>`})
export class OctopusIcon implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoSize') size: string = 'auto';

    @HostBinding('class') class: string = 'octo-icon';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['size']) {
            this.renderSize(changes['size'].currentValue);
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'material-icons');
        this.renderColor(this.color);
        this.renderSize(this.size);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-icon-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-icon-${color}`);
            }
        });
    }

    private renderSize(size: string): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (size == 'auto') {
                this._render.removeStyle(this._element.nativeElement, 'font-size');
            } else {
                this._render.setStyle(this._element.nativeElement, 'font-size', size);
            }

            this._render.setStyle(this._element.nativeElement, 'line-height', size);
            this._render.setStyle(this._element.nativeElement, 'width', size);
            this._render.setStyle(this._element.nativeElement, 'height', size);
        });
    }

}

@Directive({
    selector: 'figure[octo-figure], figure[octoFIgure]'
})
export class OctopusFigure implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';

    @HostBinding('class') class: string = 'octo-figure';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-shadow-16');
        this.renderColor(this.color);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-figure-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-figure-${color}`);
        });
    }

}

@Directive({
    selector: 'figcaption[octoFigcaption]'
})
export class OctopusFigureCaption implements OnChanges, AfterViewInit {

    @Input('octoFigcaption') align: OctopusTextAlign = 'center';

    @HostBinding('class') class: string = 'octo-figcaption';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['align']) {
            this.renderTextAlign(changes['align'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderTextAlign(this.align);
    }

    private renderTextAlign(align: OctopusTextAlign): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'text-align', `${align}`);
        });
    }

}
