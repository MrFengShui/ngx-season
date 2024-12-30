import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, ElementRef, Injector, Input, NgZone, Renderer2, ViewContainerRef } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonOverlayComponent<T = any> {

    @Input('olColor')
    set color(color: NGXSeasonColorPalette | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    private _color: NGXSeasonColorPalette = 'default';

    protected overlayRef: OverlayRef | undefined;
    protected overlayPortal: ComponentPortal<T> | undefined;

    constructor(
        protected _element: ElementRef,
        protected _injector: Injector,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone,
        protected _overlay: Overlay
    ) {}

}

