import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { GlobalPositionStrategy, Overlay, OverlayConfig, OverlayRef } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";
import { ComponentRef, Injectable, Injector } from "@angular/core";
import { AsyncSubject, debounceTime, delay, Observable, Subject, Subscription } from "rxjs";

import { NGXSeasonToastAlertComponent } from "../alert/alert.component";

import { NGXSeasonAlertColorPalette } from "src/app/utils/palette.utils";

import { NGXSeasonOverlayService } from "./overlay.service";

export type NGXSeasonToastPosition = 'top' | 'bottom';

export interface NGXSeasonToastConfig {

    color?: NGXSeasonAlertColorPalette;

    delay?: number;
    duration?: number;

    panelClass?: string | string[];

    width?: string | number;
    minWidth?: string | number;
    maxWidth?: string | number;

    height?: string | number;
    minHeight?: string | number;
    maxHeight?: string | number;

    offsetToMargin?: string;
    position?: NGXSeasonToastPosition;

    showClose?: boolean;

}

@Injectable()
export class NGXSeasonToastService extends NGXSeasonOverlayService<NGXSeasonToastAlertComponent> {

    create(message: string | undefined, config?: NGXSeasonToastConfig): NGXSeasonToastRef {
        const delay: number = config?.delay === undefined ? 250 : config.delay;
        const duration: number = config?.duration === undefined ? 2500 : config.duration;
        const panelClass: string[] = config?.panelClass ? (typeof config.panelClass === 'string' ? [config.panelClass] : config.panelClass) : [];
        const overlayConfig: OverlayConfig = {
            panelClass: [ 'toast', `toast-${config?.position}`, ...panelClass],
            width: config?.width, minWidth: config?.minWidth, maxWidth: config?.maxWidth,
            height: config?.height, minHeight: config?.minHeight, maxHeight: config?.maxHeight
        };
        return new NGXSeasonToastRef(message, delay, duration, coerceBooleanProperty(config?.showClose), config?.color ? config.color : 'help', config?.position ? config.position : 'bottom', config?.offsetToMargin ? config.offsetToMargin : '5vh', this._injector, this._overlay, overlayConfig);
    }

}

type ToastOverlayCache = { overlayRef: OverlayRef, position: NGXSeasonToastPosition };
type ToastOverlayChange = { prevCache?: ToastOverlayCache, currCache: ToastOverlayCache };

let change: ToastOverlayChange | undefined;

export class NGXSeasonToastRef {

    protected overlayRef: OverlayRef | undefined;
    protected portal: ComponentPortal<NGXSeasonToastAlertComponent> | undefined;

    protected opened$: Subject<void> = new AsyncSubject();
    protected closed$: Subject<void> = new AsyncSubject();

    private moveIn$: Subscription = Subscription.EMPTY;
    private moveOut$: Subscription = Subscription.EMPTY;

    constructor(
        protected _message: string | undefined,
        protected _delay: number,
        protected _duration: number,
        protected _showClose: boolean,
        protected _color: NGXSeasonAlertColorPalette,
        protected _position: NGXSeasonToastPosition,
        protected _offset: string,
        protected _injector: Injector,
        protected _overlay: Overlay,
        protected _overlayConfig: OverlayConfig
    ) {
        this.moveIn$ = this.opened().pipe(delay(10), debounceTime(10)).subscribe(() => {
            if (change?.prevCache) {
                this.moveOut(change.prevCache.overlayRef, this._delay, change.prevCache.position);

                let task = setTimeout(() => {
                    clearTimeout(task);

                    this.moveIn(change?.currCache.overlayRef, this._duration, this._delay, change?.currCache.position as NGXSeasonToastPosition);
                }, this._delay);
            } else {
                this.moveIn(change?.currCache.overlayRef, this._duration, this._delay, this._position);
            }
        });
    }

    opened(): Observable<void> {
        return this.opened$.asObservable();
    }

    closed(): Observable<void> {
        return this.closed$.asObservable();
    }

    open(): void {
        this.display(this._message, this._color, this._showClose, this._delay, this._offset, this._position);
    }

    close(): void {
        this.moveOut(this.overlayRef, this._delay, this._position);
    }

    clear(): void {
        change = undefined;

        this.moveIn$.unsubscribe();
        this.moveOut$.unsubscribe();

        this.opened$.complete();
        this.closed$.complete();

        this.overlayRef?.detach();
        this.overlayRef?.dispose();
    }

    private display(message: string | undefined, color: NGXSeasonAlertColorPalette, showClose: boolean, delay: number, offset: string, position: NGXSeasonToastPosition): void {
        const strategy = this.createGlobalPositionStrategy(position, offset);
        const overlayRef = this._overlay.create({ ...this._overlayConfig, positionStrategy: strategy });

        this.overlayRef = overlayRef;
        this.overlayRef.overlayElement.style.setProperty('transition', `margin-${position} ${delay}ms ease-in-out`);

        this.portal = new ComponentPortal(NGXSeasonToastAlertComponent);

        const component: ComponentRef<NGXSeasonToastAlertComponent> = this.overlayRef.attach(this.portal);
        component.setInput('taMsg', message);
        component.setInput('taClosible', showClose);
        component.setInput('alertColor', color);
        component.setInput('taStyle', 'flat');
        component.setInput('taAllowed', true);

        this.moveOut$ = component.instance.overlayExtraEvent.subscribe(() => this.moveOut(overlayRef, delay, position));

        if (change) {
            const prevCache: ToastOverlayCache = { overlayRef: change.currCache.overlayRef, position: change.currCache.position  };
            change = { ...change, prevCache, currCache: { overlayRef, position } };
        } else {
            change = { currCache: { overlayRef, position } };
        }

        this.opened$.next();
        this.opened$.complete();
    }

    private dispose(overlayRef: OverlayRef): void {
        if (this.overlayRef) {
            this.closed$.next();
            this.closed$.complete();

            this.moveOut$.unsubscribe();

            overlayRef.detach();
            overlayRef.dispose();
        }
    }

    private createGlobalPositionStrategy(position: NGXSeasonToastPosition, offset: string): GlobalPositionStrategy {
        let strategy: GlobalPositionStrategy = this._overlay.position().global().centerHorizontally();

        if (position === 'top') strategy = strategy.top(offset);

        if (position === 'bottom') strategy = strategy.bottom(offset);

        return strategy;
    }

    private moveIn(overlayRef: OverlayRef | undefined, duration: number, delay: number, position: NGXSeasonToastPosition): void {
        if (!overlayRef) throw new Error();

        overlayRef.removePanelClass(`toast-${position}`);

        let task = setTimeout(() => {
            clearTimeout(task);

            if (duration > 0) this.moveOut(overlayRef, delay, position);
        }, duration + delay);
    }

    private moveOut(overlayRef: OverlayRef | undefined, duration: number, position: NGXSeasonToastPosition): void {
        if (!overlayRef) throw new Error();

        overlayRef.addPanelClass(`toast-${position}`);

        let task = setTimeout(() => {
            clearTimeout(task);

            this.dispose(overlayRef);
        }, duration);
    }

}
