import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

import { NGXSeasonTableCaptionPosition, NGXSeasonTableCellAlignment, NGXSeasonTableObjectType } from './table.component';

@Directive({
    selector: '[ngx-sui-TableCaption]'
})
export class NGXSeasonTableCaptionDirective implements OnChanges, AfterViewInit {

    // @Input({ alias: 'tbcSticky' })
    // set captionSticky(captionSticky: boolean | string | undefined | null) {
    //     this._sticky = coerceBooleanProperty(captionSticky);
    // }

    // get captionSticky(): boolean {
    //     return this._sticky;
    // }

    @Input({ alias: 'tbcPos' })
    set position(position: NGXSeasonTableCaptionPosition | undefined | null) {
        this._position = position || 'bottom';
    }

    get position(): NGXSeasonTableCaptionPosition {
        return this._position;
    }

    // private _sticky: boolean = false;
    private _position: NGXSeasonTableCaptionPosition = 'bottom';

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'position') this.changeTableCaptionPosition(changes[name].currentValue as NGXSeasonTableCaptionPosition);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'table-caption');

        this.changeTableCaptionPosition(this.position);
    }

    // protected setupTableHeaderSticky(sticky: boolean): void {
    //     const element = this._element.nativeElement;

    //     if (sticky) this._renderer.addClass(element, 'caption-sticky');
    //     else this._renderer.removeClass(element, 'caption-sticky');
    // }

    protected changeTableCaptionPosition(position: NGXSeasonTableCaptionPosition): void {
        const element = this._element.nativeElement;

        // this._renderer.setAttribute(element, 'data-table-caption-position', position);
        this._renderer.setStyle(element, 'caption-side', position);
    }

}

@Directive()
export abstract class NGXSeasonBaseTableRowDefDirective {

    constructor(
        protected _ref: TemplateRef<NGXSeasonTableObjectType>,
        protected _vcr: ViewContainerRef
    ) { }

    protected abstract create(object: NGXSeasonTableObjectType | undefined): void;

}

@Directive()
export abstract class NGXSeasonBaseTableRowDirective {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

}

@Directive()
export abstract class NGXSeasonBaseTableCellDirective implements OnChanges, AfterViewInit {

    @Input({ alias: 'tbcAlign' })
    set align(align: NGXSeasonTableCellAlignment | undefined | null) {
        this._align = align || 'center';
    }

    get align(): NGXSeasonTableCellAlignment {
        return this._align;
    }

    private _align: NGXSeasonTableCellAlignment = 'center';

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'align') this.changeTableCellAlignment(changes[name].currentValue as NGXSeasonTableCellAlignment);
        }
    }

    ngAfterViewInit(): void {
        this.changeTableCellAlignment(this.align);
    }

    protected changeTableCellAlignment(align: NGXSeasonTableCellAlignment): void {
        this._renderer.setStyle(this._element.nativeElement, 'text-align', align);
    }

}

