import { coerceArray, coerceBooleanProperty, coerceNumberProperty, coerceStringArray } from "@angular/cdk/coercion";
import { SelectionModel, UniqueSelectionDispatcher } from "@angular/cdk/collections";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, InjectionToken, Input, NgZone, OnChanges, OnDestroy, Output, QueryList, Renderer2, RendererStyleFlags2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { BehaviorSubject, debounceTime, Subscription } from "rxjs";

import { NGXSeasonListFooterDirective, NGXSeasonListHeaderDirective, NGXSeasonListItemDirective, NGXSeasonListItemTemplateDirective, NGXSeasonListOptionDirective } from "./list.directive";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";
import { NGXSeasonListDataSource } from "./list.utils";

export const NGX_SEASON_SELECTION_LIST_TOKEN: InjectionToken<NGXSeasonSelectionListComponent> = new InjectionToken('NGX_SEASON_SELECTION_LIST_TOKEN');

export type NGXSeasonSelectionListOptionMark = 'check' | 'cross';
export type NGXSeasonSelectionListOptionMarkPosition = 'after' | 'before';

type NGXSeasonListItemTemplateModel<C = unknown> = { $implicit: C };
type SelectionInitialStatusModel = { multi: boolean, values: unknown[] };

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ul[ngx-sui-List], ol[ngx-sui-List]',
    template: `
        <ng-template [cdkPortalOutlet]="headerPortal" *ngIf="showHeader"></ng-template>
        <ng-template [cdkPortalOutlet]="itemsPortal"></ng-template>
        <ng-template [cdkPortalOutlet]="footerPortal" *ngIf="showFooter"></ng-template>
        <ng-template #itemsTemplate>
            <ng-content select="li[ngx-sui-ListSection], li[ngx-sui-ListItem], li[ngx-sui-ListDivider], ng-container"></ng-content>
        </ng-template>
        <ng-template #headerTemplate><ng-content select="li[ngx-sui-ListHeader]"></ng-content></ng-template>
        <ng-template #footerTemplate><ng-content select="li[ngx-sui-ListFooter]"></ng-content></ng-template>
    `
})
export class NGXSeasonListComponent implements OnChanges, AfterContentInit, AfterViewInit {

    @Input({ alias: 'listColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'listShowHeader' })
    set showHeader(showHeader: boolean | string | undefined | null) {
        this._showHeader = coerceBooleanProperty(showHeader);
    }

    get showHeader(): boolean {
        return this._showHeader;
    }

    @Input({ alias: 'listShowFooter' })
    set showFooter(showFooter: boolean | string | undefined | null) {
        this._showFooter = coerceBooleanProperty(showFooter);
    }

    get showFooter(): boolean {
        return this._showFooter;
    }

    @Input({ alias: 'listStriped' })
    set striped(striped: boolean | string | undefined | null) {
        this._striped = coerceBooleanProperty(striped);
    }

    get striped(): boolean {
        return this._striped;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _showHeader: boolean  = false;
    private _showFooter: boolean  = false;
    private _striped: boolean = false;

    @ContentChild(NGXSeasonListHeaderDirective)
    protected header: NGXSeasonListHeaderDirective | undefined;

    @ContentChild(NGXSeasonListFooterDirective)
    protected footer: NGXSeasonListFooterDirective | undefined;

    @ContentChildren(NGXSeasonListItemDirective, { read: ElementRef })
    protected items: QueryList<ElementRef> | undefined;

    @ViewChild('headerTemplate', { read: TemplateRef, static: true })
    protected headerTemplate: TemplateRef<unknown> | undefined;

    @ViewChild('footerTemplate', { read: TemplateRef, static: true })
    protected footerTemplate: TemplateRef<unknown> | undefined;

    @ViewChild('itemsTemplate', { read: TemplateRef, static: true })
    protected itemsTemplate: TemplateRef<unknown> | undefined;

    protected headerPortal: TemplatePortal | undefined;
    protected footerPortal: TemplatePortal | undefined;
    protected itemsPortal: TemplatePortal | undefined;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeListColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'striped') this.setupListStriped(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngAfterContentInit(): void {
        if (this.header && this.headerTemplate) this.headerPortal = new TemplatePortal(this.headerTemplate, this._vcr);

        if (this.footer && this.footerTemplate) this.footerPortal = new TemplatePortal(this.footerTemplate, this._vcr);

        if (this.itemsTemplate) this.itemsPortal = new TemplatePortal(this.itemsTemplate, this._vcr);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'list');

        this.changeListColor(this.color);
        this.setupListStriped(this.striped);
    }

    protected changeListColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-list-color', color);
    }

    protected setupListStriped(stripped: boolean): void {
        const element = this._element.nativeElement;

        if (stripped) this._renderer.addClass(element, 'list-striped');
        else this._renderer.removeClass(element, 'list-striped');
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ul[ngx-sui-MetaList], ol[ngx-sui-MetaList]',
    template: `
        <ng-template [cdkPortalOutlet]="headerPortal" *ngIf="showHeader"></ng-template>
        <ng-container *ngFor="let portal of portals; last as last">
            <li ngx-sui-ListItem><ng-template [cdkPortalOutlet]="portal"></ng-template></li>
            <li ngx-sui-ListDivider *ngIf="splitted && !striped && !last"></li>
        </ng-container>
        <ng-template [cdkPortalOutlet]="footerPortal" *ngIf="showFooter"></ng-template>
        <ng-template #headerTemplate><ng-content select="li[ngx-sui-ListHeader]"></ng-content></ng-template>
        <ng-template #footerTemplate><ng-content select="li[ngx-sui-ListFooter]"></ng-content></ng-template>
    `
})
export class NGXSeasonMetaListComponent<C = unknown> extends NGXSeasonListComponent implements OnDestroy {

