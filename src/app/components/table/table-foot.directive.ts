import { AfterViewInit, Directive, Input, OnChanges, SimpleChanges } from "@angular/core";

import { NGXSeasonTableObjectType } from "./table.component";
import { NGXSeasonBaseTableCellDirective } from './table.directive';
import { NGXSeasonBaseTableRowDirective } from './table.directive';
import { NGXSeasonBaseTableRowDefDirective } from './table.directive';

@Directive({
    selector: '[ngx-sui-TFootRowDef]'
})
export class NGXSeasonTFootRowDefDirective extends NGXSeasonBaseTableRowDefDirective implements OnChanges, AfterViewInit {

    @Input({ alias: 'ngx-sui-TFootRowDefValues' })
    set values(values: NGXSeasonTableObjectType | undefined | null) {
        this._values = values || undefined;
    }

    get values(): NGXSeasonTableObjectType | undefined {
        return this._values;
    }

    private _values: NGXSeasonTableObjectType | undefined;

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'values') this.create(changes[name].currentValue as NGXSeasonTableObjectType);
        }
    }

    ngAfterViewInit(): void {
        this.create(this.values);
    }

    protected override create(object: NGXSeasonTableObjectType | undefined): void {
        this._vcr.clear();

        if (object) this._vcr.createEmbeddedView(this._ref, { $implicit: object });
    }

}

@Directive({
    selector: '[ngx-sui-TFootRow]'
})
export class NGXSeasonTFootRowDirective extends NGXSeasonBaseTableRowDirective implements AfterViewInit {

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'table-footer-row');
    }

}

@Directive({
    selector: '[ngx-sui-TFootCell]'
})
export class NGXSeasonTFootCellDirective extends NGXSeasonBaseTableCellDirective {

    override ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'table-footer-cell');

        super.ngAfterViewInit();
    }

}
