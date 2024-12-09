import { TemplatePortal } from "@angular/cdk/portal";
import { coerceArray, coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnChanges, OnDestroy, Output, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from "@angular/core";
import { Subject, Subscription } from "rxjs";

import { NGXSeasonTabbedPanelComponent } from "./tabbed.component";

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonTabbedWidgetComponent {

    @Input({ alias: 'panels', required: true })
    set panels(panels: NGXSeasonTabbedPanelComponent[] | undefined | null) {
        this._panels = panels || undefined;
    }

    get panels(): NGXSeasonTabbedPanelComponent[] | undefined {
        return this._panels;
    }

    private _panels: NGXSeasonTabbedPanelComponent[] | undefined;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone,
    ) {}

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-tabbed-control-bar',
    template: `
        <button ngx-sui-IconButton [btnDisabled]="decrementButtonDisabled" btnIcon="angle" btnIconDegree="-90" btnStyle="flat" (click)="handleViewportScrollEvent('dec')" *ngIf="listbox.offsetWidth > viewport.offsetWidth"></button>
        <div class="control-scroll-viewport" #viewport>
            <div class="control-list" #listbox>
                <a class="control-item" [class.active]="panel.selected" (click)="handleControlSelectedEvent(idx)" #ctrlItem *ngFor="let panel of panels; index as idx">
                    <div class="control-item-wrapper">
                        <ngx-sui-icon [iconShape]="panel.icon" *ngIf="panel.icon && showIcon"></ngx-sui-icon>
                        <span class="text">{{ panel.text }}</span>
                        <span class="spring" *ngIf="showClose"></span>
                        <button ngx-sui-IconButton btnCircled btnIcon="close" btnSize="sm" btnStyle="flat" (click)="handleControlClosedEvent($event, idx)" *ngIf="showClose"></button>
                    </div>
                    <div class="control-item-block"></div>
                </a>
            </div>
        </div>
        <button ngx-sui-IconButton [btnDisabled]="incrementButtonDisabled" btnIcon="angle" btnIconDegree="90" btnStyle="flat" (click)="handleViewportScrollEvent('inc')" *ngIf="listbox.offsetWidth > viewport.offsetWidth"></button>
    `
})
export class NGXSeasonTabbedControlBarComponent extends NGXSeasonTabbedWidgetComponent implements OnDestroy, AfterViewInit {

    @Input({ alias: 'scrollSize', required: true })
    set scrollSize(scrollSize: number | string | undefined | null) {
        this._scrollSize = coerceNumberProperty(scrollSize);
    }

    get scrollSize(): number {
        return this._scrollSize;
    }

    @Input({ alias: 'showClose' })
    set showClose(showClose: boolean | string | undefined | null) {
        this._showClose = coerceBooleanProperty(showClose);
    }

    get showClose(): boolean {
        return this._showClose;
    }

    @Input({ alias: 'showIcon' })
    set showIcon(showIcon: boolean | string | undefined | null) {
        this._showIcon = coerceBooleanProperty(showIcon);
    }

    get showIcon(): boolean {
        return this._showIcon;
    }

    private _scrollSize: number = 0;
    private _showClose: boolean = false;
    private _showIcon: boolean = false;

    @Output('selectedIndexChange')
    selectedIndexChange: EventEmitter<number> = new EventEmitter(true);

    @Output('closedIndexChange')
    closedIndexChange: EventEmitter<number> = new EventEmitter(true);

    @ViewChild('viewport', { read: ElementRef, static: true })
    protected viewport: ElementRef<HTMLElement> | undefined;

    @ViewChild('listbox', { read: ElementRef, static: true })
    protected listBox: ElementRef<HTMLElement> | undefined;

    protected decrementButtonDisabled: boolean = false;
    protected incrementButtonDisabled: boolean = false;

    private deltaSizeChange$: Subject<number> = new Subject();
    private deltaSize$: Subscription = Subscription.EMPTY;

    private scrollIndex: number = 0;

