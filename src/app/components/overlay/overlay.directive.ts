import { OverlayRef, Overlay, FlexibleConnectedPositionStrategy, ConnectionPositionPair } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { Directive, Input, ElementRef, Injector, Renderer2, ViewContainerRef, NgZone, TemplateRef } from "@angular/core";
import { debounceTime, map, Subscription } from "rxjs";

import { NGXSeasonColorPalette } from "src/app/utils/palette.utils";

export type NGXSeasonOverlayPosition = 'auto' | 'top' | 'bottom' | 'left' | 'right';

@Directive()
export abstract class NGXSeasonOverlayDirective<T = unknown, C = unknown> {

    @Input('olColor')
    set color(color: NGXSeasonColorPalette | undefined | null) {
        this._color = color ? color : 'default';
    }

    get color(): NGXSeasonColorPalette {
        return this._color;
    }

    @Input('olPos')
    set position(position: NGXSeasonOverlayPosition | undefined | null) {
        this._position = position || 'auto';
    }

    get position(): NGXSeasonOverlayPosition {
        return this._position;
    }

    @Input('olTemp')
    set template(template: TemplateRef<any> | undefined | null) {
        this._template = template || undefined;
    }

    get template(): TemplateRef<any> | undefined {
        return this._template;
    }

    @Input('olComp')
    set component(component: ComponentType<any> | undefined | null) {
        this._component = component || undefined;
    }

    get component(): ComponentType<any> | undefined {
        return this._component;
    }

    private _color: NGXSeasonColorPalette = 'default';
    private _component: ComponentType<T> | undefined;
    private _position: NGXSeasonOverlayPosition = 'auto';
    private _template: TemplateRef<C> | undefined;

    protected overlayRef: OverlayRef | undefined;
    protected portal: ComponentPortal<T> | undefined;
    protected positionStrategy: FlexibleConnectedPositionStrategy | undefined;

    private offset$: Subscription = Subscription.EMPTY;

    constructor(
        protected _element: ElementRef,
        protected _injector: Injector,
        protected _renderer: Renderer2,
        protected _vcr: ViewContainerRef,
        protected _ngZone: NgZone,
        protected _overlay: Overlay
    ) { }

    protected changeOverlayColor(color: NGXSeasonColorPalette, element: HTMLElement): void {
        this._renderer.setAttribute(element, 'data-overlay-color', color);
    }

    protected abstract display(templateOrComponent: TemplateRef<C> | undefined, element: HTMLElement, position: NGXSeasonOverlayPosition): void;
    protected abstract display(templateOrComponent: ComponentType<T> | undefined, element: HTMLElement, position: NGXSeasonOverlayPosition): void;

    protected abstract display(templateOrComponent: TemplateRef<C> | ComponentType<T> | undefined, element: HTMLElement, position: NGXSeasonOverlayPosition): void;

    protected abstract dismiss(): void;

    protected listenOverlayOffsetChange(positionStrategy: FlexibleConnectedPositionStrategy): void {
        this._ngZone.runOutsideAngular(() =>
            this.offset$ = positionStrategy.positionChanges.pipe(map(change => change.connectionPair), debounceTime(10))
                .subscribe(pair =>
                    this._ngZone.run(() => {
                        const values: { x: number, y: number } = this.createOverlayConnectedOffset(pair);
                        positionStrategy.withDefaultOffsetX(values.x);
                        positionStrategy.withDefaultOffsetY(values.y);
                        positionStrategy.reapplyLastPosition();
                        this.offset$.unsubscribe();
                    })));
    }

    protected createOverlayConnectedPosition(position: NGXSeasonOverlayPosition): ConnectionPositionPair[] {
        const positions: ConnectionPositionPair[] = [];

        if (position === 'top') {
            positions.push({ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' });
            positions.push({ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' });
            positions.push({ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' });

            positions.push({ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' });
            positions.push({ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' });
            positions.push({ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' });
        } else if (position === 'bottom') {
            positions.push({ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' });
            positions.push({ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' });
            positions.push({ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' });

            positions.push({ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' });
            positions.push({ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' });
            positions.push({ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' });
        } else if (position === 'left') {
            positions.push({ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' });
            positions.push({ originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' });
            positions.push({ originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' });

            positions.push({ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' });
            positions.push({ originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' });
            positions.push({ originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' });
        } else if (position === 'right') {
            positions.push({ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' });
            positions.push({ originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' });
            positions.push({ originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' });

            positions.push({ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' });
            positions.push({ originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' });
            positions.push({ originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' });
        } else {
            positions.push({ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' });
            positions.push({ originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' });
            positions.push({ originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom' });

            positions.push({ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' });
            positions.push({ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' });
            positions.push({ originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' });

            positions.push({ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' });
            positions.push({ originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' });
            positions.push({ originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom' });

            positions.push({ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' });
            positions.push({ originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' });
            positions.push({ originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom' });
        }

        return positions
    }

    protected createOverlayConnectedOffset(pair: ConnectionPositionPair): { x: number, y: number } {
        let offset: { x: number, y: number } = { x: 0, y: 0 };

        if (pair.originY === 'top' && pair.overlayY === 'bottom') offset = { ...offset, x: 0, y: -8 };

        if (pair.originY === 'bottom' && pair.overlayY === 'top') offset = { ...offset, x: 0, y: 8 };

        if (pair.originX === 'start' && pair.overlayX === 'end') offset = { ...offset, x: -8, y: 0 };

        if (pair.originX === 'end' && pair.overlayX === 'start') offset = { ...offset, x: 8, y: 0 };

        return offset;
    }

}
