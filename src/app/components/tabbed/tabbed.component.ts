import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, Inject, InjectionToken, Input, NgZone, OnChanges, Output, QueryList, Renderer2, RendererStyleFlags2, SimpleChanges, TemplateRef, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

import { NGXSeasonIconName } from "../icon/icon.component";
import { NGXSeasonTabbedContentBoxComponent } from "./tabbed-widget.component";

export const NGX_SEASON_TABBED_GROUP_TOKEN: InjectionToken<NGXSeasonTabbedGroupComponent> = new InjectionToken('NGX_SEASON_TABBED_GROUP_TOKEN');

export type NGXSeasonTabbedControlPosition = 'top' | 'bottom';

@Component({
    selector: 'ngx-sui-tabbed-panel',
    template: `<ng-template #template><ng-content></ng-content></ng-template>`
})
export class NGXSeasonTabbedPanelComponent implements AfterViewInit {

    @Input('tabPanelIcon')
    set icon(icon: NGXSeasonIconName | undefined | null) {
        this._icon = icon || undefined;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
    }

    @Input('tabPanelText')
    set text(text: string | undefined | null) {
        this._text = text || undefined;
    }

    get text(): string | undefined {
        return this._text;
    }

    private _icon: NGXSeasonIconName | undefined;
    private _text: string | undefined;

    @ViewChild('template', { read: TemplateRef })
    protected template: TemplateRef<any> | undefined;

    readonly id: string = `ngx-sui-tabbed-panel-${this.tabbedGroup.index++}`;

    selected: boolean = false;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_TABBED_GROUP_TOKEN)
        protected tabbedGroup: NGXSeasonTabbedGroupComponent
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tabbed-panel');
    }

    fetchTemplate(): TemplateRef<any> | undefined {
        return this.template;
    }

    select(): void {
        this.selected = true;
    }

    deselect(): void {
        this.selected = false;
    }

}

// @Component({
//     changeDetection: ChangeDetectionStrategy.OnPush,
//     selector: 'ngx-sui-tabbed-group',
//     template: `
//         <div class="tabbed-control-bar">
//             <button ngx-sui-IconButton btnIcon="angle" btnIconDegree="-90" btnStyle="flat" (click)="handleViewportScrollEvent('dec')" #decBtn></button>
//             <div class="control-scroll-viewport" [style.width]="calcViewportSize(decBtn.fetchHostElement(), incBtn.fetchHostElement())">
//                 <div class="control-list" #ctrlList>
//                     <a class="control-item" [class.active]="selectedID === item.id" (click)="handleControlSelectedEvent(item.id)" #ctrlItem *ngFor="let item of panelsChange$.asObservable() | async">
//                         <div class="control-item-wrapper">
//                             <ngx-sui-icon [iconShape]="item.icon" *ngIf="item.icon && showIcon"></ngx-sui-icon>
//                             <span class="text">{{ item.text }}</span>
//                             <span class="spring" *ngIf="closible"></span>
//                             <button ngx-sui-IconButton btnCircled btnIcon="close" btnSize="sm" btnStyle="flat" (click)="handleControlClosedEvent($event, item.id)" *ngIf="closible"></button>
//                         </div>
//                         <div class="control-item-block"></div>
//                     </a>
//                 </div>
//             </div>
//             <button ngx-sui-IconButton btnIcon="angle" btnIconDegree="90" btnStyle="flat" (click)="handleViewportScrollEvent('inc')" #incBtn></button>
//         </div>
//         <div class="tabbed-content-box">
//             <div class="content-list" #panelList><div class="tabbed-panel" [innerHTML]="formatInnerHTML(item.fetchInnerHTML())" *ngFor="let item of panelsChange$.asObservable() | async"></div></div>
//         </div>
//         <ng-template><ng-content select="ngx-sui-tabbed-panel"></ng-content></ng-template>
//     `,
//     providers: [{ provide: NGX_SEASON_TABBED_GROUP_TOKEN, useExisting: NGXSeasonTabbedGroupComponent }]
// })
// export class NGXSeasonTabbedGroupComponent implements OnChanges, OnDestroy, AfterContentInit, AfterViewInit {

