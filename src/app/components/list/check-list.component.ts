import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnChanges, OnInit, OnDestroy, Input, Output, EventEmitter, ContentChildren, QueryList, SimpleChanges, ElementRef, Inject, NgZone, Renderer2 } from "@angular/core";
import { Subject, BehaviorSubject, map, Observable } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

import { NGXSeasonCheckLabelPosition } from "../check/check.component";
import { NGXSeasonCheckboxCheckedMarkShape } from "../check/checkbox.component";
import { NGX_SEASON_CHECK_LIST_TOKEN, NGXSeasonListComponent, NGXSeasonCheckListSelectionChange, NGXSeasonListItemComponent } from "./list.component";

let index: number = 0;

@Component({
    selector: 'ngx-sui-list-check-item',
    template: `<label ngx-sui-CheckBox [checkColor]="color$ | async" [checkChecked]="checked()" [checkLabelPos]="position$ | async" [cbCheckMark]="mark$ | async" [checkDisabled]="disabled" (checkCheckedChange)="selectOrDeselect($event)" class="w-100"><ng-content></ng-content></label>`
})
export class NGXSeasonListCheckItemComponent extends NGXSeasonListItemComponent implements OnChanges {

    @Input('ciColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || undefined;
    }

    get color(): NGXSeasonColorPalette | undefined {
        return this._color;
    }

    @Input('ciDisabled')
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input('ciMark')
    set mark(mark: NGXSeasonCheckboxCheckedMarkShape | undefined | null) {
        this._mark = mark || undefined;
    }

    get mark(): NGXSeasonCheckboxCheckedMarkShape | undefined {
        return this._mark;
    }

    @Input('ciLabelPos')
    set position(position: NGXSeasonCheckLabelPosition | undefined | null) {
        this._position = position ? position : undefined;
    }

    get position(): NGXSeasonCheckLabelPosition | undefined {
        return this._position;
    }

    @Input('ciValue')
    set value(value: any) {
        this._value = value;
    }

    get value(): any {
        return this._value;
    }

    private _color: NGXSeasonColorPalette | undefined;
    private _disabled: boolean = false;
    private _mark: NGXSeasonCheckboxCheckedMarkShape | undefined;
    private _position: NGXSeasonCheckLabelPosition | undefined;
    private _value: any;

    readonly id: string = `ngx-sui-list-check-item-${this._checkList.index++}`;

    protected color$: Observable<NGXSeasonColorPalette> | undefined;
    protected mark$: Observable<NGXSeasonCheckboxCheckedMarkShape> | undefined;
    protected position$: Observable<NGXSeasonCheckLabelPosition> | undefined;

    private cacheColor: NGXSeasonColorPalette | undefined;
    private cacheMark: NGXSeasonCheckboxCheckedMarkShape | undefined;
    private cachePosition: NGXSeasonCheckLabelPosition | undefined;

    constructor(
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_CHECK_LIST_TOKEN)
        protected _checkList: NGXSeasonCheckListComponent
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

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.initialize();

        this.color$ = this._checkList.color$.asObservable().pipe(map(value => this.cacheColor || value));
        this.mark$ = this._checkList.mark$.asObservable().pipe(map(value => this.cacheMark || value));
        this.position$ = this._checkList.position$.asObservable().pipe(map(value => this.cachePosition || value));
    }

    protected initialize(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'list-check-item');
        this._renderer.setAttribute(element, 'list-check-item-belong', this._checkList.id);
    }

    protected checked(): boolean | undefined {
        const pid: string | null = this._element.nativeElement.getAttribute('list-check-item-belong');
        return pid === this._checkList.id && this._checkList.selection?.isSelected(this);
    }

    protected selectOrDeselect(checked: boolean): void {
        const pid: string | null = this._element.nativeElement.getAttribute('list-check-item-belong');

        if (pid === this._checkList.id) {
            const selection: SelectionModel<NGXSeasonListCheckItemComponent> | undefined = this._checkList.selection;

            if (!selection) throw new Error();

            if (checked) selection.select(this); else selection.deselect(this);

            selection.sort((a, b) => a.value - b.value);

            const values: any[] = selection.selected.map(item => item.value);
            this._checkList.selectedChange.emit({ source: this._checkList, targets: selection.selected, values });
        }
    }

}


