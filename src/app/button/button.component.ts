import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding, HostListener,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";

import {OCTOPUS_COLOR_PALETTES, OCTOPUS_SHAPES, OctopusColorPalette, OctopusShape} from "../global/enums.utils";

export type OctopusScrollDirection = 'topdown' | 'bottomup';

@Component({
    selector: 'button[octo-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusButton implements OnChanges, AfterViewInit {

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

    protected renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-btn-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-btn-${color}`);
            }
        });
    }

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
    selector: 'a[octo-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusAnchor extends OctopusButton {}

@Component({
    selector: 'button[octo-solid-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusSolidButton extends OctopusButton {

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-solid-btn');
    }

    protected override renderColor(color: OctopusColorPalette): void {
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
    selector: 'a[octo-solid-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusSolidAnchor extends OctopusSolidButton {}

@Component({
    selector: 'button[octo-stroke-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusStrokedButton extends OctopusButton {

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-stroke-btn');
    }

    protected override renderColor(color: OctopusColorPalette): void {
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

@Component({
    selector: 'a[octo-stroke-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <ng-content></ng-content>
    `
})
export class OctopusStrokedAnchor extends OctopusStrokedButton {}

@Component({
    selector: 'button[octo-scroll-btn]',
    template: `
        <div octo-ripple [octoRippleColor]="color" *ngIf="!_element.nativeElement.disabled"></div>
        <octo-icon *ngIf="direction === 'topdown'">vertical_align_bottom</octo-icon>
        <octo-icon *ngIf="direction === 'bottomup'">vertical_align_top</octo-icon>
    `
})
export class OctopusScrollButton extends OctopusSolidButton {

    @Input('octoDir') direction: OctopusScrollDirection = 'topdown';
    @Input('octoTarget') target!: HTMLElement;

    @HostListener('click')
    protected click(): void {
        this.scrollTo(this.direction);
    }

    override ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes['shape']) {
            this.renderShape('ring');
        }
    }

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-scroll-btn');
        this.renderShape('ring');
    }

    protected scrollTo(direction: OctopusScrollDirection): void {
        let element: HTMLElement = this.target || this._render.parentNode(this._element.nativeElement);

        if (direction === 'topdown') {
            element.scrollTo({top: Math.abs(element.scrollHeight - element.clientHeight)});
        }

        if (direction === 'bottomup') {
            element.scrollTo({top: 0});
        }
    }

}
