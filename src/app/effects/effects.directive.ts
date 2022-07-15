import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {DOCUMENT} from "@angular/common";
import {
    OCTOPUS_COLOR_PALETTES,
    OCTOPUS_OVERFLOW_TYPES,
    OCTOPUS_OVERFLOW_XYS,
    OCTOPUS_SHADOWS,
    OctopusColorPalette,
    OctopusOverflowType,
    OctopusOverflowXY,
    OctopusShadowBlur
} from "../global/enums.utils";

@Directive({
    selector: '[octo-ripple], [octoRipple]'
})
export class OctopusRipple implements OnChanges, AfterViewInit {

    @Input('octoRippleColor') color: OctopusColorPalette | string = 'base';

    @HostListener('click', ['$event'])
    private handleHostClickAction(event: MouseEvent): void {
        this.animateRipple(event.offsetX, event.offsetY);
    }

    private readonly ripple: HTMLElement = this.createRipple();

    constructor(
        private _builder: AnimationBuilder,
        @Inject(DOCUMENT)
        private _document: Document,
        private _element: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this._element.nativeElement, 'octo-ripple');
        this.renderColor(this.color);
    }

    private renderColor(color: OctopusColorPalette | string): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (OCTOPUS_COLOR_PALETTES.includes(<"primary" | "accent" | "success" | "warning" | "failure" | "base"> color)) {
                OCTOPUS_COLOR_PALETTES.forEach(item => this._render.removeClass(this.ripple, `ripple-${item}`));

                if (color !== 'base') {
                    this._render.addClass(this.ripple, `ripple-${color}`);
                }
            } else {
                this._render.setStyle(this.ripple, 'background-color', `${color}`);
            }
        });
    }

    private createRipple(): HTMLElement {
        let element: HTMLElement = this._render.createElement('div');
        this._render.addClass(element, 'ripple');
        return element;
    }

    private animateRipple(x: number, y: number): void {
        let radius: number = 3 * Math.max(this._element.nativeElement.clientWidth, this._element.nativeElement.clientHeight);
        let player: AnimationPlayer | null = this._builder.build([
            style({width: 0, height: 0, transform: `translate(${x}px, ${y}px)`}),
            animate('250ms linear', style({
                width: `${radius}px`, height: `${radius}px`,
                transform: `translate(${x - radius * 0.5}px, ${y - radius * 0.5}px)`
            }))
        ]).create(this.ripple);
        player.onStart(() => this._render.appendChild(this._element.nativeElement, this.ripple));
        player.onDone(() => {
            this._render.removeChild(this._element.nativeElement, this.ripple);
            player = null;
        });
        player.play();
    }

}

@Directive({
    selector: '[octo-overflow], [octoOverflow]'
})
export class OctopusOverflow implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';
    @Input('octoScrollXY') scrollXY: OctopusOverflowXY = 'xy';
    @Input('octoScrollType') scrollType: OctopusOverflowType = 'auto';

    @HostBinding('class') class: string = 'overflow';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['scrollType']) {
            this.renderOverflow(changes['scrollType'].currentValue, this.scrollXY);
        }

        if (changes['scrollXY']) {
            this.renderOverflow(this.scrollType, changes['scrollXY'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderOverflow(this.scrollType, this.scrollXY);
        this.renderColor(this.color);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `overflow-${item}`));
            this._render.addClass(this._element.nativeElement, `overflow-${color === 'base' ? 'primary' : color}`);
        });
    }

    private renderOverflow(scrollType: OctopusOverflowType, scrollXY: OctopusOverflowXY): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_OVERFLOW_TYPES.forEach(type =>
                OCTOPUS_OVERFLOW_XYS.forEach(xy =>
                    this._render.removeClass(this._element.nativeElement, `overflow-${type}-${xy}`)));
            this._render.addClass(this._element.nativeElement, `overflow-${scrollType}-${scrollXY}`);
        });
    }

}

@Directive({
    selector: '[octoShadow]'
})
export class OctopusShadow implements OnChanges, AfterViewInit {

    @Input('octoShadow') shadow: OctopusShadowBlur = 4;

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['level']) {
            this.renderLevel(changes['level'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderLevel(this.shadow);
    }

    private renderLevel(level: OctopusShadowBlur): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_SHADOWS.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-shadow-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-shadow-${level}`);
        });
    }

}
