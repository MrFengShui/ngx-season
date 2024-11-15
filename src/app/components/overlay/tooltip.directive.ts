import { coerceNumberProperty } from "@angular/cdk/coercion";
import { ConnectedPosition, FlexibleConnectedPositionStrategy, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { AfterViewInit, Component, Directive, ElementRef, HostListener, Inject, InjectionToken, Injector, Input, Renderer2, TemplateRef, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";

import { NGXSeasonOverlayDirective } from "./overlay.component";

import { NGXSeasonColorPalette } from "src/app/utils/_palette.utils";

export type NGXSeasonTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

const NGX_SEASON_TOOLTIP_MESSAGE_TOKEN: InjectionToken<string> = new InjectionToken('NGX_SEASON_TOOLTIP_MESSAGE_TOKEN');

@Directive({
    selector: '[ngx-sui-Tooltip]',
    exportAs: 'NGXSeasonTooltipDirective'
})
export class NGXSeasonTooltipDirective extends NGXSeasonOverlayDirective {

    @Input('ttHideDelay')
    set hideDelay(hideDelay: number | string | null) {
        this._hideDelay = hideDelay ? coerceNumberProperty(hideDelay) : 0;
    }

    get hideDelay(): number {
        return this._hideDelay;
    }

    @Input('ttMsg')
    set message(message: string | undefined | null) {
        this._message = message ? message : undefined;
    }

    get message(): string | undefined {
        return this._message;
    }

    @Input('ttPos')
    set position(position: NGXSeasonTooltipPosition | null) {
        this._position = position ? position : 'top';
    }

    get position(): NGXSeasonTooltipPosition {
        return this._position;
    }

    @Input('ttShowDelay')
    set showDelay(showDelay: number | string | null) {
        this._showDelay = showDelay ? coerceNumberProperty(showDelay) : 0;
    }

    get showDelay(): number {
        return this._showDelay;
    }

    private _hideDelay: number = 0;
    private _message: string | undefined;
    private _position: NGXSeasonTooltipPosition = 'top';
    private _showDelay: number = 0;

    @ViewChild('template', { read: TemplateRef<any>, static: true })
    protected template: TemplateRef<any> | undefined;

    @HostListener('mouseover', ['$event'])
    protected handleHostHoverEvent(): void {
        if (this.message && this.message.trim().length > 0) {
            let task = setTimeout(() => {
                clearTimeout(task);

                this.display();
                this.listenTooltipPositionChange(this.position);
            }, this.showDelay);
        }
    }

    @HostListener('mouseleave', ['$event'])
    protected handleHostLeaveEvent(): void {
        let task = setTimeout(() => {
            clearTimeout(task);

            this.dispose();
        }, this.hideDelay);
    }

    private position$: Subscription = Subscription.EMPTY;

    display(): void {
        if (!this.overlayRef || !this.overlayRef?.hasAttached()) {
            this.overlayRef = this.createOverlayRef(this._element.nativeElement, this.color, this.position);
            this.portal = this.createComponentPortal();
            this.overlayRef.attach(this.portal);
        }
    }

    dispose(): void {
        if (this.overlayRef) {
            this.overlayRef.detach();
            this.overlayRef.dispose();

            this.overlayRef = undefined;
        }
    }

    protected createOverlayRef(element: HTMLElement, color: NGXSeasonColorPalette, position: NGXSeasonTooltipPosition): OverlayRef {
        const strategy: FlexibleConnectedPositionStrategy = this._overlay.position()
            .flexibleConnectedTo(element)
            .withPositions(this.createConnectedPositions(position))
            .withFlexibleDimensions(false)
            .withPush(false);
        return this._overlay.create({
            panelClass: ['tooltip', `tooltip-${color}`, `tooltip-${position}`], positionStrategy: strategy,
            minWidth: 'var(--size-pixel-72)', maxWidth: '64vw', maxHeight: '36vw'
        });
    }

    protected createComponentPortal(): ComponentPortal<NGXSeasonTooltipContainerComponent> {
        const injector: Injector = Injector.create({
            providers: [{ provide: NGX_SEASON_TOOLTIP_MESSAGE_TOKEN, useValue: this.message }],
            parent: this._injector
        });
        return new ComponentPortal(NGXSeasonTooltipContainerComponent, this._vcr, injector);
    }

    protected createConnectedPositions(position: NGXSeasonTooltipPosition): ConnectedPosition[] {
        const positions: ConnectedPosition[] = [];

        if (position === 'top') {
            positions.push({ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' });
            positions.push({ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' });
        }

        if (position === 'bottom') {
            positions.push({ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top' });
            positions.push({ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom' });
        }

        if (position === 'left') {
            positions.push({ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' });
            positions.push({ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' });
        }

        if (position === 'right') {
            positions.push({ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center' });
            positions.push({ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center' });
        }

        return positions;
    }

    private listenTooltipPositionChange(position: NGXSeasonTooltipPosition): void {
        this._ngZone.runOutsideAngular(() => {
            const strategy = this.overlayRef?.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
            this.position$ = strategy.positionChanges.subscribe({
                next: change =>
                    this._ngZone.run(() => {
                        const sourceOrigin = (position === 'left' || position === 'right') ? change.connectionPair.originX : change.connectionPair.originY;
                        const sourceOverlay = (position === 'left' || position === 'right') ? change.connectionPair.overlayX : change.connectionPair.overlayY;
                        const targetOrigin = (position === 'left' || position === 'right') ? strategy.positions[0].originX : strategy.positions[0].originY;
                        const targetOverlay = (position === 'left' || position === 'right') ? strategy.positions[0].overlayX : strategy.positions[0].overlayY;

                        if (position === 'top' && sourceOrigin !== targetOrigin && sourceOverlay !== targetOverlay) {
                            this.overlayRef?.addPanelClass('tooltip-bottom');
                            this.overlayRef?.removePanelClass('tooltip-top');
                        }

                        if (position === 'bottom' && sourceOrigin !== targetOrigin && sourceOverlay !== targetOverlay) {
                            this.overlayRef?.addPanelClass('tooltip-top');
                            this.overlayRef?.removePanelClass('tooltip-bottom');
                        }

                        if (position === 'left' && sourceOrigin !== targetOrigin && sourceOverlay !== targetOverlay) {
                            this.overlayRef?.addPanelClass('tooltip-right');
                            this.overlayRef?.removePanelClass('tooltip-left');
                        }

                        if (position === 'right' && sourceOrigin !== targetOrigin && sourceOverlay !== targetOverlay) {
                            this.overlayRef?.addPanelClass('tooltip-left');
                            this.overlayRef?.removePanelClass('tooltip-right');
                        }
                    }),
                complete: () => this.position$.unsubscribe()
            });
        });
    }

}

@Component({
    selector: 'ngx-sui-tooltip-container',
    template: `
        <span class="tooltip-message">{{ _message }}</span>
        <span class="tooltip-triangle"></span>
    `
})
export class NGXSeasonTooltipContainerComponent implements AfterViewInit {

    constructor(
        protected _element: ElementRef,
        protected _renderer: Renderer2,

        @Inject(NGX_SEASON_TOOLTIP_MESSAGE_TOKEN)
        protected _message: string
    ) {}

    ngAfterViewInit(): void {
        this._renderer.addClass(this._element.nativeElement, 'tooltip-container');
    }

}
