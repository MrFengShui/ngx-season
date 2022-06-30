import {
    AfterViewInit,
    Component,
    Directive,
    ElementRef,
    HostBinding, HostListener,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges
} from "@angular/core";
import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette, OctopusFlex} from "../global/enums.utils";
import {OctopusDialog} from "./dialog.service";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

@Component({
    selector: 'div[octo-dialog-head], div[octoDialogHead]',
    template: `
        <div class="octo-dialog-head-wrapper">
            <ng-content></ng-content>
        </div>
        <button octo-solid-btn octoColor="success" octoShape="ring" class="ml-100" style="width: 2rem;height: 2rem;"
                (click)="toggleMinMaxDialog()" *ngIf="minmax">
            <octo-icon octoSize="1rem">{{toggled ? 'close_fullscreen' : 'open_in_full'}}</octo-icon>
        </button>
        <button octo-solid-btn octoColor="failure" octoShape="ring" [octo-dialog-close]="undefined"
                class="ml-100" style="width: 2rem;height: 2rem;" *ngIf="close">
            <octo-icon octoSize="1rem">close</octo-icon>
        </button>
    `
})
export class OctopusDialogHead {

    @Input('octoMinMax')
    get minmax() { return this._minmax; }
    set minmax(_minmax: any) { this._minmax = coerceBooleanProperty(_minmax); }
    private _minmax: boolean | string | null = false;

    @Input('octoClose')
    get close() { return this._close; }
    set close(_close: any) { this._close = coerceBooleanProperty(_close); }
    private _close: boolean | string | null = false;

    @HostBinding('class') class: string = 'octo-dialog-head';

    toggled: boolean = false;

    constructor(private _dialog: OctopusDialog) {
    }

    toggleMinMaxDialog(): void {
        this.toggled = !this.toggled;

        if (this.toggled) {
            this._dialog.maximize();
        } else {
            this._dialog.minimize();
        }
    }

}

@Directive({
    selector: 'div[octo-dialog-foot], div[octoDialogFoot]'
})
export class OctopusDialogFoot {

    @HostBinding('class') class: string = 'octo-dialog-foot';

}

@Directive({
    selector: 'div[octo-dialog-body], div[octoDialogBody]'
})
export class OctopusDialogBody implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'base';

    @HostBinding('class') class: string = 'octo-dialog-body';

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
        this._render.addClass(this._element.nativeElement, 'overflow');
        this._render.addClass(this._element.nativeElement, 'overflow-auto-y');
        this.renderColor(this.color);
    }

    private renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `overflow-${item}`));

            if (color === 'base' || color === 'primary' || color === 'accent') {
                this._render.addClass(this._element.nativeElement, `overflow-${color}`);
            }
        });
    }

}

@Directive({
    selector: 'button[octo-dialog-close]'
})
export class OctopusDialogClose {

    @Input('octo-dialog-close') result: any;

    @HostListener('click')
    private listenClickAction(): void {
        this._dialog.close(this.result);
    }

    constructor(private _dialog: OctopusDialog) {
    }

}

@Component({
    selector: 'div[octo-dialog-ctrl]',
    template: `<ng-content select="button[octo-btn], button[octo-solid-btn], button[octo-stroke-btn]"></ng-content>`
})
export class OctopusDialogControlBar implements OnChanges, AfterViewInit {

    @Input('octoFlex') flex: OctopusFlex = 'flex-end';

    @HostBinding('class') class: string = 'octo-dialog-ctrl';

    constructor(
        private _element: ElementRef,
        private _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['flex']) {
            this.renderFlexAlign(changes['flex'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderFlexAlign(this.flex);
    }

    private renderFlexAlign(flex: OctopusFlex): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            this._render.setStyle(this._element.nativeElement, 'justify-content', flex);
        });
    }

}
