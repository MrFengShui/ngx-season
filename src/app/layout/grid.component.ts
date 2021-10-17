import { coerceNumberProperty } from "@angular/cdk/coercion";
import { Directive, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";

@Directive({
    selector: '[octopus-layout-grid]'
})
export class OctopusLayoutGrid implements OnChanges, OnInit {

    @Input('gridColumns') cols: string = '';

    @Input('gridGapX')
    get gapX(): any { return this._gapX; }
    set gapX(_gapX: any) { this._gapX = coerceNumberProperty(_gapX); }
    private _gapX: any = 0;

    @Input('gridGapY')
    get gapY(): any { return this._gapY; }
    set gapY(_gapY: any) { this._gapY = coerceNumberProperty(_gapY); }
    private _gapY: any = 0;

    @Input('gridRows') rows: string = '';

    @HostBinding('class') class: string = 'octopus-layout-grid d-grid';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.cols !== undefined) {
            setTimeout(() => this.renderColumns(changes.cols.currentValue));
        }

        if (changes.rows !== undefined) {
            setTimeout(() => this.renderRows(changes.rows.currentValue));
        }

        if (changes.gapX !== undefined) {
            setTimeout(() => this.renderGap(coerceNumberProperty(changes.gapX.currentValue), this.gapY));
        }

        if (changes.gapY !== undefined) {
            setTimeout(() => this.renderGap(this.gapX, coerceNumberProperty(changes.gapY.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColumns(this.cols);
            this.renderRows(this.rows);
            this.renderGap(this.gapX, this.gapY);
        });
    }

    private renderColumns(cols: string): void {
        this._render.setStyle(this._ref.nativeElement, 'grid-template-columns', cols);
    }

    private renderRows(rows: string): void {
        this._render.setStyle(this._ref.nativeElement, 'grid-template-rows', rows);
    }

    private renderGap(gapX: number, gapY: number): void {
        this._render.setStyle(this._ref.nativeElement, 'column-gap', `${gapX}px`);
        this._render.setStyle(this._ref.nativeElement, 'row-gap', `${gapY}px`);
    }

}

@Directive({
    selector: '[octopus-grid-cell]'
})
export class OctopusGridCell {

    @Input('cellStartX')
    get startX(): any { return this._startX; }
    set startX(_startX: any) { this._startX = coerceNumberProperty(_startX); }
    private _startX: any = 1;

    @Input('cellEndX')
    get endX(): any { return this._endX; }
    set endX(_endX: any) { this._endX = coerceNumberProperty(_endX); }
    private _endX: any = 2;

    @Input('cellStartY')
    get startY(): any { return this._startY; }
    set startY(_startY: any) { this._startY = coerceNumberProperty(_startY); }
    private _startY: any = 1;

    @Input('cellEndY')
    get endY(): any { return this._endY; }
    set endY(_endY: any) { this._endY = coerceNumberProperty(_endY); }
    private _endY: any = 2;

    @HostBinding('class') class: string = 'octopus-grid-cell';

    constructor(
        private _ref: ElementRef,
        private _render: Renderer2
    ) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.startX !== undefined) {
            setTimeout(() => this.renderColumnSpan(coerceNumberProperty(changes.startX.currentValue), this.endX));
        }

        if (changes.endX !== undefined) {
            setTimeout(() => this.renderColumnSpan(this.startX, coerceNumberProperty(changes.endX.currentValue)));
        }

        if (changes.startY !== undefined) {
            setTimeout(() => this.renderRowSpan(coerceNumberProperty(changes.startY.currentValue), this.endY));
        }

        if (changes.endY !== undefined) {
            setTimeout(() => this.renderRowSpan(this.startY, coerceNumberProperty(changes.endY.currentValue)));
        }
    }

    ngOnInit() {
        setTimeout(() => {
            this.renderColumnSpan(this.startX, this.endX);
            this.renderRowSpan(this.startY, this.endY);
        });
    }

    private renderColumnSpan(startX: number, endX: number): void {
        this._render.setStyle(this._ref.nativeElement, 'grid-column', `${startX} / ${endX}`);
    }

    private renderRowSpan(startY: number, endY: number): void {
        this._render.setStyle(this._ref.nativeElement, 'grid-row', `${startY} / ${endY}`);
    }

}