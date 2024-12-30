import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { DomPortal, TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostListener, InjectionToken, Input, NgZone, OnChanges, OnDestroy, Output, Provider, Renderer2, RendererStyleFlags2, SimpleChanges, ViewChild, ViewContainerRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BehaviorSubject, Subject, Subscription } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

import { NGXSeasonIconName } from "../icon/icon.component";
import { NGXSeasonSearchHistoryComponent } from "./search-history.component";
import { NGXSeasonSearchFieldAddonDirective } from "./search.directive";
import { NGXSeasonSearchRecommendComponent } from "./search-recommend.component";

export const NGX_SEASON_SEARCH_TOKEN: InjectionToken<NGXSeasonSearchComponent> = new InjectionToken('NGX_SEASON_SEARCH_TOKEN');
const NGXSeasonSearchValueAccessor: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NGXSeasonSearchComponent),
    multi: true
};

export type SearchDroppedMetainfo = { dropped: boolean, id: string, editable: boolean };

let searchIndex: number = 0;

@Component({
    selector: 'label[ngx-sui-Search]',
    template: `
        <div class="search-wrapper" (mouseleave)="handleSearchFieldFocusOrBlurEvent(false)" #wrapper>
            <div class="search-field">
                <ngx-sui-icon [iconColor]="(hover$.asObservable() | async) ? color : 'default'" iconShape="search" *ngIf="showIcon"></ngx-sui-icon>
                <ng-container [cdkPortalOutlet]="addonPortal"></ng-container>
                <input type="search" [attr.placeholder]="placeholder" (focus)="handleSearchFieldFocusOrBlurEvent(true)" (keyup)="handleKeyboardEnterEvent($event, input.value)" #input>
                <button ngx-sui-IconButton btnCircled [btnColor]="(hover$.asObservable() | async) ? color : 'default'" btnIcon="close" btnIconOnly="true" btnSize="sm" btnStyle="solid" (click)="handleClearTextEvent($event)" *ngIf="showClear && input.value.length > 0"></button>
                <button ngx-sui-TextButton [btnColor]="(hover$.asObservable() | async) ? color : 'default'" btnStyle="solid" [btnText]="btnLabel" (click)="writeValue(input.value)" *ngIf="showBtn && btnLabel"></button>
            </div>
            <ng-template [cdkPortalOutlet]="historyPortal"></ng-template>
            <ng-template [cdkPortalOutlet]="recommendPortal"></ng-template>
        </div>
        <ng-template>
            <ng-content select="ngx-sui-search-history, ngx-sui-search-recommend, [ngx-sui-SearchFieldAddon]"></ng-content>
        </ng-template>
    `,
    providers: [
        NGXSeasonSearchValueAccessor,
        { provide: NGX_SEASON_SEARCH_TOKEN, useExisting: NGXSeasonSearchComponent }
    ]
})
export class NGXSeasonSearchComponent implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit, ControlValueAccessor {

    @Input({ alias: 'searchBtnLabel' })
    set btnLabel(btnLabel: string | undefined | null) {
        this._btnLabel = btnLabel || undefined;
    }

    get btnLabel(): string | undefined {
        return this._btnLabel;
    }

