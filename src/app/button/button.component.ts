import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";

import {OCTOPUS_COLOR_PALETTES, OCTOPUS_SHAPES, OctopusColorPalette, OctopusShape} from "../global/enums.utils";

@Component({
    template: ''
})
abstract class OctopusAbstractButton implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoShape') shape: OctopusShape = 'rect';

    @HostBinding('class') class: string = 'octo-btn';

    constructor(
        public _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['shape']) {
            this.renderShape(changes['shape'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderColor(this.color);
        this.renderShape(this.shape);
    }

    protected abstract renderColor(color: OctopusColorPalette): void;

    protected renderShape(shape: OctopusShape): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_SHAPES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-btn-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-btn-${shape}`);
        });
    }

}

@Component({
    selector: 'button[octo-btn], a[octo-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusButton extends OctopusAbstractButton {

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-base-btn');
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-base-btn-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-base-btn-${color}`);
            }
        });
    }

}

@Component({
    selector: 'button[octo-solid-btn], a[octo-solid-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusSolidButton extends OctopusAbstractButton {

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-solid-btn');
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-solid-btn-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-solid-btn-${color}`);
            }
        });
    }

}

@Component({
    selector: 'button[octo-stroke-btn], a[octo-stroke-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusStrokeButton extends OctopusAbstractButton {

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-stroke-btn');
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-stroke-btn-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-stroke-btn-${color}`);
            }
        });
    }

}
