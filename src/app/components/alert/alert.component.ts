import { AfterViewInit, Component, ElementRef, Inject, InjectionToken, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

import { NGXSeasonIconName } from "../icon/icon.component";

import { NGXSeasonAlertColorPalette } from "src/app/utils/_palette.utils";

export const NGX_SEASON_ALERT_ICON_MAP_TOKEN: InjectionToken<NGXSeasonAlertIconMap> = new InjectionToken('NGX_SEASON_ALERT_ICON_MAP_TOKEN');

export type NGXSeasonAlertStyle = 'flat' | 'outline' | 'solid';
export type NGXSeasonAlertIconMap = { success: NGXSeasonIconName, warning: NGXSeasonIconName, failure: NGXSeasonIconName, info: NGXSeasonIconName, help: NGXSeasonIconName };

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonAlertComponent implements OnChanges, OnDestroy, AfterViewInit {

    @Input('alertColor')
    set color(color: NGXSeasonAlertColorPalette | null) {
        this._color = color ? color : 'help';
    }

    get color(): NGXSeasonAlertColorPalette {
        return this._color;
    }

    private _color: NGXSeasonAlertColorPalette = 'help';

    protected iconShape$: Subject<NGXSeasonIconName> = new BehaviorSubject<NGXSeasonIconName>('help-standard');

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_ALERT_ICON_MAP_TOKEN)
        protected _iconMap: NGXSeasonAlertIconMap
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        for (const name in changes) {
            if (name === 'color') this.changeAlertColor(changes[name].currentValue as NGXSeasonAlertColorPalette);
        }
    }

    ngOnDestroy(): void {
        this.iconShape$.complete();
    }

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'alert');

        this.changeAlertColor(this.color);
    }

    protected changeAlertColor(color: NGXSeasonAlertColorPalette): void {
        this._renderer.setAttribute(this._element.nativeElement, 'data-alert-color', color);

        this.iconShape$.next(this._iconMap[color]);
    }

}