//     @Input('tabGroupClosible')
//     set closible(closible: boolean | string | undefined | null) {
//         this._closible = coerceBooleanProperty(closible);
//     }

//     get closible(): boolean {
//         return this._closible;
//     }

//     @Input('tabGroupColor')
//     set color(color: NGXSeasonColorPalette | undefined | null) {
//         this._color = color || 'default';
//     }

//     get color(): NGXSeasonColorPalette {
//         return this._color;
//     }

//     @Input('tabGroupDuration')
//     set duration(duration: number | string | undefined | null) {
//         this._duration = coerceNumberProperty(duration);
//     }

//     get duration(): number {
//         return this._duration;
//     }

//     @Input('tabGroupSelectedIndex')
//     set selectedIndex(selectedIndex: number | string | undefined | null) {
//         this._selectedIndex = coerceNumberProperty(selectedIndex);
//     }

//     get selectedIndex(): number {
//         return this._selectedIndex;
//     }

//     @Input('tabGroupShowIcon')
//     set showIcon(showIcon: boolean | string | undefined | null) {
//         this._showIcon = coerceBooleanProperty(showIcon);
//     }

//     get showIcon(): boolean {
//         return this._showIcon;
//     }

//     @Input('tabGroupCtrlSize')
//     set size(size: number | string | undefined | null) {
//         this._size = coerceNumberProperty(size);
//     }

//     get size(): number {
//         return this._size;
//     }

//     private _closible: boolean = false;
//     private _color: NGXSeasonColorPalette = 'default';
//     private _duration: number = 250;
//     private _selectedIndex: number = 0;
//     private _showIcon: boolean = false;
//     private _size: number = 256;

//     @Output('tabGroupSelectedIndexChange')
//     selectedIndexChange: EventEmitter<number> = new EventEmitter(true);

//     @ContentChildren(NGXSeasonTabbedPanelComponent)
//     protected panels: QueryList<NGXSeasonTabbedPanelComponent> | undefined;

//     @ViewChild('ctrlList', { read: ElementRef, static: true })
//     protected ctrlList: ElementRef<HTMLElement> | undefined;

//     @ViewChildren('ctrlItem', { read: ElementRef })
//     protected ctrlItems: QueryList<ElementRef<HTMLElement>> | undefined;

//     @ViewChild('panelList', { read: ElementRef, static: true })
//     protected panelList: ElementRef<HTMLElement> | undefined;

//     index: number = 0;

//     // protected panelsChange$: Subject<NGXSeasonTabbedPanelComponent[]> = new Subject();
//     protected panelsChange$: Subject<NGXSeasonTabbedPanelComponent[]> = new BehaviorSubject<NGXSeasonTabbedPanelComponent[]>([]);

//     protected selectedID: string | undefined;

//     private panels$: Subscription = Subscription.EMPTY;

//     private tabbedScrollIndex: number = 0;
//     private tabbedScrollSize: number = 0;

//     constructor(
//         protected _sanitizer: DomSanitizer,
//         protected _element: ElementRef,
//         protected _renderer: Renderer2,
//         protected _ngZone: NgZone
//     ) {}

//     ngOnChanges(changes: SimpleChanges): void {
//         for (const name in changes) {
//             if (name === 'color') this.changeTabbedGroupColor(changes[name].currentValue as NGXSeasonColorPalette);

//             if (name === 'duration') this.setupTabbedGroupDuration(coerceNumberProperty(changes[name].currentValue));

//             if (name === 'selectedIndex') this.setupTabbedGroupSelectedIndex(coerceNumberProperty(changes[name].currentValue));

