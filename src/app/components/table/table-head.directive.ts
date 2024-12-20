import { Directive, AfterViewInit, Input, TemplateRef, ViewContainerRef, ElementRef, Renderer2, OnChanges, SimpleChanges } from "@angular/core";

import { NGXSeasonTableColumnSize, NGXSeasonTableObjectType } from "./table.component";
import { NGXSeasonBaseTableCellDirective } from './table.directive';
import { NGXSeasonBaseTableRowDirective } from './table.directive';
import { NGXSeasonBaseTableRowDefDirective } from './table.directive';

@Directive({
    selector: '[ngx-sui-THeadRowDef]'
})
export class NGXSeasonTHeadRowDefDirective extends NGXSeasonBaseTableRowDefDirective implements OnChanges, AfterViewInit {

    @Input({ alias: 'ngx-sui-THeadRowDefNames' })
    set names(names: NGXSeasonTableObjectType | undefined | null) {
        this._names = names || undefined;
    }

    get names(): NGXSeasonTableObjectType | undefined {
        return this._names;
    }

    private _names: NGXSeasonTableObjectType | undefined;

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'names') this.create(changes[name].currentValue as NGXSeasonTableObjectType);
        }
    }

    ngAfterViewInit(): void {
        this.create(this.names);
    }

    protected override create(object: NGXSeasonTableObjectType | undefined): void {
        this._vcr.clear();

        if (object) this._vcr.createEmbeddedView(this._ref, { $implicit: object });
    }

}

@Directive({
    selector: '[ngx-sui-THeadRow]'
})
export class NGXSeasonTHeadRowDirective extends NGXSeasonBaseTableRowDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'table-header-row');
    }

}

@Directive({
    selector: '[ngx-sui-THeadCell]'
})
export class NGXSeasonTHeadCellDirective extends NGXSeasonBaseTableCellDirective {

    @Input({ alias: 'tbhColSize' })
    set colSize(colSize: NGXSeasonTableColumnSize | undefined | null) {
        this._colSize = colSize || 'stretch';
    }

    get colSize(): NGXSeasonTableColumnSize {
        return this._colSize;
    }

    private _colSize: NGXSeasonTableColumnSize = 'stretch';

    override ngOnChanges(changes: SimpleChanges): void {
        super.ngOnChanges(changes);

        for (const name in changes) {
            if (name === 'colSize') this.changeTableColumnSize(changes[name].currentValue as NGXSeasonTableColumnSize);
        }
    }

    override ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'table-header-cell');

        super.ngAfterViewInit();

        this.changeTableColumnSize(this.colSize);
    }

    protected changeTableColumnSize(colSize: NGXSeasonTableColumnSize): void {
        const element: HTMLElement = this._element.nativeElement;

        if (colSize === 'shrink') this._renderer.setStyle(element, 'width', 0);

        if (colSize === 'stretch') this._renderer.setStyle(element, 'width', 'auto');
    }

}
