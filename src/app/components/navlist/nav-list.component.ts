import { AfterViewInit, Component, ElementRef, InjectionToken, Renderer2 } from "@angular/core";

export const NGX_SEASON_NAVLIST_TOKEN: InjectionToken<NGXSeasonNavlistComponent> = new InjectionToken('NGX_SEASON_NAVLIST_TOKEN');

let count: number = 0;

@Component({
    selector: 'ngx-sui-navlist',
    template: `<ng-content select="ng-container, [ngx-sui-NavListItem], ngx-sui-navlist-section"></ng-content>`,
    providers: [{ provide: NGX_SEASON_NAVLIST_TOKEN, useExisting: NGXSeasonNavlistComponent }]
})
export class NGXSeasonNavlistComponent implements AfterViewInit {

    id: string = `ngx-sui-navlist-id-${count++}`;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'nav-list');
    }

}


