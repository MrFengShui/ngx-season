import {
    AfterViewInit,
    Directive,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette, OctopusMountPoint} from "../global/enums.utils";

@Directive()
abstract class OctopusAbstractBadge implements OnChanges, AfterViewInit {

    @Input('octoBadgeColor') color: OctopusColorPalette = 'failure';

    @Input('octoBadgeMarked')
    get marked() { return this._marked; }
    set marked(_marked: boolean | string | null) { this._marked = coerceBooleanProperty(_marked); }
    private _marked: boolean | string | null = true;

    @Input('octoBadgeMount') point: OctopusMountPoint = 'top-right';

    @HostBinding('class') class: string = 'octo-badge';

    protected element: HTMLElement = this._render.createElement('span');
    protected txtElement: HTMLElement = this._render.createElement('span');

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }

        if (changes['marked']) {
            this.renderMarked(changes['marked'].currentValue);
        }

        if (changes['point']) {
            this.renderMountPoint(changes['point'].currentValue);
        }
    }

    ngAfterViewInit() {
        this._render.addClass(this.element, 'octo-badge-text');
        this._render.addClass(this.element, 'octo-shadow-2');
        this._render.addClass(this.txtElement, 'octo-badge-inner-text');
        this.renderColor(this.color);
        this.renderMarked(this.marked);
        this.renderMountPoint(this.point);
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-badge-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-badge-${color}`);
            }
        });
    }

    protected renderMarked(marked: boolean | string | null): void {
        if (coerceBooleanProperty(marked)) {
            this._render.appendChild(this._element.nativeElement, this.element);
        } else {
            this._render.removeChild(this._element.nativeElement, this.element);
        }
    }

    protected abstract renderMountPoint(point: OctopusMountPoint): void;

}

@Directive({
    selector: '[octo-dot-badge], [octoDotBadge]'
})
export class OctopusDotBadge extends OctopusAbstractBadge {

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-dot-badge');
    }

    protected override renderMountPoint(point: OctopusMountPoint) {
        let task = setTimeout(() => {
            clearTimeout(task);

            switch (point) {
                case 'top-left':
                    this._render.setStyle(this.element, 'top', '-0.375rem');
                    this._render.setStyle(this.element, 'left', '-0.375rem');
                    break;
                case 'top-center':
                    this._render.setStyle(this.element, 'top', '-0.375rem');
                    this._render.setStyle(this.element, 'left', 'calc(50% - 0.375rem)');
                    break;
                case 'top-right':
                    this._render.setStyle(this.element, 'top', '-0.375rem');
                    this._render.setStyle(this.element, 'right', '-0.375rem');
                    break;
                case 'bottom-left':
                    this._render.setStyle(this.element, 'bottom', '-0.375rem');
                    this._render.setStyle(this.element, 'left', '-0.375rem');
                    break;
                case 'bottom-center':
                    this._render.setStyle(this.element, 'bottom', '-0.375rem');
                    this._render.setStyle(this.element, 'left', 'calc(50% - 0.375rem)');
                    break;
                case 'bottom-right':
                    this._render.setStyle(this.element, 'bottom', '-0.375rem');
                    this._render.setStyle(this.element, 'right', '-0.375rem');
                    break;
            }
        });
    }
}

@Directive({
    selector: '[octoTextBadge]'
})
export class OctopusTextBadge extends OctopusAbstractBadge {

    @Input('octoTextBadge') text: number | string = '';

    override ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes['text']) {
            this.renderText(changes['text'].currentValue);
        }
    }

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-text-badge');
        this.renderText(this.text);
    }

    protected override renderMountPoint(point: OctopusMountPoint) {
        let task = setTimeout(() => {
            clearTimeout(task);

            switch (point) {
                case 'top-left':
                    this._render.setStyle(this.element, 'top', '-0.625rem');
                    this._render.setStyle(this.element, 'left', '-0.625rem');
                    break;
                case 'top-center':
                    this._render.setStyle(this.element, 'top', '-0.625rem');
                    this._render.setStyle(this.element, 'left', 'calc(50% - 0.625rem)');
                    break;
                case 'top-right':
                    this._render.setStyle(this.element, 'top', '-0.625rem');
                    this._render.setStyle(this.element, 'right', '-0.625rem');
                    break;
                case 'bottom-left':
                    this._render.setStyle(this.element, 'bottom', '-0.625rem');
                    this._render.setStyle(this.element, 'left', '-0.625rem');
                    break;
                case 'bottom-center':
                    this._render.setStyle(this.element, 'bottom', '-0.625rem');
                    this._render.setStyle(this.element, 'left', 'calc(50% - 0.625rem)');
                    break;
                case 'bottom-right':
                    this._render.setStyle(this.element, 'bottom', '-0.625rem');
                    this._render.setStyle(this.element, 'right', '-0.625rem');
                    break;
            }
        });
    }

    private renderText(text: number | string): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this.txtElement.innerText = text.toString();
            this._render.removeChild(this.element, this.txtElement);
            this._render.appendChild(this.element, this.txtElement);
        });
    }

}
