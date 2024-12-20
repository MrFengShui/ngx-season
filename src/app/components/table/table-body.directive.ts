import { AfterViewInit, Directive, ElementRef, Inject, NgZone, OnDestroy, Renderer2, TemplateRef, ViewContainerRef } from "@angular/core";
import { debounceTime, Subscription } from "rxjs";

import { NGX_SEASON_TABLE_TOKEN, NGXSeasonTableComponent, NGXSeasonTableObjectType } from "./table.component";
import { NGXSeasonBaseTableCellDirective, NGXSeasonBaseTableRowDefDirective, NGXSeasonBaseTableRowDirective } from './table.directive';

@Directive({
    selector: '[ngx-sui-TBodyRowDef]'
})
export class NGXSeasonTBodyRowDefDirective extends NGXSeasonBaseTableRowDefDirective implements OnDestroy, AfterViewInit {

    private dataSrc$: Subscription = Subscription.EMPTY;

    constructor(
        protected override _ref: TemplateRef<NGXSeasonTableObjectType>,
        protected override _vcr: ViewContainerRef,
        protected _ngZone: NgZone,

        @Inject(NGX_SEASON_TABLE_TOKEN)
        protected _table: NGXSeasonTableComponent
    ) {
        super(_ref, _vcr);
    }

    ngOnDestroy(): void {
        this.dataSrc$.unsubscribe();
    }

    ngAfterViewInit(): void {
        this.listenTableDataSourceChange();
    }

    protected override create(object: NGXSeasonTableObjectType | undefined): void {}

    private listenTableDataSourceChange(): void {
        this._ngZone.runOutsideAngular(() => {
            const dataSrc = this._table.dataSrc;

            if (dataSrc) {
                this.dataSrc$ = dataSrc.connect().pipe(debounceTime(100))
                    .subscribe(values => {
                        this._vcr.clear();
                        values.forEach((value, index) =>
                            this._vcr.createEmbeddedView(this._ref, { $implicit: value, index }));
                    });
            }
        });
    }

}

@Directive({
    selector: '[ngx-sui-TBodyRow]'
})
export class NGXSeasonTBodyRowDirective extends NGXSeasonBaseTableRowDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'table-content-row');
    }

}

@Directive({
    selector: '[ngx-sui-TBodyCell]'
})
export class NGXSeasonTBodyCellDirective extends NGXSeasonBaseTableCellDirective {

    override ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'table-content-cell');

        super.ngAfterViewInit();
    }

}
