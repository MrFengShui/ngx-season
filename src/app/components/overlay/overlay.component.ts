import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, Directive, ElementRef, Injector, Input, NgZone, Renderer2, ViewContainerRef } from "@angular/core";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

export type NGXSeasonOverlayColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';

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

@Directive()
export abstract class NGXSeasonOverlayDirective<T = any> {

    @Input('olColor')
    set color(color: NGXSeasonColorPalette | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    private _color: NGXSeasonColorPalette = 'default';

    protected overlayRef: OverlayRef | undefined;
    protected portal: ComponentPortal<T> | undefined;

    constructor(
        protected _element: ElementRef,
        protected _injector: Injector,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone,
        protected _overlay: Overlay
    ) {}

}