    @Input({ alias: 'mlSplitted' })
    set splitted(splitted: boolean | string | undefined | null) {
        this._splitted = coerceBooleanProperty(splitted);
    }

    get splitted(): boolean {
        return this._splitted;
    }

    @Input({ alias: 'mlDataSrc' })
    set source(source: NGXSeasonListDataSource<C> | undefined | null) {
        this._source = source || undefined;
    }

    get source(): NGXSeasonListDataSource<C> | undefined {
        return this._source;
    }

    private _splitted: boolean = false;
    private _source: NGXSeasonListDataSource<C> | undefined;

    @ContentChild(NGXSeasonListItemTemplateDirective, { read: TemplateRef })
    protected template: TemplateRef<NGXSeasonListItemTemplateModel<C>> | undefined;

    protected portals: TemplatePortal[] = [];

    private source$: Subscription = Subscription.EMPTY;

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'splitted') this.setupMetaListSplitted(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngOnDestroy(): void {
        this.source$.unsubscribe();

        this.source?.disconnect();
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'meta-list');

        this.setupMetaListSplitted(this.splitted);
        this.listenListDataSourceChange();
    }

    protected setupMetaListSplitted(splitted: boolean): void {
        const element = this._element.nativeElement;

        if (splitted) this._renderer.addClass(element, 'list-splitted');
        else this._renderer.removeClass(element, 'list-splitted');
    }

    protected createTemplatePortal(item: C): TemplatePortal | null { console.debug(item);
        if (this.template) return new TemplatePortal(this.template, this._vcr, { $implicit: item });

        return null;
    }

    private listenListDataSourceChange(): void {
        this._ngZone.runOutsideAngular(() => {
            if (this.source) {
                this.source$ = this.source.connect().pipe(debounceTime(250))
                    .subscribe(items => {
                        if (this.portals.length > 0) this.portals.splice(0);

                        if (this.template) {
                            for (let i = 0, length = items.length; i < length; i++) {
                                this.portals[i] = new TemplatePortal(this.template, this._vcr, { $implicit: items[i] });
                            }

                            this._cdr.detectChanges();
                        }
                    });
            }
        });
    }

}

let selectListIndex: number = 0;

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ul[ngx-sui-SelectionList], ol[ngx-sui-SelectionList]',
    template: `
        <ng-template [cdkPortalOutlet]="headerPortal" *ngIf="showHeader"></ng-template>
        <ng-template [cdkPortalOutlet]="itemsPortal"></ng-template>
        <ng-template [cdkPortalOutlet]="footerPortal" *ngIf="showFooter"></ng-template>
        <ng-template #itemsTemplate>
            <ng-content select="li[ngx-sui-ListOption], li[ngx-sui-ListDivider], ng-container"></ng-content>
        </ng-template>
        <ng-template #headerTemplate><ng-content select="li[ngx-sui-ListHeader]"></ng-content></ng-template>
        <ng-template #footerTemplate><ng-content select="li[ngx-sui-ListFooter]"></ng-content></ng-template>
    `,
    providers: [{ provide: NGX_SEASON_SELECTION_LIST_TOKEN, useExisting: NGXSeasonSelectionListComponent }]
})
export class NGXSeasonSelectionListComponent extends NGXSeasonListComponent implements OnDestroy {

