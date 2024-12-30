import { AfterViewInit, Component, ElementRef, InjectionToken, Input, OnChanges, Renderer2, SimpleChanges } from "@angular/core";
import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

export const NGX_SEASON_NAVLIST_TOKEN: InjectionToken<NGXSeasonNavlistComponent> = new InjectionToken('NGX_SEASON_NAVLIST_TOKEN');

let count: number = 0;

@Component({
    selector: 'ngx-sui-navlist',
    template: `<ng-content select="ng-container, [ngx-sui-NavListItem], ngx-sui-navlist-section"></ng-content>`,
    providers: [{ provide: NGX_SEASON_NAVLIST_TOKEN, useExisting: NGXSeasonNavlistComponent }]
})
export class NGXSeasonNavlistComponent implements OnChanges, AfterViewInit {

    @Input({ alias: 'nlColor' })
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color || 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    private _color: NGXSeasonColorPalette = 'default';

    readonly id: string = `ngx-sui-navlist-id-${count++}`;

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeNavlistColor(changes[name].currentValue as NGXSeasonColorPalette);
        }
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'nav-list');

        this.changeNavlistColor(this.color);
    }

    protected changeNavlistColor(color: NGXSeasonColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-navlist-color', color);
    }

}