    ngOnDestroy(): void {
        this.deltaSize$.unsubscribe();

        this.deltaSizeChange$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tabbed-control-bar');

        this.listenDeltaSizeChange();

        Promise.resolve()
            .then(() => this.setupInitialScrollIndex(this.panels))
            .then(value => {
                this.scrollIndex = value;
                this.deltaSizeChange$.next(this.scrollSize * value);
            });
    }

    protected handleViewportScrollEvent(flag: 'dec' | 'inc'): void {
        if (this.listBox && this.viewport && this.panels && this.scrollIndex > -1) {
            if (flag === 'dec' && !this.decrementButtonDisabled) this.scrollIndex = Math.max(this.scrollIndex - 1, 0);

            if (flag === 'inc' && !this.incrementButtonDisabled) this.scrollIndex = Math.min(this.scrollIndex + 1, this.panels.length - 1);

            this.deltaSizeChange$.next(this.scrollIndex * this.scrollSize);
        }
    }

    protected handleControlSelectedEvent(index: number): void {
        this.selectedIndexChange.emit(index);
    }

    protected handleControlClosedEvent(event: MouseEvent, index: number): void {
        event.stopPropagation();
        this.closedIndexChange.next(index);
    }

    private setupInitialScrollIndex(panels: NGXSeasonTabbedPanelComponent[] | undefined): number {
        if (!panels) return -1;

        for (let i = 0, length = panels.length; i < length; i++) {
            if (panels[i].selected) return i;
        }

        return -1;
    }

    private listenDeltaSizeChange(): void {
        this._ngZone.runOutsideAngular(() =>
            this.deltaSize$ = this.deltaSizeChange$.asObservable()
                .subscribe(value => {
                    if (this.listBox && this.viewport) {
                        const delta: number = this.listBox.nativeElement.offsetWidth - value;
                        const width: number = this.viewport.nativeElement.offsetWidth;
                        this.decrementButtonDisabled = value === 0;
                        this.incrementButtonDisabled = value > 0 && delta <= width;
                    }

                    if (this.listBox) this._renderer.setStyle(this.listBox.nativeElement, 'transform', `translateX(${value * -1}px)`);

                    this._cdr.markForCheck();
                }));
    }

}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-tabbed-content-box',
    template: `
        <div class="content-item" [class.active]="selectedIndex === idx" *ngFor="let portal of portals; index as idx">
            <ng-template [cdkPortalOutlet]="portal"></ng-template>
        </div>
    `
})
export class NGXSeasonTabbedContentBoxComponent extends NGXSeasonTabbedWidgetComponent implements OnChanges, AfterViewInit {

    @Input({ alias: 'selectedIndex', required: true })
    set selectedIndex(selectedIndex: number | string | undefined | null) {
        this._selectedIndex = coerceNumberProperty(selectedIndex);
    }

    get selectedIndex(): number {
        return this._selectedIndex;
    }

    private _selectedIndex: number = 0;

    @ViewChild('listBox', { read: ElementRef, static: true })
    protected listBox: ElementRef<HTMLElement> | undefined;

    protected portals: TemplatePortal[] = [];

    constructor(
        protected override _cdr: ChangeDetectorRef,
        protected override _element: ElementRef,
        protected override _renderer: Renderer2,
        protected override _ngZone: NgZone,

        protected _vcr: ViewContainerRef
    ) {
        super(_cdr, _element, _renderer, _ngZone);
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'panels') this.createContentItems(coerceArray<NGXSeasonTabbedPanelComponent>(changes[name].currentValue));
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tabbed-content-box');

        this.createContentItems(this.panels);
    }

    private createContentItems(panels: NGXSeasonTabbedPanelComponent[] | undefined): void {
        if (panels) {
            if (this.portals.length > 0) this.portals.splice(0);

            for (const panel of panels) {
                const template: TemplateRef<any> | undefined = panel.fetchTemplate();

                if (template) this.portals.push(new TemplatePortal(template, this._vcr));
            }

            this._cdr.markForCheck();
        }
    }

}
