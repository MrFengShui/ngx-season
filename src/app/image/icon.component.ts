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
import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";

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
        });
    }

}
