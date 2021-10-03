import { Direction, Directionality } from '@angular/cdk/bidi';
import { OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from "@angular/core";
import { Observable, Subject, Subscription } from 'rxjs';

import { Position } from 'src/app/global/enum.utils';

import { OctopusPopup } from '../popup.service';

export class OctopusDialogConfig<D = any> {

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
    position?: 'top left' | 'bottom left' | 'top right' | 'bottom right' | 'middle center';
    scrollable?: boolean;

}

export const OCTOPUS_DIALOG_DATA: InjectionToken<any> = new InjectionToken('OctopusDialogData');

@Injectable()
export class OctopusDialog<D = any> {

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

    updateMaximized(maximized: boolean): void {
        if (this.ref !== undefined) {
            if (maximized) {
                this.ref.addPanelClass('maximized');
            } else {
                this.ref.removePanelClass('maximized');
            }
        }
    }

    getOverlayElement(): HTMLElement | undefined {
        return this.ref?.overlayElement;
    }

    show(component: ComponentType<unknown>, config?: OctopusDialogConfig<D>): void {
        this.show$ = new Subject();
        this.hide$ = new Subject();

        if (this.ref === undefined) {
            if (config?.duration !== undefined) {
                this.updateDuration(config.duration);
            }

            this.ref = this._popup.create(this.formatConfig(config));
            this.ref.overlayElement.style.animationDuration = `${this.duration}ms`;
            this.ref.removePanelClass('hide');
            this.ref.addPanelClass(['octopus-dialog', 'octopus-dialog-overlay', `octopus-dialog-${config?.position}-overlay`, 'show']);
            this.ref.attach(new ComponentPortal(component, undefined, Injector.create({
                parent: this._injector,
                providers: [
                    { provide: OCTOPUS_DIALOG_DATA, useValue: config?.data }
                ]
            })));
            this.ref.updatePosition();
            this.subscription = this.ref.backdropClick().subscribe(event => this.hide());
        }
    }

    hide(value?: D): void {
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

    afterOpen(): Observable<void> {
        setTimeout(() => {
            this.show$.next(undefined);
            this.show$.complete();
        });
        return this.show$.asObservable();
    }

    afterHide(): Observable<D> {
        return this.hide$.asObservable();
    }

    private formatConfig(config?: OctopusDialogConfig<D>): OverlayConfig {
        config = {
            hasBackdrop: true,
            maxWidth: '100%',
            maxHeight: '100%',
            position: 'middle center',
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
            positionStrategy: this._popup.globalPosition(config.position as Position),
            scrollStrategy: this._popup.selectScroll(config?.scrollable ? 'reposition' : 'block')
        };
    }

}

