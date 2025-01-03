import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, OnChanges, AfterViewInit, Input, HostListener, ElementRef, Renderer2, SimpleChanges } from "@angular/core";

import { NGXSeasonIconName } from "../icon/icon.component";

@Component({
    selector: 'a[ngx-sui-NavListItem]',
    template: `
        <span class="list-item-icon">
            <ngx-sui-icon [iconShape]="icon" [iconSolid]="isHover || selected" [style.visibility]="icon ? 'visible' : 'hidden'"></ngx-sui-icon>
        </span>
        <div class="list-item-wrapper">
            <span class="text"><ng-content></ng-content></span>
            <span class="mark"></span>
        </div>
    `
})
export class NGXSeasonNavlistItemComponent implements OnChanges, AfterViewInit {

    @Input({ alias: 'niIcon' })
    set icon(icon: NGXSeasonIconName | undefined) {
        this._icon = icon;
    }

    get icon(): NGXSeasonIconName | undefined {
        return this._icon;
    }

    @Input({ alias: 'niSelected' })
    set selected(selected: boolean | string | null) {
        this._selected = coerceBooleanProperty(selected);
    }

    get selected(): boolean {
        return this._selected;
    }

    private _icon: NGXSeasonIconName | undefined;
    private _selected: boolean = false;

    @HostListener('mouseenter')
    protected handleHostMouseEnterEvent(): void {
        this.isHover = true;
    }

    @HostListener('mouseleave')
    protected handleHostMouseLeaveEvent(): void {
        this.isHover = false;
    }

    protected isHover: boolean = false;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        let keys: string[] | null = Object.keys(changes);

        if (keys.includes('selected')) {
            this.changeNavLinkSelected(changes['selected'].currentValue as boolean);
        }

        keys.splice(0);
        keys = null;
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'nav-list-item');
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