//             if (name === 'size') this.setupTabbedGroupControlSize(coerceNumberProperty(changes[name].currentValue));
//         }
//     }

//     ngOnDestroy(): void {
//         this.panels$.unsubscribe();

//         this.panelsChange$.complete();
//     }

//     ngAfterContentInit(): void {
//         if (this.panels) this.panelsChange$.next(this.panels.toArray());
//     }

//     ngAfterViewInit(): void {
//         this.initialization();
//         this.changeTabbedGroupColor(this.color);
//         this.setupTabbedGroupDuration(this.duration);
//         this.setupTabbedGroupSelectedIndex(this.selectedIndex);
//         this.setupTabbedGroupControlSize(this.size);
//         this.listenTabbedPanelsChange();
//         this.listenTabbedSelectedIndexChange();
//     }

//     protected initialization(): void {
//         const element: HTMLElement = this._element.nativeElement;
//         this.tabbedScrollSize = element.offsetWidth;

//         this._renderer.addClass(element, 'tabbed-group');
//         this._renderer.setStyle(element, '--tabbed-content-panel-size', `${this.tabbedScrollSize}px`, RendererStyleFlags2.DashCase);
//     }

//     protected changeTabbedGroupColor(color: NGXSeasonColorPalette): void {
//         this._renderer.setAttribute(this._element.nativeElement, 'data-tabbed-group-color', color);
//     }

//     protected setupTabbedGroupDuration(duration: number): void {
//         this._renderer.setStyle(this._element.nativeElement, '--tabbed-group-animate-duration', `${duration}ms`, RendererStyleFlags2.DashCase);
//     }

//     protected setupTabbedGroupSelectedIndex(selectedIndex: number): void {
//         this.tabbedScrollIndex = selectedIndex;
//         this.selectedID = this.panels?.get(selectedIndex)?.id;
//         this.selectedIndexChange.emit(selectedIndex);
//     }

//     protected setupTabbedGroupControlSize(size: number): void {
//         this._renderer.setStyle(this._element.nativeElement, '--tabbed-control-item-size', `${size}px`, RendererStyleFlags2.DashCase);
//     }

//     protected handleViewportScrollEvent(flag: 'dec' | 'inc'): void {
//         if (this.ctrlList) this.controlScrollByIndexOffset(this.ctrlList.nativeElement, this.tabbedScrollIndex, flag);
//     }

//     protected handleControlSelectedEvent(id: string | undefined): void {
//         if (this.selectedID !== id) {
//             this.selectedID = id;

//             this.selectedIndex = this.indexOfSelectedPanel(this.panels, id);
//             this.selectedIndexChange.emit(this.selectedIndex);
//         }
//     }

//     protected handleControlClosedEvent(event: MouseEvent, id: string): void {
//         event.stopPropagation();

//         if (this.panels && this.panels.length === 1) {
//             this.handleControlSelectedEvent(undefined);

//             this.panels.reset(this.panels.filter(panel => panel.id !== id));
//             this.panels.notifyOnChanges();
//         } else {
//             Promise.resolve()
//                 .then(() => {
//                     if (this.panels) {
//                         this.panels.reset(this.panels.filter(panel => panel.id !== id));
//                         this.panels.notifyOnChanges();
//                     }
//                 })
//                 .then(() => {
//                     if (this.selectedID === id) {
//                         this.selectedID = this.panels?.get(0)?.id;

//                         this.selectedIndex = 0;
//                         this.selectedIndexChange.emit(0);

//                         if (this.ctrlList) this.controlScrollByIndexOffset(this.ctrlList.nativeElement, 0, 'dec');
//                     }
//                 });
//         }
//     }

//     protected formatInnerHTML(html: string | undefined): SafeHtml {
//         return this._sanitizer.bypassSecurityTrustHtml(html || '');
//     }

