import { animate, AnimationBuilder, AnimationPlayer, style } from "@angular/animations";
import { coerceBooleanProperty, coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from "@angular/core";

import { NGXSeasonIconComponent } from "./icon.component";

/**
 * 收起状态：24px + 2 * 16px
 */
@Component({
    selector: 'ngx-sui-navlist',
    template: `<ng-content select="a[ngx-sui-NavLink], ngx-sui-navblock"></ng-content>`
})
export class NGXSeasonNavlistComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'nav-list');
    }

}

@Component({
    selector: 'ngx-sui-navblock',
    template: `
        <a class="nav-block-header" (click)="handleToggleEvent()">
            <ngx-sui-icon [iconShape]="icon" [iconSolid]="isLinkHover" #blockCtrlIcon *ngIf="icon"></ngx-sui-icon>
            <span class="header-text-wrapper">{{ title }}</span>
        </a>
        <div class="nav-block-content" #blockContent><ng-content select="a[ngx-sui-NavLink]"></ng-content></div>
    `
})
export class NGXSeasonNavblockComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
    
    @Input('blockIcon')
    set icon(icon: string | undefined) {
        this._icon = icon;
    }

    get icon(): string | undefined {
        return this._icon;
    }
    
    @Input('blockDuration')
    set duration(duration: boolean | string) {
        this._duration = coerceNumberProperty(duration);
    }

    get duration(): number {
        return this._duration;
    }
    
    @Input('blockExpanded')
    set expanded(expanded: boolean | string) {
        this._expanded = coerceBooleanProperty(expanded);
    }

    get expanded(): boolean {
        return this._expanded;
    }
    
    @Input('blockTitle')
    set title(title: string | undefined) {
        this._title = title;
    }

    get title(): string | undefined {
        return this._title;
    }

    private _icon: string | undefined = 'angle';
    private _duration: number = 125;
    private _expanded: boolean = false;
    private _title: string | undefined;

    @Output('blockExpandedChange')
    protected expandedChange: EventEmitter<boolean> = new EventEmitter(true);

    @ViewChild('blockCtrlIcon', { read: ElementRef, static: false })
    protected blockCtrlIcon: ElementRef<NGXSeasonIconComponent> | undefined;

    @ViewChild('blockContent', { read: ElementRef, static: true })
    protected blockContent: ElementRef<HTMLElement> | undefined;

    @HostListener('mouseenter')
    protected handleHostMouseEnterEvent(): void {
        this.isLinkHover = true;
    }

    @HostListener('mouseleave')
    protected handleHostMouseLeaveEvent(): void {
        this.isLinkHover = false;
    }

    protected isLinkHover: boolean = false;

    constructor(
        protected _builder: AnimationBuilder,
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('expanded')) {
            this.setupNavblockState(changes['expanded'].currentValue as boolean);
        }

        keys.splice(0);
        keys = null;
    }

    ngOnInit(): void {
        this.expandedChange.emit(this.expanded);
    }

    ngOnDestroy(): void {
        this.expandedChange.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'nav-block');

        let task = setTimeout(() => {
            clearTimeout(task);

            const element: HTMLElement = this.blockContent?.nativeElement as HTMLElement;
            const value: number = element.offsetHeight as number;
            this._renderer.setAttribute(element, 'data-navblock-content-size', `${value}`);

            this.setupNavblockState(this.expanded);
        });
    }

    protected handleToggleEvent(): void {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);
        
        const ctrlIconElement: NGXSeasonIconComponent = this.blockCtrlIcon?.nativeElement as NGXSeasonIconComponent;
        const contentElement: HTMLElement = this.blockContent?.nativeElement as HTMLElement;
        const value: string | null = contentElement.getAttribute('data-navblock-content-size');
        let currValue: number, nextValue: number;
     
        currValue = this.expanded ? 90 : 180;
        nextValue = this.expanded ? 180 : 90;
        this.createRotateAnimation(ctrlIconElement, this.duration, currValue, nextValue);

        if (value === null) throw new Error();

        currValue = this.expanded ? 0 : Number.parseInt(value);
        nextValue = this.expanded ? Number.parseInt(value) : 0;
        this.createExpandCollapseAnimation(contentElement, this.duration, currValue, nextValue);
    }

    protected setupNavblockState(expanded: boolean): void {
        const ctrlIconElement: NGXSeasonIconComponent = this.blockCtrlIcon?.nativeElement as NGXSeasonIconComponent;
        const contentElement: HTMLElement = this.blockContent?.nativeElement as HTMLElement;
        const value: string | null = contentElement.getAttribute('data-navblock-content-size');

        if (value === null) throw new Error();
        
        if (expanded) {
            this._renderer.setStyle(ctrlIconElement, 'rotate', '180deg');
            this._renderer.setStyle(contentElement, 'height', `${value}px`);
        } else {
            this._renderer.setStyle(ctrlIconElement, 'rotate', '90deg');
            this._renderer.setStyle(contentElement, 'height', '0px');
        }
    }

    private createRotateAnimation(element: any, duration: number, currValue: number, nextValue: number): void {
        let player: AnimationPlayer | null = this._builder.build([
            style({ rotate: `${currValue}deg` }),
            animate(`${duration}ms`, style({ rotate: `${nextValue}deg` }))
        ]).create(element);
        player.onDestroy(() => player = null);
        player.onDone(() => {
            this._renderer.setStyle(element, 'rotate', `${nextValue}deg`);
            player?.destroy();
        });
        player.play();
    }

    private createExpandCollapseAnimation(element: any, duration: number, currValue: number, nextValue: number): void {
        let player: AnimationPlayer | null = this._builder.build([
            style({ height: `${currValue}px` }),
            animate(`${duration}ms`, style({ height: `${nextValue}px` }))
        ]).create(element);
        player.onDestroy(() => player = null);
        player.onDone(() => {
            this._renderer.setStyle(element, 'height', `${nextValue}px`);
            player?.destroy();
        });
        player.play();
    }

}

@Component({
    selector: 'a[ngx-sui-NavLink]',
    template: `
        <ngx-sui-icon [iconShape]="icon ? icon : ''" [iconSolid]="isLinkHover || selected" [style.visibility]="icon ? 'visible' : 'hidden'"></ngx-sui-icon>
        <div class="nav-link-wrapper"><ng-content></ng-content></div>
    `
})
export class NGXSeasonNavlinkComponent implements OnChanges, AfterViewInit {

    @Input('navLinkIcon')
    set icon(icon: string | undefined) {
        this._icon = icon;
    }

    get icon(): string | undefined {
        return this._icon;
    }

    @Input('navLinkSelected')
    set selected(selected: string | boolean) {
        this._selected = coerceBooleanProperty(selected);
    }

    get selected(): boolean {
        return this._selected;
    }

    private _icon: string | undefined;
    private _selected: boolean = false; 

    @HostListener('mouseenter')
    protected handleHostMouseEnterEvent(): void {
        this.isLinkHover = true;
    }

    @HostListener('mouseleave')
    protected handleHostMouseLeaveEvent(): void {
        this.isLinkHover = false;
    }

    protected isLinkHover: boolean = false;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('selected')) {
            this.changeNavLinkSelected(changes['selected'].currentValue as boolean);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'nav-link');
        this.changeNavLinkSelected(this.selected);
    }

    protected changeNavLinkSelected(selected: boolean): void {
        const element: HTMLElement = this._element.nativeElement;

        Promise.resolve()
            .then(() => {
                if (selected) {
                    this._renderer.addClass(element, 'selected');
                } else {
                    this._renderer.removeClass(element, 'selected');
                }
            });
    }

}