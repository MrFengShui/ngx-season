import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector } from "@angular/core";
import { Observable, Subject } from 'rxjs';

import { OctopusDialogBaseConfig, OctopusDialogPosition, OctopusDialogSizeConfig } from './dialog.utils';

export const OCTOPUS_DIALOG_DATA: InjectionToken<any> = new InjectionToken('OctopusDialogData');

@Injectable()
export class OctopusDialog<T = unknown, R = any> {

    private open$!: Subject<R>;
    private close$!: Subject<R>;

    private ref!: OverlayRef;
    private config!: OverlayConfig;

    constructor(
        private _inject: Injector,
        private _overlay: Overlay
    ) { }

    create(config: OctopusDialogBaseConfig = { hasMask: true, maskClass: ['octopus-mask'], baseClass: ['octopus-shadow-z2', 'octopus-dialog'] }, color: string = 'primary'): OctopusDialog<T, R> {
        this.config = {
            ...this.config,
            hasBackdrop: config.hasMask,
            backdropClass: [...config.maskClass],
            panelClass: [...config.baseClass, `octopus-${color}-dialog`]
        };
        return this;
    }

    resize(config: OctopusDialogSizeConfig = { width: '75vw', height: '75vh', minWidth: 0, minHeight: 0, maxWidth: '100vw', maxHeight: '100vh' }): OctopusDialog<T, R> {
        this.config = {
            ...this.config,
            width: config.width,
            height: config.height,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight
        }
        return this;
    }

    locate(position: OctopusDialogPosition = OctopusDialogPosition.CENTER_CENTER): OctopusDialog<T, R> {
        const value: string = '0px';
        let strategy: GlobalPositionStrategy = this._overlay.position().global();

        switch (position) {
            case OctopusDialogPosition.TOP_LEFT:
                strategy.top(value).left(value);
                break;
            case OctopusDialogPosition.TOP_RIGHT:
                strategy.top(value).right(value);
                break;
            case OctopusDialogPosition.BOTTOM_LEFT:
                strategy.bottom(value).left(value);
                break;
            case OctopusDialogPosition.BOTTOM_RIGHT:
                strategy.bottom(value).right(value);
                break;
            case OctopusDialogPosition.CENTER_CENTER:
                strategy.centerHorizontally().centerVertically();
                break;
        }

        this.config = {
            ...this.config,
            positionStrategy: strategy
        };
        return this;
    }

    scroll(flag: string = 'block'): OctopusDialog<T, R> {
        let strategy!: ScrollStrategy;

        switch (flag) {
            case 'block':
                strategy = this._overlay.scrollStrategies.block();
                break;
            case 'close':
                strategy = this._overlay.scrollStrategies.close();
                break;
            case 'noop':
                strategy = this._overlay.scrollStrategies.noop();
                break;
            case 'reposition':
                strategy = this._overlay.scrollStrategies.reposition();
                break;
        }

        this.config = {
            ...this.config,
            scrollStrategy: strategy
        };
        return this;
    }

    open(component: ComponentType<T>, locked: boolean = false, data?: R): void {
        this.open$ = new Subject();
        this.close$ = new Subject();

        setTimeout(() => {
            if (this.ref === undefined) {
                this.ref = this._overlay.create(this.config);

                if (data === undefined) {
                    this.ref.attach(new ComponentPortal(component));
                } else {
                    this.ref.attach(new ComponentPortal(component, undefined, this.generate(data)));
                }

                this.ref.updatePosition();

                if (locked) {
                    this.ref.backdropClick().subscribe(event => this.close());
                }

                this.open$.next(data);
                this.open$.complete();
            }
        });
    }

    opened(): Observable<R> {
        return this.open$.asObservable();
    }

    close(result?: R): void {
        setTimeout(() => {
            if (this.ref.hasAttached()) {
                this.ref.detach();
                this.ref.detachBackdrop();
                this.ref.dispose();
            }

            this.close$.next(result);
            this.close$.complete();
        });
    }

    closed(): Observable<R> {
        return this.close$.asObservable();
    }

    private generate(data: R): Injector {
        return Injector.create({
            parent: this._inject,
            providers: [
                { provide: OCTOPUS_DIALOG_DATA, useValue: data }
            ]
        });
    }

}


