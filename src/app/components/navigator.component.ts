import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Component, Directive, ElementRef, HostListener, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";

/**
 * 收起状态：24px + 2 * 16px
 */
@Component({
    selector: 'ngx-sui-navlist',
    template: `<ng-content select="a[ngx-sui-NavLink]"></ng-content>`
})
export class NGXSeasonNavlistComponent implements OnChanges, AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('expanded')) {
            // this.setupShrinkSize(changes['expanded'].currentValue as boolean);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'nav-list');
        // this.setupShrinkSize(this.expanded);
    }

    // protected setupShrinkSize(expanded: boolean): void {
    //     const element: HTMLElement = this._element.nativeElement;

    //     if (expanded) {
    //         this._renderer.removeStyle(element, 'min-width');
    //         this._renderer.removeStyle(element, 'width');
    //     } else {
    //         this._renderer.setStyle(element, 'min-width', `${this.SHRINK_SIZE}px`);
    //         this._renderer.setStyle(element, 'width', `${this.SHRINK_SIZE}px`);
    //     }
    // }

}

@Component({
    selector: 'a[ngx-sui-NavLink]',
    template: `
        <ngx-sui-icon [iconShape]="icon" [iconSolid]="isLinkHover || selected" *ngIf="icon"></ngx-sui-icon>
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