//     protected calcViewportSize(decBtn: HTMLElement, incBtn: HTMLElement): string {
//         return `calc(100% - ${decBtn.offsetWidth}px - ${incBtn.offsetWidth}px)`;
//     }

//     private listenTabbedPanelsChange(): void {
//         this._ngZone.runOutsideAngular(() => {
//             if (this.panels) {
//                 this.panels$ = this.panels.changes.pipe(debounceTime(100))
//                     .subscribe((change: QueryList<NGXSeasonTabbedPanelComponent>) =>
//                         this._ngZone.run(() => this.panelsChange$.next(change.toArray())));
//             }
//         });
//     }

//     private listenTabbedSelectedIndexChange(): void {
//         this._ngZone.runOutsideAngular(() =>
//             this.selectedIndexChange.asObservable().pipe(debounceTime(100))
//                 .subscribe(value => this._ngZone.run(() => {
//                     if (this.panelList) this._renderer.setStyle(this.panelList.nativeElement, 'transform', `translateX(${value * this.tabbedScrollSize * -1}px)`);
//                 })));
//     }

//     private controlScrollByIndexOffset(element: HTMLElement, index: number, flag: 'dec' | 'inc'): void {
//         if (flag === 'dec') this.tabbedScrollIndex = Math.max(index - 1, 0);

//         if (flag === 'inc') this.tabbedScrollIndex = Math.min(index + 1, coerceNumberProperty(this.panels?.length) - 1);

//         this._renderer.setStyle(element, 'transform', `translateX(${this.tabbedScrollIndex * this.size * -1}px)`);
//     }

//     private indexOfSelectedPanel(panels: QueryList<NGXSeasonTabbedPanelComponent> | undefined, id: string | undefined): number {
//         if (!panels || !id) return -1;

//         for (let i = 0, length = panels.length; i < length; i++) {
//             if (panels.get(i)?.id === id) return i;
//         }

//         return -1;
//     }

// }

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'ngx-sui-tabbed-group',
    template: `
        <ngx-sui-tabbed-control-bar [panels]="list" [scrollSize]="size" (selectedIndexChange)="listenTabbedSelectedIndexChange($event)" (closedIndexChange)="listenTabbedClosedIndexChange($event)"></ngx-sui-tabbed-control-bar>
        <ngx-sui-tabbed-content-box [panels]="list" [selectedIndex]="selectedIndex" #contentBox></ngx-sui-tabbed-content-box>
        <ng-template><ng-content select="ngx-sui-tabbed-panel"></ng-content></ng-template>
    `,
    providers: [{ provide: NGX_SEASON_TABBED_GROUP_TOKEN, useExisting: NGXSeasonTabbedGroupComponent }]
})
export class NGXSeasonTabbedGroupComponent implements OnChanges, AfterContentInit, AfterViewInit {

    @Input('tabGroupClosible')
    set closible(closible: boolean | string | undefined | null) {
        this._closible = coerceBooleanProperty(closible);
    }

    get closible(): boolean {
        return this._closible;
    }

