import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostListener,
    Inject,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {DOCUMENT} from "@angular/common";
import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";

@Directive({
    selector: '[octo-ripple]'
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
