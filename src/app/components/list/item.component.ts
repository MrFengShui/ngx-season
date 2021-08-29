import { Direction } from "@angular/cdk/bidi";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, HostBinding, Input, HostListener, ElementRef, Renderer2, OnInit, OnChanges, SimpleChanges, OnDestroy, ViewChild } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Component({
    exportAs: 'octopusListItem',
    selector: 'octopus-list-item,[octopus-list-item]',
    template: `
        <div class="octopus-list-item-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusListItem {

    @HostBinding('class') class: string = 'octopus-list-item';

}

@Component({
    exportAs: 'octopusNavListItem',
    selector: 'a[octopus-nav-list-item]',
    template: `
        <div style="position: absolute;inset: 0;">
            <div octopus-ripple class="h-100" style="z-index: 5;"></div>
        </div>
        <ng-content select="span[octopus-list-text]"></ng-content>
        <ng-content select="span[octopus-list-icon],img[octopus-list-icon]"></ng-content>
        <ng-content></ng-content>
    `
})
export class OctopusNavListItem implements OnChanges, OnInit {

    @Input('free') free: boolean = false;
    @ViewChild('ripple', { read: ElementRef, static: true })
    protected ripple!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-nav-list-item octopus-ripple';

    @HostListener('click', ['$event'])
    protected listenHostClick(event: MouseEvent): void {
        // setTimeout(() => this._render.addClass(this.ripple.nativeElement, 'active'));
        // setTimeout(() => this.locate(event));
        // setTimeout(() => this._render.removeClass(this.ripple.nativeElement, 'active'), 500);
    }

    constructor(
        protected _ref: ElementRef<HTMLElement>,
        protected _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.free) {
            setTimeout(() => this.build(coerceBooleanProperty(changes.free.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => this.build(coerceBooleanProperty(this.free)));
    }

    private build(free: boolean): void {
        if (free) {
            this._render.addClass(this._ref.nativeElement, 'free');
        } else {
            this._render.removeClass(this._ref.nativeElement, 'free');
        }
    }

    private locate(event: MouseEvent): void {
        let radius: number = Math.max(this._ref.nativeElement.clientWidth, this._ref.nativeElement.clientHeight);
        this._render.setStyle(this.ripple.nativeElement, 'width', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'height', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'top', `${event.pageY - this._ref.nativeElement.offsetTop - radius}px`);
        this._render.setStyle(this.ripple.nativeElement, 'left', `${event.pageX - this._ref.nativeElement.offsetLeft - radius}px`);
    }

}

@Component({
    selector: 'octopus-select-list-item',
    template: `
        <div class="octopus-ripple-wrapper" #ripple></div>
        <div class="octopus-select-list-item-wrapper">
            <octopus-checkbox [color]="color" [selected]="selected"></octopus-checkbox>
            <div class="content"><ng-content></ng-content></div>
        </div>
    `
})
export class OctopusSelectListItem implements OnChanges, OnInit, OnDestroy {

    @Input('color') color: string = 'primary';
    @Input('direction') direction: Direction = 'ltr';
    @Input('selected') selected: boolean = false;

    @ViewChild('ripple', { read: ElementRef, static: true })
    protected ripple!: ElementRef<HTMLElement>;

    @HostBinding('class') class: string = 'octopus-select-list-item octopus-ripple';

    @HostListener('click', ['$event'])
    private listenHostClickAction(event: MouseEvent): void {
        this.toggle();
        setTimeout(() => this._render.addClass(this.ripple.nativeElement, 'active'));
        setTimeout(() => this.locate(event));
        setTimeout(() => this._render.removeClass(this.ripple.nativeElement, 'active'), 500);
    }

    private selected$: Subject<boolean> = new Subject();

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.direction !== undefined) {
            setTimeout(() => this.renderDirection(changes.direction.previousValue, changes.direction.currentValue));
        }

        if (changes.selected !== undefined) {
            this.selected$.next(changes.selected.currentValue);
        }
    }

    ngOnInit() {
        this.selected$.next(this.selected);
        setTimeout(() => this.renderDirection(undefined, this.direction));
    }

    ngOnDestroy() {
        this.selected$.complete();
    }

    toggle(): void {
        this.selected = !this.selected;
        this.selected$.next(this.selected);
    }

    change(): Observable<boolean> {
        return this.selected$.asObservable();
    }

    private renderDirection(prevDir: Direction | undefined, currDir: Direction): void {
        this._render.removeClass(this._ref.nativeElement, prevDir === undefined ? 'rtl' : prevDir);
        this._render.addClass(this._ref.nativeElement, currDir);
    }

    private locate(event: MouseEvent): void {
        let radius: number = this._ref.nativeElement.clientWidth;
        this._render.setStyle(this.ripple.nativeElement, 'width', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'height', `${radius * 2}px`);
        this._render.setStyle(this.ripple.nativeElement, 'top', `${event.pageY - this._ref.nativeElement.offsetTop - radius}px`);
        this._render.setStyle(this.ripple.nativeElement, 'left', `${event.pageX - this._ref.nativeElement.offsetLeft - radius}px`);
    }

}

@Component({
    selector: '[octopus-list-icon]',
    template: `<ng-content></ng-content>`
})
export class OctopusListIcon implements OnChanges, OnInit {

    @Input('shadow') shadow: number = 0;

    @HostBinding('class') class: string = 'octopus-list-icon';

    constructor(
        private _ref: ElementRef<HTMLElement>,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.shadow !== undefined) {
            setTimeout(() => this.renderShadow(changes.shadow.previousValue, changes.shadow.currentValue));
        }
    }

    ngOnInit() {
        setTimeout(() => this.renderShadow(undefined, this.shadow));
    }

    private renderShadow(prevShadow: number | undefined, currShadow: number): void {
        this._render.removeClass(this._ref.nativeElement, prevShadow === undefined ? 'octopus-shadow-z0' : `octopus-shadow-z${prevShadow}`);
        this._render.addClass(this._ref.nativeElement, `octopus-shadow-z${currShadow}`);
    }

}

@Component({
    selector: '[octopus-list-text]',
    template: `<ng-content></ng-content>`
})
export class OctopusListText {

    @HostBinding('class') class: string = 'octopus-list-text';

}