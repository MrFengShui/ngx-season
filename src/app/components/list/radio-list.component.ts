import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnChanges, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild, ContentChildren, QueryList, SimpleChanges, ElementRef, Inject, NgZone, Renderer2 } from "@angular/core";
import { Subject, BehaviorSubject, map, Observable, Subscription } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

import { NGXSeasonRadioButtonCheckedMarkShape, NGXSeasonRadioButtonLabelPosition, NGXSeasonRadioButtonGroupComponent } from "../radio/radio-button.component";
import { NGX_SEASON_RADIO_LIST_TOKEN, NGXSeasonListComponent, NGXSeasonListItemComponent, NGXSeasonRadioListSelectionChange } from "./list.component";
import { NGXSeasonCheckLabelPosition } from "../check/check.component";

let index: number = 0;

@Component({
    selector: 'ngx-sui-list-radio-item',
    template: `<label ngx-sui-RadioButton [radioSelected]="selected()" [rbColor]="color$ | async" [rbMark]="mark$ | async" [rbLabelPos]="position$ | async" [radioName]="_radioList.name" [radioDisabled]="disabled" [radioValue]="value" (radioValueChange)="selectOrDeselect($event)" class="w-100"><ng-content></ng-content></label>`
})
export class NGXSeasonListRadioItemComponent extends NGXSeasonListItemComponent implements OnChanges, OnDestroy {

    @Input('riColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || undefined;
    }

    get color(): NGXSeasonColorPalette | undefined {
        return this._color;
    }

    @Input('riDisabled')
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('riMark')
    set mark(mark: NGXSeasonRadioButtonCheckedMarkShape | undefined | null) {
        this._mark = mark || undefined;
    }

    get mark(): NGXSeasonRadioButtonCheckedMarkShape | undefined {
        return this._mark;
    }

    @Input('riLabelPos')
    set position(position: NGXSeasonRadioButtonLabelPosition | undefined | null) {
        this._position = position || undefined;
    }

    get position(): NGXSeasonRadioButtonLabelPosition | undefined {
        return this._position;
    }

    @Input('riValue')
    set value(value: any) {
        this._value = value;
    }

    get value(): any {
        return this._value;
    }

    private _color: NGXSeasonColorPalette | undefined;
    private _disabled: boolean = false;
    private _mark: NGXSeasonRadioButtonCheckedMarkShape | undefined;
    private _position: NGXSeasonCheckLabelPosition | undefined;
    private _value: any;

    readonly id: string = `ngx-sui-list-radio-item-${this._radioList.index++}`;

    protected color$: Observable<NGXSeasonColorPalette> | undefined;
    protected group$: Observable<NGXSeasonRadioButtonGroupComponent> | undefined;
    protected mark$: Observable<NGXSeasonRadioButtonCheckedMarkShape> | undefined;
    protected position$: Observable<NGXSeasonRadioButtonLabelPosition> | undefined;

    private cacheColor: NGXSeasonColorPalette | undefined;
    private cacheMark: NGXSeasonRadioButtonCheckedMarkShape | undefined;
    private cachePosition: NGXSeasonRadioButtonLabelPosition | undefined;

    private selectedValue$: Subscription = Subscription.EMPTY;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_RADIO_LIST_TOKEN)
        protected _radioList: NGXSeasonRadioListComponent
    ) {
        super(_element, _renderer);
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.cacheColor = changes[name].currentValue;

            if (name === 'mark') this.cacheMark = changes[name].currentValue;

            if (name === 'position') this.cachePosition = changes[name].currentValue;
        }
    }

    ngOnDestroy(): void {
        this.selectedValue$.unsubscribe();
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.initialize();

        this.color$ = this._radioList.color$.asObservable().pipe(map(value => this.cacheColor || value));
        this.mark$ = this._radioList.mark$.asObservable().pipe(map(value => this.cacheMark || value));
        this.position$ = this._radioList.position$.asObservable().pipe(map(value => this.cachePosition || value));
    }

    protected initialize(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'list-radio-item');
        this._renderer.setAttribute(element, 'list-radio-item-belong', this._radioList.id);
    }

    protected selected(): boolean | undefined {
        const pid: string | null = this._element.nativeElement.getAttribute('list-radio-item-belong');
        return pid === this._radioList.id && this._radioList.selection?.isSelected(this);
    }

    protected selectOrDeselect(value: any): void {
        const pid: string | null = this._element.nativeElement.getAttribute('list-radio-item-belong');

        if (pid === this._radioList.id) {
            const selection: SelectionModel<NGXSeasonListRadioItemComponent> | undefined = this._radioList.selection;

            if (!selection) throw new Error();

            if (`${value}` === `${this.value}`) selection.select(this); else selection.deselect(this);

            selection.sort((a, b) => a.value - b.value);

            const target: NGXSeasonListRadioItemComponent = selection.selected[0];
            this._radioList.selectedChange.emit({ source: this._radioList, target, value: target.value });
        }
    }
}


