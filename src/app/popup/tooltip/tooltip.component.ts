import { coerceNumberProperty } from "@angular/cdk/coercion";
import { ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { Component, ElementRef, HostBinding, HostListener, Inject, InjectionToken, Injector, Input, OnInit, ViewContainerRef } from "@angular/core";
import { interval, Subscription } from "rxjs";
import { ColorPalette } from "src/app/global/enum.utils";

import { OctopusPopup } from "../popup.service";

export const OCTOPUS_TOOLTIP_DATA: InjectionToken<string> = new InjectionToken('OctopusTooltipData');

type TooltipPosition = 'above' | 'below' | 'left' | 'right' | 'auto';

@Component({
    selector: 'octopus-tooltip-container',
    template: `<div class="octopus-tooltip-container-wrapper">{{data}}</div>`
})
export class OctopusTooltipContainer implements OnInit {

    @HostBinding('class') class: string = 'octopus-tooltip-container';

    data!: string;

    constructor(
        @Inject(OCTOPUS_TOOLTIP_DATA)
        private _data: string
    ) { }

    ngOnInit() {
        this.data = this._data;
    }

}

@Component({
    selector: '[octopus-tooltip]',
    template: `<ng-content></ng-content>`
})
export class OctopusTooltip {

    @Input('tooltipColor') color: ColorPalette = 'base';
    @Input('tooltipPosition') position: TooltipPosition = 'auto';
    @Input('tooltipText') text: string = '';
    @Input('showDelay') showDelay: number | string = 0;
    @Input('hideDelay') hideDelay: number | string = 0;

    @HostBinding('class') class: string = 'octopus-tooltip';

    @HostListener('mouseenter')
    private listenHostEnter(): void {
        let positions: ConnectedPosition[] = [];
        let offset: number = 8;

        switch (this.position) {
            case 'auto':
                positions = [
                    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: 0 - offset },
                    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: offset },
                    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: 0 - offset, offsetY: 0 },
                    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset, offsetY: 0 }
                ];
                break;
            case 'above':
                positions = [{ originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetX: 0, offsetY: 0 - offset }];
                break;
            case 'below':
                positions = [{ originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetX: 0, offsetY: offset }];
                break;
            case 'left':
                positions = [{ originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: 0 - offset, offsetY: 0 }];
                break;
            case 'right':
                positions = [{ originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset, offsetY: 0 }];
                break;
        }

        let thread = setTimeout(() => {
            clearTimeout(thread);
            this.show({
                panelClass: ['octopus-tooltip-overlay', `octopus-${this.color}-tooltip-overlay`],
                positionStrategy: this._popup.flexiblePosition(this._ref.nativeElement, positions),
                scrollStrategy: this._popup.selectScroll('close')
            });
        }, coerceNumberProperty(this.showDelay));
    }

    @HostListener('mouseleave')
    private listenHostLeave(): void {
        let thread = setTimeout(() => {
            clearTimeout(thread);
            this.hide();
        }, coerceNumberProperty(this.hideDelay));
    }

    private subscription!: Subscription;
    private ref!: OverlayRef;

    constructor(
        private _ref: ElementRef,
        private _injector: Injector,
        private _vcr: ViewContainerRef,
        private _popup: OctopusPopup
    ) { }

    show(config?: OverlayConfig): void {
        this.ref = this._popup.create(config);
        this.ref.attach(new ComponentPortal(OctopusTooltipContainer, this._vcr, Injector.create({
            parent: this._injector,
            providers: [
                { provide: OCTOPUS_TOOLTIP_DATA, useValue: this.text }
            ]
        })));
        this.subscription = interval(250).subscribe(() => this.ref.updatePosition());
    }

    hide(): void {
        if (this.ref.hasAttached()) {
            this.ref.detach();
            this.ref.dispose();
            this.subscription.unsubscribe();
        }
    }

}