import {
    AfterContentInit,
    AfterViewInit,
    Component, ContentChildren, Directive, ElementRef, EventEmitter,
    HostBinding,
    Input,
    OnChanges, Output, QueryList,
    Renderer2,
    SimpleChanges, TemplateRef
} from "@angular/core";
import {Direction} from "@angular/cdk/bidi";
import {coerceBooleanProperty} from "@angular/cdk/coercion";

import {OCTOPUS_COLOR_PALETTES, OctopusColorPalette} from "../global/enums.utils";

@Component({
    template: ''
})
abstract class OctopusAbstractLabel implements OnChanges, AfterViewInit {

    @Input('octoColor') color: OctopusColorPalette = 'primary';

    @HostBinding('class') class: string = 'octo-label';

    constructor(
        protected _element: ElementRef,
        protected _render: Renderer2
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['color']) {
            this.renderColor(changes['color'].currentValue);
        }
    }

    ngAfterViewInit() {
        this.renderColor(this.color);
        this._render.addClass(this._element.nativeElement, 'octo-shadow-4');
    }

    protected abstract renderColor(color: OctopusColorPalette): void;

}

@Directive({
    selector: '[octo-mark-label-head]'
})
export class OctopusMarkLabelHead {

    constructor(public _template: TemplateRef<any>) {
    }

}

@Directive({
    selector: '[octo-mark-label-tail]'
})
export class OctopusMarkLabelTail {

    constructor(public _template: TemplateRef<any>) {
    }

}

@Component({
    selector: 'octo-mark-label',
    template: `
        <span class="octo-mark-label-head" *ngIf="heads.length === 1">
            <ng-container [ngTemplateOutlet]="heads.first._template"></ng-container>
        </span>
        <span class="octo-mark-label-tail" *ngIf="tails.length === 1">
            <ng-container [ngTemplateOutlet]="tails.first._template"></ng-container>
        </span>
        <ng-content></ng-content>
    `
})
export class OctopusMarkLabel extends OctopusAbstractLabel implements AfterContentInit {

    @Input('octoDir') direction: Direction = 'ltr';

    @ContentChildren(OctopusMarkLabelHead) heads!: QueryList<OctopusMarkLabelHead>;
    @ContentChildren(OctopusMarkLabelTail) tails!: QueryList<OctopusMarkLabelTail>;

    override ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);

        if (changes['direction']) {
            this.renderDirection(changes['direction'].currentValue);
        }
    }

    ngAfterContentInit() {console.log(this.heads, this.tails);
        if (this.heads && this.heads.length > 1) {
            throw new Error();
        }

        if (this.tails && this.tails.length > 1) {
            throw new Error();
        }
    }

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-mark-label');
        this.renderDirection(this.direction);
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-mark-label-${item}`));

            if (color !== 'base') {
                this._render.addClass(this._element.nativeElement, `octo-mark-label-${color}`);
            }
        });
    }

    private renderDirection(dir: Direction): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            if (dir === 'ltr') {
                this._render.setStyle(this._element.nativeElement, 'flex-direction', 'row');
            }

            if (dir === 'rtl') {
                this._render.setStyle(this._element.nativeElement, 'flex-direction', 'row-reverse');
            }
        });
    }

}

@Directive({
    selector: 'img[octo-chip-avatar]'
})
export class OctopusChipAvatar {

    @HostBinding('class') class: string = 'octo-chip-avatar';

}

@Component({
    selector: 'octo-chip-label',
    template: `
        <ng-content select="img[octo-chip-avatar]"></ng-content>
        <span class="octo-chip-label-text"
              [ngStyle]="{'margin-left': avatars.length === 1 ? '0.25rem' : '0.75rem',
              'margin-right': closed ? '0.25rem' : '0.75rem'}">{{text}}</span>
        <button octo-btn octoShape="ring" (click)="change.emit()" *ngIf="closed">
            <octo-icon octoSize="0.75rem">close</octo-icon>
        </button>
    `
})
export class OctopusChipLabel extends OctopusAbstractLabel {

    @Input('octoColor') override color: OctopusColorPalette = 'base';
    @Input('octoText') text: string = '';

    @Input('octoClosed')
    get closed() { return this._closed; }
    set closed(_closed: any) { this._closed = coerceBooleanProperty(_closed); }
    private _closed: boolean = false;

    @Output('octoClosedChange') change: EventEmitter<void> = new EventEmitter<void>();

    @ContentChildren(OctopusChipAvatar) avatars!: QueryList<OctopusChipAvatar>;

    override ngAfterViewInit() {
        super.ngAfterViewInit();
        this._render.addClass(this._element.nativeElement, 'octo-chip-label');
    }

    protected renderColor(color: OctopusColorPalette): void {
        let task = setTimeout(() => {
            clearTimeout(task);
            OCTOPUS_COLOR_PALETTES.forEach(item =>
                this._render.removeClass(this._element.nativeElement, `octo-chip-label-${item}`));
            this._render.addClass(this._element.nativeElement, `octo-chip-label-${color}`);
        });
    }

}

@Component({
    selector: 'octo-chip-list',
    template: `<ng-content select="octo-chip-label"></ng-content>`
})
export class OctopusChipList {

    @HostBinding('class') class: string = 'octo-chip-list';

}