@Component({
    selector: 'ngx-sui-radio-list',
    template: `
        <div class="list-header" *ngIf="headerTemplate"><ng-container [cdkPortalOutlet]="headerPortal"></ng-container></div>
        <ng-content select="ngx-sui-list-radio-item, ngx-sui-x-divider, ng-container"></ng-content>
        <div class="list-footer" *ngIf="footerTemplate"><ng-container [cdkPortalOutlet]="footerPortal"></ng-container></div>
        <ng-template><ng-content select="[ngx-sui-ListHeader], [ngx-sui-ListFooter]"></ng-content></ng-template>
    `,
    providers: [{ provide: NGX_SEASON_RADIO_LIST_TOKEN, useExisting: NGXSeasonRadioListComponent }]
})
export class NGXSeasonRadioListComponent extends NGXSeasonListComponent implements OnChanges, OnInit, OnDestroy {

    @Input('rlColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('rlMark')
    set mark(mark: NGXSeasonRadioButtonCheckedMarkShape | null) {
        this._mark = mark || 'solid';
    }

    get mark(): NGXSeasonRadioButtonCheckedMarkShape {
        return this._mark;
    }

    @Input('rlName')
    set name(name: string | undefined | null) {
        this._name = name || undefined;
    }

    get name(): string | undefined {
        return this._name;
    }

    @Input('rlLabelPos')
    set position(position: NGXSeasonRadioButtonLabelPosition | null) {
        this._position = position || 'before';
    }

    get position(): NGXSeasonRadioButtonLabelPosition {
        return this._position;
    }

    @Input('rlInitValue')
    set value(value: any) {
        this._value = value;
    }

    get value(): any {
        return this._value;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _mark: NGXSeasonRadioButtonCheckedMarkShape = 'solid';
    private _name: string | undefined;
    private _position: NGXSeasonRadioButtonLabelPosition = 'before';
    private _value: any;

    @Output('rlSelectedChange')
    selectedChange: EventEmitter<NGXSeasonRadioListSelectionChange> = new EventEmitter(true);

    @ViewChild('group', { read: NGXSeasonRadioButtonGroupComponent })
    protected group: NGXSeasonRadioButtonGroupComponent | undefined;

    @ContentChildren(NGXSeasonListRadioItemComponent)
    protected items: QueryList<NGXSeasonListRadioItemComponent> | undefined;

    selection: SelectionModel<NGXSeasonListRadioItemComponent> | undefined;

    readonly id: string = `ngx-sui-radio-list-${index++}`;
    index: number = 0;

    color$: Subject<NGXSeasonColorPalette> = new BehaviorSubject(this.color);
    mark$: Subject<NGXSeasonRadioButtonCheckedMarkShape> = new BehaviorSubject(this._mark);
    position$: Subject<NGXSeasonRadioButtonLabelPosition> = new BehaviorSubject(this._position);

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.color$.next(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'mark') this.mark$.next(changes[name].currentValue as NGXSeasonRadioButtonCheckedMarkShape);

            if (name === 'position') this.position$.next(changes[name].currentValue as NGXSeasonRadioButtonLabelPosition);

            if (name === 'value') this.setupInitialValue(changes[name].currentValue);
        }
    }

    ngOnInit(): void {
        if (!this.selection) this.selection = new SelectionModel(false);
    }

    ngOnDestroy(): void {
        this.selectedChange.complete();

        this.color$.complete();
        this.mark$.complete();
        this.position$.complete();
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'radio-list');

        this.setupInitialValue(this.value);
    }

    protected setupInitialValue(value: any): void {
        const item = this.items?.find(item => `${item.value}` === `${value}`);

        if (item) {
            this.selection?.clear(true);
            this.selection?.setSelection(item);

            this.selectedChange.emit({ source: this, target: item, value });
        }
    }

}
