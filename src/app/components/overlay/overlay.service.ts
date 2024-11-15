import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Injectable, Injector, NgZone, ViewContainerRef } from "@angular/core";

@Injectable()
export abstract class NGXSeasonOverlayService<T = any> {

    protected overlayRef: OverlayRef | undefined;
    protected portal: ComponentPortal<T> | undefined;

    constructor(
        protected _injector: Injector,
        protected _ngZone: NgZone,
        protected _overlay: Overlay
    ) { }

}
