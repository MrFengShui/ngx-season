import {
    AfterViewInit,
    Component,
    Directive,
    ElementRef, EventEmitter,
    HostBinding,
    Input,
    OnChanges, OnDestroy, Output, Renderer2,
    SimpleChanges
} from "@angular/core";
import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Directive({
    selector: '[octo-toolbar-logo], [octoToolbarLogo]'
})
export class OctopusToolbarLogo {

    @HostBinding('class') class: string = 'octo-toolbar-logo';

}

@Component({
    selector: 'octo-toolbar-row',
    template: `<ng-content></ng-content>`
})
export class OctopusToolbarRow {

    @HostBinding('class') class: string = 'octo-toolbar-row';

}

@Component({
    selector: 'octo-toolbar',
    template: `
        <octo-toolbar-row>
            <button octo-btn octoShape="ring" (click)="toggle()">
                <octo-icon>menu</octo-icon>
            </button>
            <ng-content></ng-content>
        </octo-toolbar-row>
        <ng-content select="octo-toolbar-row"></ng-content>
    `
})
export class OctopusToolbar implements OnChanges, OnDestroy, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';
    @Input('octoState') state: boolean | string | null = false;

    @Output('octoStateChange') change: EventEmitter<boolean> = new EventEmitter<boolean>(coerceBooleanProperty(this.state));

    @HostBinding('class') class: string = 'octo-toolbar';

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

    ngOnDestroy() {
        this.change.complete();
    }

    toggle(): void {
        this.state = !coerceBooleanProperty(this.state);
        this.change.next(this.state);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-toolbar-${item}`));

            if (color !== 'base' && (color === 'primary' || color === 'accent')) {
                this._render.addClass(this._element.nativeElement, `octo-toolbar-${color}`);
            }
        });
    }

}