    @Input({ alias: 'searchColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'searchDisabled' })
    set disabled(disabled: boolean | string | undefined | null) {
        this._disabled = coerceBooleanProperty(disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    @Input({ alias: 'searchDuration' })
    set duration(duration: number | string | undefined | null) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input({ alias: 'searchIcon' })
    set icon(icon: NGXSeasonIconName | null) {
        this._icon = icon ? icon : 'search';
    }

    get icon(): NGXSeasonIconName {
        return this._icon;
    }

    @Input({ alias: 'searchPlaceholder' })
    set placeholder(placeholder: string | undefined | null) {
        this._placeholder = placeholder || undefined;
    }

    get placeholder(): string | undefined {
        return this._placeholder;
    }

    @Input({ alias: 'searchShowIcon' })
    set showIcon(showIcon: boolean | string | null) {
        this._showIcon = coerceBooleanProperty(showIcon);
    }

    get showIcon(): boolean {
        return this._showIcon;
    }

    @Input({ alias: 'searchShowBtn' })
    set showBtn(showBtn: boolean | string | undefined | null) {
        this._showBtn = coerceBooleanProperty(showBtn);
    }

    get showBtn(): boolean {
        return this._showBtn;
    }

    @Input({ alias: 'searchShowClear' })
    set showClear(showClear: boolean | string | undefined | null) {
        this._showClear = coerceBooleanProperty(showClear);
    }

    get showClear(): boolean {
        return this._showClear;
    }

    @Input({ alias: 'searchText'})
    set text(text: string | undefined | null) {
        this._text = text || undefined;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _btnLabel: string | undefined;
    private _color: NGXSeasonColorPalette = 'default';
    private _disabled: boolean = false;
    private _duration: number = 250;
    private _icon: NGXSeasonIconName = 'search';
    private _placeholder: string | undefined;
    private _showIcon: boolean = true;
    private _showBtn: boolean = false;
    private _showClear: boolean = true;
    private _text: string | undefined;

    @Output('searchTextChange')
    textChange: EventEmitter<string> = new EventEmitter(true);

    @HostListener('mouseenter')
    protected listenHostEnterEvent(): void {
        this.hover$.next(true);
    }

    @HostListener('mouseleave')
    protected listenHostLeaveEvent(): void {
        this.hover$.next(false);
    }

    @ContentChild(NGXSeasonSearchFieldAddonDirective)
    protected addon: NGXSeasonSearchFieldAddonDirective | undefined;

    @ContentChild(NGXSeasonSearchHistoryComponent, { read: ElementRef })
    protected history: ElementRef<HTMLElement> | undefined;

    @ContentChild(NGXSeasonSearchRecommendComponent, { read: ElementRef })
    protected recommend: ElementRef<HTMLElement> | undefined;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    protected wrapper: ElementRef<HTMLElement> | undefined;

    @ViewChild('input', { read: ElementRef, static: true })
    protected input: ElementRef<HTMLInputElement> | undefined;

    readonly id: string = `ngx-sui-search-id-${searchIndex++}`;

    droppedChange$: BehaviorSubject<SearchDroppedMetainfo> = new BehaviorSubject<SearchDroppedMetainfo>({ dropped: false, id: '', editable: false });

    protected onChange = (text: string | undefined) => this.textChange.emit(text);
    protected onTouched = () => {};

    protected hover$: Subject<boolean> = new BehaviorSubject(false);

    protected historyPortal: DomPortal | undefined;
    protected recommendPortal: DomPortal | undefined;
    protected addonPortal: TemplatePortal | undefined;

    private dropped$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeSearchColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'duration') this.setupSearchDuration(coerceNumberProperty(changes[name].currentValue));

            if (name === 'text') this.setupSearchText(changes[name].currentValue);
        }
    }

    ngOnDestroy(): void {
        this.dropped$.unsubscribe();

        this.hover$.complete();
        this.droppedChange$.complete();
    }

    ngAfterContentInit(): void {
        if (this.history) {
            const element: HTMLElement = this.history.nativeElement;
            this._renderer.appendChild(this._element.nativeElement, element);

            this.historyPortal = new DomPortal(element);
        }

        if (this.recommend) {
            const element: HTMLElement = this.recommend.nativeElement;
            this._renderer.appendChild(this._element.nativeElement, element);

            this.recommendPortal = new DomPortal(element);
        }

        if (this.addon) this.addonPortal = new TemplatePortal(this.addon.fetchTemplate(), this._vcr);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'search');

        this.changeSearchColor(this.color);
        this.setupSearchDuration(this.duration);
        this.setupSearchText(this.text);
        this.listenFocusChange();
    }

    writeValue(text: string | undefined): void {
        this.onChange(text);
    }

    registerOnChange(fn: (text: string | undefined) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    protected changeSearchColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-search-color', color);
    }

    protected setupSearchDuration(duration: number | string | undefined | null): void {
        this._renderer.setStyle(this._element.nativeElement, '--search-duration', `${duration}ms`, RendererStyleFlags2.DashCase);
    }

    protected setupSearchText(text: string | undefined): void {
        if (this.input) {
            text = text || '';
            this._renderer.setProperty(this.input.nativeElement, 'value', text);
            this.writeValue(text);
        }
    }

    protected handleSearchFieldFocusOrBlurEvent(dropped: boolean): void {
        const metainfo: SearchDroppedMetainfo = this.droppedChange$.value;
        metainfo.dropped = dropped;
        metainfo.id = this.id;
        this.droppedChange$.next(metainfo);
    }

    protected handleClearTextEvent(event: MouseEvent): void {
        event.preventDefault();

        this._renderer.setProperty(this.input?.nativeElement, 'value', null);
        this.writeValue('');
    }

    protected handleKeyboardEnterEvent(event: KeyboardEvent, value: string): void {
        if (event.code === 'NumpadEnter' || event.key === 'Enter') this.writeValue(value);
    }

    private listenFocusChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.droppedChange$.asObservable()
                .subscribe(metainfo => {
                    if (metainfo.id === this.id && (metainfo.dropped || metainfo.editable)) {
                        this._renderer.setStyle(this.wrapper?.nativeElement, 'z-index', 5);
                        this._renderer.setStyle(this._element.nativeElement, '--search-wrapper-border-width', 'var(--size-pixel-2)', RendererStyleFlags2.DashCase);
                        this._renderer.setStyle(this.wrapper?.nativeElement, 'height', this.recommend || this.history ? 'calc-size(fit-content, size)' : 'var(--search-height)');
                    } else {
                        this._renderer.removeStyle(this.wrapper?.nativeElement, 'z-index');
                        this._renderer.setStyle(this._element.nativeElement, '--search-wrapper-border-width', 'var(--size-pixel-1)', RendererStyleFlags2.DashCase);
                        this._renderer.setStyle(this.wrapper?.nativeElement, 'height', 'var(--search-height)');

                        this.input?.nativeElement.blur();
                    }
                }));
    }

}
