import { coerceNumberProperty } from "@angular/cdk/coercion";
import { SelectionModel } from "@angular/cdk/collections";
import { CloseScrollStrategy, ConnectionPositionPair, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from "@angular/cdk/overlay";
import { TemplatePortal } from "@angular/cdk/portal";
import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, InjectionToken, Input, NgZone, OnChanges, OnDestroy, Output, QueryList, Renderer2, RendererStyleFlags2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BehaviorSubject, Subscription } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

const NGX_SEASON_SELECT_TOKEN: InjectionToken<NGXSeasonSelectComponent> = new InjectionToken('NGX_SEASON_SELECT_TOKEN');

@Component({
    selector: 'a[ngx-sui-SelectOption]',
    template: `<ng-content></ng-content>`
})
export class NGXSeasonSelectOptionComponent<T = any> implements AfterViewInit {

    @Input({ alias: 'optValue' })
    set value(value: T | undefined | null) {
        this._value = value || undefined;
    }

    get value(): T | undefined {
        return this._value;
    }

    private _value: T | undefined;

    @HostListener('click')
    protected listenHostClickEvent(): void {
        const selection = this._select.selection;

        if (selection) {
            selection.clear();
            selection.select(this);
        }
    }

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_SELECT_TOKEN)
        protected _select: NGXSeasonSelectComponent
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'select-option');
    }

    fetchHostInnerHTML(): string {
        return this._element.nativeElement.innerHTML;
    }

    select(): void {
        this._renderer.addClass(this._element.nativeElement, 'selected');
    }

    deselect(): void {
        this._renderer.removeClass(this._element.nativeElement, 'selected');
    }

}

@Component({
    selector: 'label[ngx-sui-Select]',
    template: `
        <div class="label" [innerHTML]="innerHTML"></div>
        <span class="arrow"></span>
        <ng-template #template>
            <div class="select-drop-menu" [attr.data-drop-menu-color]="color" ngx-sui-Scrollbar sbAxis="y-axis"><ng-content select="a[ngx-sui-SelectOption]"></ng-content></div>
        </ng-template>
    `,
    providers: [{ provide: NGX_SEASON_SELECT_TOKEN, useExisting: NGXSeasonSelectComponent }]
})
export class NGXSeasonSelectComponent<T = any> implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

    @Input({ alias: 'selectedColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input({ alias: 'selectedValue' })
    set selectedValue(selectedValue: T | undefined | null) {
        this._selectedValue = selectedValue || undefined;
    }

    get selectedValue(): T | undefined {
        return this._selectedValue;
    }

    @Input({ alias: 'selectedShowRows' })
    set showRows(showRows: number | string | undefined | null) {
        this._showRows = coerceNumberProperty(showRows);
    }

    get showRows(): number {
        return this._showRows;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _selectedValue: T | undefined;
    private _showRows: number = 8;

    @Output('selectedValueChange')
    selectedValueChange: EventEmitter<T> = new EventEmitter(true);

    @HostListener('click')
    protected listenHostClickEvent(): void {
        if (this.toggledChange$.value) this.toggledChange$.next(false); else this.toggledChange$.next(true);
    }

    @ContentChildren(NGXSeasonSelectOptionComponent)
    protected options: QueryList<NGXSeasonSelectOptionComponent<T>> | undefined;

    @ViewChild('template', { read: TemplateRef })
    private template: TemplateRef<unknown> | undefined;

    selection: SelectionModel<NGXSeasonSelectOptionComponent<T>> = new SelectionModel(false);

    protected innerHTML: SafeHtml | undefined;

    private readonly OVERLAY_POSITIONS: ConnectionPositionPair[] = [
        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },

        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },

        { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },

        { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
    ];

    private overlayRef: OverlayRef | undefined;
    private positionStrategy: FlexibleConnectedPositionStrategy | undefined;

    private toggledChange$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private outside$: Subscription = Subscription.EMPTY;
    private toggled$: Subscription = Subscription.EMPTY;

    constructor(
        protected _sanitizer: DomSanitizer,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _overlay: Overlay,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeSelectColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'selectedValue') this.initSelectionModel(changes[name].currentValue);
        }
    }

    ngOnDestroy(): void {
        this.outside$.unsubscribe();
        this.toggled$.unsubscribe();

        this.toggledChange$.complete();
    }

    ngAfterContentInit(): void {
        this.initSelectionModel(this.selectedValue);
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'select');

        this.changeSelectColor(this.color);
        this.listenOptionSelectedChange();
        this.listenSelectToggledChange();
    }

    protected changeSelectColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-select-color', color);
    }

    protected display(): void {
        this.positionStrategy = this._overlay.position()
            .flexibleConnectedTo(this._element)
            .withPositions(this.OVERLAY_POSITIONS)
            .withFlexibleDimensions(false)
            .withPush(false);
        const scrollStrategy: CloseScrollStrategy = this._overlay.scrollStrategies.close();
        const size: number = this._element.nativeElement.offsetWidth;
        this.overlayRef = this._overlay.create({
            positionStrategy: this.positionStrategy, scrollStrategy,
            minWidth: `${size}px`, maxWidth: `${size * 2}px`, height: 'fit-content'
        });

        if (this.template) {
            this.overlayRef.attach(new TemplatePortal(this.template, this._vcr));

            const element = this.overlayRef.overlayElement.firstElementChild;

            if (element && this.options) this._renderer.setStyle(element, 'height', `calc(var(--select-option-font-size) * var(--select-option-line-height) * ${Math.min(this.showRows, this.options.length)} + var(--select-drop-menu-padding) * 2)`);

            this.handleOverlayOutsideClickEvent();
        }
    }

    protected dismiss(): void {
        if (this.overlayRef) {
            this.overlayRef.detach();
            this.overlayRef.dispose();

            this.overlayRef = undefined;

            this.outside$.unsubscribe();
        }
    }

    protected initSelectionModel(selectedValue: T | undefined): void {
        if (this.options) {
            this.options.forEach(option => option.deselect());

            const options = selectedValue === undefined ? []
                : this.options.filter(option =>
                    option.value !== undefined && JSON.stringify(option.value) === JSON.stringify(selectedValue));
            this.selection.select(...options);

            const selected = this.selection.selected[0];
            selected.select();

            this.innerHTML = this._sanitizer.bypassSecurityTrustHtml(selected.fetchHostInnerHTML());
        }
    }

    private listenOptionSelectedChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.selection?.changed.asObservable()
                .subscribe(change => {
                    if (change.source.selected.length > 0) {
                        const option = change.source.selected[0];
                        this.innerHTML = this._sanitizer.bypassSecurityTrustHtml(option.fetchHostInnerHTML());
                        this.selectedValueChange.emit(option.value);
                        this.toggledChange$.next(false);
                    }
                }));
    }

    private handleOverlayOutsideClickEvent(): void {
        this._ngZone.runOutsideAngular(() => {
            if (this.overlayRef) {
                this.outside$ = this.overlayRef.outsidePointerEvents()
                    .subscribe(event => {
                        event.stopPropagation();
                        this.toggledChange$.next(false);
                    });
            }
        });
    }

    private listenSelectToggledChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.toggled$ = this.toggledChange$.asObservable()
                .subscribe(value => {
                    if (value) {
                        this.display();
                        this._renderer.setStyle(this._element.nativeElement, '--select-border-width', 'var(--size-pixel-2)', RendererStyleFlags2.DashCase);
                    } else {
                        this.dismiss();
                        this._renderer.setStyle(this._element.nativeElement, '--select-border-width', 'var(--size-pixel-1)', RendererStyleFlags2.DashCase);
                    }
                }));
    }

}