    @Input('tabGroupColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('tabGroupDuration')
    set duration(duration: number | string | undefined | null) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input({ alias: 'tabGroupCtrlPos' })
    set position(position: NGXSeasonTabbedControlPosition | undefined | null) {
        this._position = position || 'top';
    }

    get position(): NGXSeasonTabbedControlPosition {
        return this._position;
    }

    @Input('tabGroupSelectedIndex')
    set selectedIndex(selectedIndex: number | string | undefined | null) {
        this._selectedIndex = coerceNumberProperty(selectedIndex);
    }

    get selectedIndex(): number {
        return this._selectedIndex;
    }

    @Input('tabGroupShowIcon')
    set showIcon(showIcon: boolean | string | undefined | null) {
        this._showIcon = coerceBooleanProperty(showIcon);
    }

    get showIcon(): boolean {
        return this._showIcon;
    }

    @Input('tabGroupCtrlSize')
    set size(size: number | string | undefined | null) {
        this._size = coerceNumberProperty(size);
    }

    get size(): number {
        return this._size;
    }

    private _closible: boolean = false;
    private _color: NGXSeasonColorPalette = 'default';
    private _duration: number = 250;
    private _position: NGXSeasonTabbedControlPosition = 'top';
    private _selectedIndex: number = 0;
    private _showIcon: boolean = false;
    private _size: number = 256;

    @Output('tabGroupSelectedIndexChange')
    selectedIndexChange: EventEmitter<number> = new EventEmitter(true);

    @ContentChildren(NGXSeasonTabbedPanelComponent)
    protected panels: QueryList<NGXSeasonTabbedPanelComponent> | undefined;

    @ViewChild('contentBox', { read: NGXSeasonTabbedContentBoxComponent, static: true })
    protected contentBox: NGXSeasonTabbedContentBoxComponent | undefined;

    index: number = 0;

    protected list: NGXSeasonTabbedPanelComponent[] | undefined;
    protected scrollSize: number = 0;

    constructor(
        protected _cdr: ChangeDetectorRef,
        protected _sanitizer: DomSanitizer,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _ngZone: NgZone
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeTabbedGroupColor(changes[name].currentValue as NGXSeasonColorPalette);

            if (name === 'duration') this.setupTabbedGroupDuration(coerceNumberProperty(changes[name].currentValue));

            if (name === 'position') this.changeTabbedGroupControlPosition(changes[name].currentValue as NGXSeasonTabbedControlPosition);

            if (name === 'selectedIndex') this.setupTabbedGroupSelectedIndex(coerceNumberProperty(changes[name].currentValue));

            if (name === 'size') this.setupTabbedGroupControlSize(coerceNumberProperty(changes[name].currentValue));
        }
    }

    ngAfterContentInit(): void {
        if (this.panels) this.list = this.panels.toArray();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tabbed-group');

        this.changeTabbedGroupColor(this.color);
        this.setupTabbedGroupDuration(this.duration);
        this.changeTabbedGroupControlPosition(this.position);
        this.setupTabbedGroupSelectedIndex(this.selectedIndex);
        this.setupTabbedGroupControlSize(this.size);
    }

    protected changeTabbedGroupColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-tabbed-group-color', color);
    }

    protected setupTabbedGroupDuration(duration: number): void {
        this._renderer.setStyle(this._element.nativeElement, '--tabbed-group-animate-duration', `${duration}ms`, RendererStyleFlags2.DashCase);
    }

    protected changeTabbedGroupControlPosition(position: NGXSeasonTabbedControlPosition): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-tabbed-group-position', position);
    }

    protected setupTabbedGroupSelectedIndex(selectedIndex: number): void {
        this.listenTabbedSelectedIndexChange(selectedIndex);
    }

    protected setupTabbedGroupControlSize(size: number): void {
        this._renderer.setStyle(this._element.nativeElement, '--tabbed-control-item-size', `${size}px`, RendererStyleFlags2.DashCase);
    }

    protected listenTabbedSelectedIndexChange(index: number): void {
        if (this.list) {
            this.list.forEach(item => item.deselect());
            this.list[index].select();

            this.selectedIndex = index;
            this.selectedIndexChange.emit(index);
        }
    }

    protected listenTabbedClosedIndexChange(index: number): void {
        if (!this.list) throw new Error();

        let list: NGXSeasonTabbedPanelComponent[] | undefined = this.list.concat();

        if (list.length === 1) {
            list.splice(0);
        } else {
            if (list[index].selected) {
                const k: number = index === 0 ? Math.min(index + 1, list.length - 1) : Math.max(index - 1, 0);
                this.listenTabbedSelectedIndexChange(k);
            }

            list.splice(index, 1);
        }

        this.list.splice(0);
        this.list = list.concat();

        list.splice(0);
        list = undefined;

        this._cdr.detectChanges();
    }

}