@Component({
    selector: 'ngx-sui-check-list',
    template: `
        <div class="list-header" *ngIf="headerTemplate"><ng-container [cdkPortalOutlet]="headerPortal"></ng-container></div>
        <ng-content select="ngx-sui-list-check-item, ngx-sui-x-divider, ng-container"></ng-content>
        <div class="list-footer" *ngIf="footerTemplate"><ng-container [cdkPortalOutlet]="footerPortal"></ng-container></div>
        <ng-template><ng-content select="[ngx-sui-ListHeader], [ngx-sui-ListFooter]"></ng-content></ng-template>
    `,
    providers: [{ provide: NGX_SEASON_CHECK_LIST_TOKEN, useExisting: NGXSeasonCheckListComponent }]
})
export class NGXSeasonCheckListComponent extends NGXSeasonListComponent implements OnChanges, OnInit, OnDestroy {

    @Input('clColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('clMark')
    set mark(mark: NGXSeasonCheckboxCheckedMarkShape | undefined | null) {
        this._mark = mark || 'tick';
    }

    get mark(): NGXSeasonCheckboxCheckedMarkShape {
        return this._mark;
    }

    @Input('clLabelPos')
    set position(position: NGXSeasonCheckLabelPosition | undefined | null) {
        this._position = position || 'before';
    }

    get position(): NGXSeasonCheckLabelPosition {
        return this._position;
    }

    @Input('clInitValues')
    set values(values: any[] | undefined | null) {
        this._values = values || [];
    }

    get values(): any[] {
        return this._values;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _mark: NGXSeasonCheckboxCheckedMarkShape = 'tick';
    private _position: NGXSeasonCheckLabelPosition = 'before';
    private _values: any[] = [];

    @Output('clSelectedChange')
    selectedChange: EventEmitter<NGXSeasonCheckListSelectionChange> = new EventEmitter(true);

    @ContentChildren(NGXSeasonListCheckItemComponent)
    protected items: QueryList<NGXSeasonListCheckItemComponent> | undefined;

    selection: SelectionModel<NGXSeasonListCheckItemComponent> | undefined;

    readonly id: string = `ngx-sui-check-list-${index++}`;
    index: number = 0;

    color$: Subject<NGXSeasonColorPalette> = new BehaviorSubject(this.color);
    mark$: Subject<NGXSeasonCheckboxCheckedMarkShape> = new BehaviorSubject(this._mark);
    position$: Subject<NGXSeasonCheckLabelPosition> = new BehaviorSubject(this._position);

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.color$.next(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'mark') this.mark$.next(changes[name].currentValue as NGXSeasonCheckboxCheckedMarkShape);

            if (name === 'position') this.position$.next(changes[name].currentValue as NGXSeasonCheckLabelPosition);

            if (name === 'values') this.setupInitialValues(changes[name].currentValue);
        }
    }

    ngOnInit(): void {
        if (!this.selection) this.selection = new SelectionModel(true);
    }

    ngOnDestroy(): void {
        this.selectedChange.complete();

        this.color$.complete();
        this.mark$.complete();
        this.position$.complete();
    }

    override ngAfterContentInit(): void {
        super.ngAfterContentInit();

        if (this.items) {
            const list = this.items.filter(item => `${item.value}` === '3' || `${item.value}` === '5' || `${item.value}` === '6');
            this.selection?.setSelection(...list);
        }
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'check-list');

        this.setupInitialValues(this.values);
    }

    selectAll(): void {
        if (!this.selection || !this.items) throw new Error();

        for (const item of this.items) {
            if (!this.selection.isSelected(item)) this.selection.select(item);
        }

        this.selection.sort((a, b) => a.value - b.value);

        const values: any[] = this.selection.selected.map(item => item.value);
        this.selectedChange.emit({ source: this, targets: this.selection.selected, values });
    }

    deselectAll(): void {
        if (!this.selection || !this.items) throw new Error();

        this.selection.clear(true);

        const values: any[] = this.selection.selected.map(item => item.value);
        this.selectedChange.emit({ source: this, targets: this.selection.selected, values });
    }

    valuesAsList(): any[] {
        if (!this.selection) throw new Error();

        return this.selection.selected.map(item => item.value);
    }

    valuesAsMap(): { [key: string]: any; } {
        if (!this.selection) throw new Error();

        const keyValue: { [key: string]: any; } = {};

        for (const item of this.selection.selected) keyValue[item.id] = item.value;

        return keyValue;
    }

    protected setupInitialValues(values: any[]): void {
        let list: NGXSeasonListCheckItemComponent[] = [], item: NGXSeasonListCheckItemComponent | undefined;

        for (const value of values) {
            item = this.items?.find(item => `${item.value}` === `${value}`);

            if (item) list.push(item);
        }

        this.selection?.clear(true);
        this.selection?.setSelection(...list);

        this.selectedChange.emit({ source: this, targets: list, values: list.map(item => item.value) });
    }

}