    @Input({ alias: 'slMark' })
    set mark(mark: NGXSeasonSelectionListOptionMark | undefined | null) {
        this._mark = mark || 'check';
    }

    get mark(): NGXSeasonSelectionListOptionMark {
        return this._mark;
    }

    @Input({ alias: 'slMarkColor' })
    set markColor(markColor: NGXSeasonColorPalette | undefined | null) {
        this._markColor = markColor || 'default';
    }

    get markColor(): NGXSeasonColorPalette {
        return this._markColor;
    }

    @Input({ alias: 'slMarkPos' })
    set markPosition(markPosition: NGXSeasonSelectionListOptionMarkPosition | undefined | null) {
        this._markPosition = markPosition || 'after';
    }

    get markPosition(): NGXSeasonSelectionListOptionMarkPosition {
        return this._markPosition;
    }

    @Input({ alias: 'slMulti' })
    set multiple(multiple: boolean | string | undefined | null) {
        this._multiple = coerceBooleanProperty(multiple);
    }

    get multiple(): boolean {
        return this._multiple;
    }

    @Input({ alias: 'slSelectedValues' })
    set values(values: unknown[] | undefined | null) {
        this._values = values || [];
    }

    get values(): unknown[] {
        return this._values;
    }

    private _mark: NGXSeasonSelectionListOptionMark = 'check';
    private _markColor: NGXSeasonColorPalette = 'default';
    private _markPosition: NGXSeasonSelectionListOptionMarkPosition = 'after';
    private _multiple: boolean = true;
    private _values: unknown[] = [];

    @Output('slSelectedValuesChange')
    selectedValuesChange: EventEmitter<unknown[]> = new EventEmitter(true);

    @ContentChildren(NGXSeasonListOptionDirective)
    protected options: QueryList<NGXSeasonListOptionDirective> | undefined;

    readonly id: string = `ngx-sui-selection-list-id-${selectListIndex++}`;

    optionIndex: number = 0;

    private initialChange$: BehaviorSubject<SelectionInitialStatusModel> = new BehaviorSubject<SelectionInitialStatusModel>({ multi: this.multiple, values: this.values });
    private initial$: Subscription = Subscription.EMPTY;
    private usd$ = (): void => {};

    private selection: SelectionModel<NGXSeasonListOptionDirective> = new SelectionModel(this.multiple);

    constructor(
        protected override _cdr: ChangeDetectorRef,
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected override _vcr: ViewContainerRef,
        protected override _ngZone: NgZone,

        protected _usd: UniqueSelectionDispatcher
    ) {
        super(_cdr, _element, _renderer, _vcr, _ngZone);
    }

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'mark') this.changeSelectionListMark(changes[name].currentValue as NGXSeasonSelectionListOptionMark);

            if (name === 'markColor') this.changeSelectionListMarkColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'markColor') this.changeSelectionListMarkPosition(changes[name].currentValue as NGXSeasonSelectionListOptionMarkPosition);

            if (name === 'multiple') {
                const model = this.initialChange$.value;
                model.multi = coerceBooleanProperty(changes[name].currentValue);
                this.initialChange$.next(model);
            }

            if (name === 'values') {
                const model = this.initialChange$.value;
                model.values = changes[name].currentValue;
                this.initialChange$.next(model);
            }
        }
    }

    ngOnDestroy(): void {
        this.initial$.unsubscribe();

        this.initialChange$.complete();

        this.usd$();
    }

    override ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this._renderer.addClass(this._element.nativeElement, 'select-list');

        this.changeSelectionListMark(this.mark);
        this.changeSelectionListMarkColor(this.markColor);
        this.changeSelectionListMarkPosition(this.markPosition);
        this.listenSelectionInitialChange();
        this.listenListOptionSelectionChange();
    }

    selectAll(): void {
        if (this.options && this.multiple) {
            if (this.selection.hasValue()) this.selection.clear();

            this.selection.setSelection(...this.options);
            this.update();
        }
    }

    deselectAll(): void {
        if (this.selection.hasValue() && this.multiple) {
            this.selection.clear();
            this.update();
        }
    }

    allSelected(): boolean {
        return this.multiple && this.selection.selected.length === coerceNumberProperty(this.options?.length);
    }

    someSelected(): boolean {
        const length: number = this.selection.selected.length;
        return this.multiple && length > 0 && length < coerceNumberProperty(this.options?.length);
    }

    protected changeSelectionListMark(mark: NGXSeasonSelectionListOptionMark): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-select-list-mark', mark);
    }

    protected changeSelectionListMarkColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-select-list-mark-color', color);
    }

    protected changeSelectionListMarkPosition(position: NGXSeasonSelectionListOptionMarkPosition): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-select-list-mark-position', position);
    }

    private existed(values: unknown[], value: unknown): boolean {
        let fstMsg: string, sndMsg: string;

        for (let i = 0, length = values.length; i < length; i++) {
            fstMsg = JSON.stringify(coerceStringArray(values[i])).trim();
            sndMsg = JSON.stringify(coerceStringArray(value)).trim();

            if (fstMsg === sndMsg) return true;
        }

        return false;
    }

    private listenSelectionInitialChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.initial$ = this.initialChange$.asObservable().pipe(debounceTime(100))
                .subscribe(model => {
                    if (this.selection.hasValue()) this.selection.clear(true);

                    this.selection = new SelectionModel<NGXSeasonListOptionDirective>(model.multi, this.options?.filter(option => this.existed(model.values, option.value)));
                    this.update();
                }));
    }

    private listenListOptionSelectionChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.usd$ = this._usd.listen((id, pid) => {
                if (pid === this.id && this.options && this.selection) {
                    const option = this.options.find(option => option.id === id);

                    if (option && this.selection.toggle(option)) this.update();
                }
            }));
    }

    private update(): void {
        if (this.options) {
            this.options.forEach(option => option.updateOptionMark(this.selection));
            this.selectedValuesChange.emit(this.selection.selected.map(option => option.value));
        }
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-drag-drop-list',
    templateUrl: './list.component.html'
})
export class NGXSeasonDragDropListComponent<C = unknown> implements OnChanges, AfterViewInit {

