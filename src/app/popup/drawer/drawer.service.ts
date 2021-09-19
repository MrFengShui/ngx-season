import { Direction, Directionality } from "@angular/cdk/bidi";
import { OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal, ComponentType } from "@angular/cdk/portal";
import { Injectable, InjectionToken, Injector, Renderer2 } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";

import { Position } from "src/app/global/enum.utils";

import { OctopusPopup } from "../popup.service";

export class OctopusDrawerConfig<D = any> {

    panelClass?: string | string[];
    hasBackdrop?: boolean;
    backdropClass?: string | string[];
    width?: number | string;
    height?: number | string;
    minWidth?: number | string;
    minHeight?: number | string;
    maxWidth?: number | string;
    maxHeight?: number | string;
    direction?: Direction | Directionality;
    disposeOnNavigation?: boolean;
    data?: D;
    duration?: number;
    position?: 'top' | 'bottom' | 'left' | 'right';
    scrollable?: boolean;

}

export const OCTOPUS_DRAWER_DATA: InjectionToken<any> = new InjectionToken('OctopusDrawerData');

@Injectable()
export class OctopusDrawer<D = any> {

    private show$!: Subject<void>;
    private hide$!: Subject<any>;
    private subscription!: Subscription;
    private ref: OverlayRef | undefined;

    private duration: number = 250;

    constructor(
        private _injector: Injector,
        private _popup: OctopusPopup
    ) { }

    updateDuration(duration: number): void {
        this.duration = duration;
    }

    show(component: ComponentType<unknown>, config?: OctopusDrawerConfig<D>): void {
        this.show$ = new Subject();
        this.hide$ = new Subject();

        if (this.ref === undefined) {
            if (config?.duration !== undefined) {
                this.updateDuration(config.duration);
            }

            this.ref = this._popup.create(this.formatConfig(config));
            this.ref.overlayElement.style.animationDuration = `${this.duration}ms`;
            this.ref.removePanelClass('hide');
            this.ref.addPanelClass(['octopus-drawer-overlay', `octopus-drawer-${config?.position}-overlay`, 'show']);
            this.ref.attach(new ComponentPortal(component, undefined, Injector.create({
                parent: this._injector,
                providers: [
                    { provide: OCTOPUS_DRAWER_DATA, useValue: config?.data }
                ]
            })));
            this.ref.updatePosition();
            this.subscription = this.ref.backdropClick().subscribe(event => this.hide());
        }
    }

    hide(value?: any): void {
        if (this.ref !== undefined) {
            this.ref.removePanelClass('show');
            this.ref.addPanelClass('hide');
            this.subscription.unsubscribe();
        }

        setTimeout(() => {
            if (this.ref !== undefined && this.ref.hasAttached()) {
                this.hide$.next(value);
                this.hide$.complete();
                this.ref.detach();
                this.ref.detachBackdrop();
                this.ref.dispose();
                this.ref = undefined;
            }
        }, this.duration);
    }

    afterShow(): Observable<void> {
        setTimeout(() => {
            this.show$.next(undefined);
            this.show$.complete();
        });
        return this.show$.asObservable();
    }

    afterHide(): Observable<any> {
        return this.hide$.asObservable();
    }

    private formatConfig(config?: OctopusDrawerConfig<D>): OverlayConfig {
        config = {
            hasBackdrop: true,
            maxWidth: '100%',
            maxHeight: '100%',
            position: 'bottom',
            scrollable: true,
            ...config
        };
        return {
            panelClass: config?.panelClass,
            hasBackdrop: config?.hasBackdrop,
            backdropClass: config?.backdropClass,
            width: config?.width,
            height: config?.height,
            minWidth: config?.minWidth,
            minHeight: config?.minHeight,
            maxWidth: config?.maxWidth,
            maxHeight: config?.maxHeight,
            direction: config?.direction,
            disposeOnNavigation: config?.disposeOnNavigation,
            positionStrategy: this._popup.globalPosition(this.matchPosition(config?.position as string)),
            scrollStrategy: this._popup.selectScroll(config?.scrollable ? 'block' : 'reposition')
        };
    }

    private matchPosition(position: string): Position {
        switch (position) {
            case 'bottom': return 'bottom center';
            case 'top': return 'top center';
            case 'left': return 'middle left';
            case 'right': return 'middle right';
            default: return 'bottom center';
        }
    }

}