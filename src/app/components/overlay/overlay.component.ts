import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { AfterViewInit, Component, Directive, ElementRef, Injector, Input, NgZone, OnChanges, Renderer2, SimpleChanges, ViewContainerRef } from "@angular/core";

export type NGXSeasonOverlayColor = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'failure' | 'info';

@Component({
    selector: '',
    template: ''
})
export abstract class NGXSeasonOverlayComponent<T = any> {

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

    protected abstract create(): void;

    protected abstract dispose(): void;

}

@Directive()
export abstract class NGXSeasonOverlayDirective {
    
    @Input('olColor')
    set color(color: NGXSeasonOverlayColor | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonOverlayColor {
        return this._color;
    }

    private _color: NGXSeasonOverlayColor = 'default';

    protected overlayRef: OverlayRef | undefined;
    protected portal: ComponentPortal<any> | undefined;

    constructor(
        protected _element: ElementRef,
        protected _injector: Injector,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone,
        protected _overlay: Overlay
    ) {}

}