    @Input({ alias: 'ddlColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'ddlDisabled' })
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input({ alias: 'ddlDuration' })
    set duration(duration: number | string | undefined | null) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input({ alias: 'ddlCurrList' })
    set currList(currList: C[] | undefined | null) {
        this._currList = currList || [];
    }

    get currList(): C[] {
        return this._currList;
    }

    @Input({ alias: 'ddlNextList' })
    set nextList(nextList: C[] | undefined | null) {
        this._nextList = nextList || [];
    }

    get nextList(): C[] {
        return this._nextList;
    }

    @Input({ alias: 'ddlSelf' })
    set self(self: boolean | string | undefined | null) {
        this._self = coerceBooleanProperty(self);
    }

    get self(): boolean {
        return this._self;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _disabled: boolean = false;
    private _duration: number = 250;
    private _currList: C[] = [];
    private _nextList: C[] = [];
    private _self: boolean = true;

    @ContentChild(NGXSeasonListItemTemplateDirective, { read: TemplateRef })
    protected template: TemplateRef<NGXSeasonListItemTemplateModel<C>> | undefined;

    @ViewChild('singleTemplate', { read: TemplateRef, static: true })
    protected singleTemplate: TemplateRef<C> | undefined;

    @ViewChild('doubleTemplate', { read: TemplateRef, static: true })
    protected doubleTemplate: TemplateRef<C> | undefined;

    protected portal: TemplatePortal | undefined;

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color' && !changes[name].isFirstChange()) this.changeDragDropColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'duration' && !changes[name].isFirstChange()) this.setupDragDropDuration(coerceNumberProperty(changes[name].currentValue));

            if (name === 'self' && !changes[name].isFirstChange()) this.setupDragDropTemplate(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'drag-drop-list');

        this.changeDragDropColor(this.color);
        this.setupDragDropDuration(this.duration);
        this.setupDragDropTemplate(this.self);
    }

    protected changeDragDropColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-drag-drop-list-color', color);
    }

    protected setupDragDropDuration(duration: number): void {
        this._renderer.setStyle(this._element.nativeElement, '--drag-drop-list-duration', `${duration}ms`, RendererStyleFlags2.DashCase);
    }

    protected setupDragDropTemplate(self: boolean): void {
        if (self && this.singleTemplate) this.portal = new TemplatePortal(this.singleTemplate, this._vcr);

        if (!self && this.doubleTemplate) this.portal = new TemplatePortal(this.doubleTemplate, this._vcr);

        this._cdr.detectChanges();
    }

    protected createTemplatePortal(item: C): TemplatePortal | null {
        if (this.template) return new TemplatePortal(this.template, this._vcr, { $implicit: item });

        return null;
    }

    protected listenListDragDropChange(change: CdkDragDrop<C[]>): void {
        if (change.previousContainer === change.container) moveItemInArray(coerceArray(change.container.data), change.previousIndex, change.currentIndex);
        else transferArrayItem(coerceArray(change.previousContainer.data), coerceArray(change.container.data), change.previousIndex, change.currentIndex);
    }

}
