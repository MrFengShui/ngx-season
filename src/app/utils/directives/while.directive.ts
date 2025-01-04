import { coerceNumberProperty } from "@angular/cdk/coercion";
import { AfterViewInit, Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[ngx-sui-While]'
})
export class NGXSeasonWhileDirective implements AfterViewInit {

    @Input({ alias: 'ngx-sui-While' })
    set count(count: number | string | undefined | null) {
        for (let i = 0; i < coerceNumberProperty(count); i++) {
            this._vcr.createEmbeddedView(this._ref, { index: i });
        }
    }

    constructor(
        protected _ref: TemplateRef<unknown>,
        protected _vcr: ViewContainerRef
    ) {}

    ngAfterViewInit(): void {

    }

}
