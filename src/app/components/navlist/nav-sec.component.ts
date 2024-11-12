import { AnimationBuilder, AnimationPlayer, useAnimation } from "@angular/animations";
import { coerceNumberProperty, coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, OnChanges, OnInit, OnDestroy, AfterViewInit, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, Renderer2, SimpleChanges, NgZone, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, Subscription } from "rxjs";

import { NGXSeasonIconName } from "../icon/icon.component";

import { verticalCollapsionExpanionAnimation } from "src/app/utils/animate.utils";
import { NGX_SEASON_NAVLIST_TOKEN, NGXSeasonNavlistComponent } from "./nav-list.component";

@Component({
    selector: 'ngx-sui-navlist-section',
    template: `
        <a class="section-header" (click)="handleToggleEvent(content)">
            <span class="section-icon">
                <ngx-sui-icon [iconShape]="folded ? foldIcon : icon" [iconSolid]="isLinkHover" iconSize="lg" [iconRotateDuration]="duration" [iconDegreeStart]="folded ? 0 : (expanded ? 90 : 180)" [iconDegreeFinal]="folded ? 0 : (expanded ? 180 : 90)" *ngIf="icon"></ngx-sui-icon>
            </span>
            <span class="section-text">{{ label }}</span>
        </a>
        <div class="section-content" #content>
            <div class="section-wrapper" #wrapper><ng-content select="[ngx-sui-NavListItem]"></ng-content></div>
        </div>
    `
})
export class NGXSeasonNavlistSectionComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

    @Input('navSecFoldHref')
    set foldHref(foldHref: string | string[] | undefined | null) {
        this._foldHref = foldHref ? foldHref : undefined;
    }

    get foldHref(): string | string[] | undefined {
        return this._foldHref;
    }

    @Input('navSecFoldIcon')
    set foldIcon(foldIcon: NGXSeasonIconName | undefined | null) {
        this._foldIcon = foldIcon ? foldIcon : undefined;
    }

    get foldIcon(): NGXSeasonIconName | undefined {
        return this._foldIcon;
    }

    @Input('navSecIcon')
    set icon(icon: NGXSeasonIconName | null) {
        this._icon = icon ? icon : 'angle';
    }

    get icon(): NGXSeasonIconName {
        return this._icon;
    }

    @Input('navSecDuration')
    set duration(duration: boolean | string | null) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }

    @Input('navSecExpanded')
    set expanded(expanded: boolean | string | null) {
        this._expanded = coerceBooleanProperty(expanded);
    }

    get expanded(): boolean {
        return this._expanded;
    }

    @Input('navSecFolded')
    set folded(folded: boolean | string | null) {
        this._folded = coerceBooleanProperty(folded);
    }

    get folded(): boolean {
        return this._folded;
    }

    @Input('navSecLabel')
    set label(label: string | undefined | null) {
        this._label = label ? label : undefined;
    }

    get label(): string | undefined {
        return this._label;
    }

    private _foldHref: string | string[] | undefined;
    private _foldIcon: NGXSeasonIconName | undefined;
    private _icon: NGXSeasonIconName = 'angle';
    private _duration: number = 250;
    private _expanded: boolean = false;
    private _folded: boolean = false;
    private _label: string | undefined;

    @Output('blockExpandedChange')
    protected expandedChange: EventEmitter<boolean> = new EventEmitter(true);

    @ViewChild('content', { read: ElementRef, static: true })
    protected content: ElementRef<HTMLElement> | undefined;

    @ViewChild('wrapper', { read: ElementRef, static: true })
    protected wrapper: ElementRef<HTMLElement> | undefined;

    @HostListener('mouseenter')
    protected handleHostMouseEnterEvent(): void {
        this.isLinkHover = true;
    }

    @HostListener('mouseleave')
    protected handleHostMouseLeaveEvent(): void {
        this.isLinkHover = false;
    }

    protected isLinkHover: boolean = false;

    private foldedChange$: Subject<boolean> = new BehaviorSubject(this.folded);

    private player: AnimationPlayer | undefined;
    private expandCache: boolean = this.expanded;

    private folded$: Subscription = Subscription.EMPTY;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2,
        protected _router: Router,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_NAVLIST_TOKEN)
        protected _navlist: NGXSeasonNavlistComponent
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'expanded') this.expandCache = coerceBooleanProperty(changes[name].currentValue);

            if (name === 'folded') this.foldedChange$.next(coerceBooleanProperty(changes[name].currentValue));
        }
    }

    ngOnInit(): void {
        this.expandedChange.emit(this.expanded);
    }

    ngOnDestroy(): void {
        this.expandedChange.complete();
        this.foldedChange$.complete();
        this.folded$.unsubscribe();
    }

    ngAfterViewInit(): void {
        const element: HTMLElement = this._element.nativeElement;
        this._renderer.addClass(element, 'nav-list-section');
        this._renderer.setAttribute(element, 'data-navlist-section-belong', this._navlist.id);

        Promise.resolve().then(() => {
            const contentElement: HTMLElement = this.content?.nativeElement as HTMLElement;
            const wrapperElement: HTMLElement = this.wrapper?.nativeElement as HTMLElement;
            const value: number = wrapperElement.offsetHeight;
            this._renderer.setAttribute(contentElement, 'data-navlist-content-size', `${value}`);

            this.setupNavlistSectionFolded(this.folded);
        });

        this.listenNavlistSectionFoldedChange();
    }

    open(): void {
        this.expanded = true;
        this.expandedChange.emit(this.expanded);
    }

    close(): void {
        this.expanded = false;
        this.expandedChange.emit(this.expanded);
    }

    toggle(): void {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
    }

    protected setupNavlistSectionFolded(folded: boolean): void {
        const id: string = this._element.nativeElement.getAttribute('data-navlist-section-belong');

        if (id === this._navlist.id) {
            if (folded) {
                this.expandCache = this.expanded;
                this.close();
            } else {
                this.expanded = this.expandCache;
    
                if (this.expanded) this.open(); else this.close();
            }
            
            this.execute(this.content?.nativeElement);
        }
    }

    protected handleToggleEvent(element: HTMLElement): void {
        const id: string = this._element.nativeElement.getAttribute('data-navlist-section-belong');

        if (id === this._navlist.id) {
            if (this.folded) {
                if (typeof this.foldHref === 'string') {
                    this._router.navigateByUrl(this.foldHref);
                } else if (typeof this.foldHref === 'object') {
                    this._router.navigate(this.foldHref);
                } else {
                    throw new Error();
                }
            } else {
                this.toggle();
                this.execute(element);
            }
        }
    }

    private execute(element: HTMLElement | undefined): void {
        if (!element) throw new Error();

        const value: string | null = element.getAttribute('data-navlist-content-size');
        
        if (value) this.executeAnimation(element, this.expanded, 0, value, this.duration);
    }

    private executeAnimation(element: HTMLElement, expanded: boolean, start: string | number, final: string | number, duration: number): void {
        if (!this.player) {
            this.player = expanded 
                ? this._builder.build(useAnimation(verticalCollapsionExpanionAnimation, { params: { start, final, duration } })).create(element)
                : this._builder.build(useAnimation(verticalCollapsionExpanionAnimation, { params: { start: final, final: start, duration } })).create(element);
        }
        
        this.player.onDone(() => {
            this._renderer.setStyle(element, 'height', expanded ? `${final}px`: `${start}px`);

            this.player?.destroy();
            this.player = undefined;
        });
        this.player.onStart(() => this._renderer.setStyle(element, 'height', expanded ? `${start}px` : `${final}px`));
        this.player.play();
    }

    private listenNavlistSectionFoldedChange(): void {
        this._ngZone.runOutsideAngular(() => 
            this.folded$ = this.foldedChange$.asObservable().subscribe(value => 
                this._ngZone.run(() => this.setupNavlistSectionFolded(value))));
    }

}
