import {animate, AnimationBuilder, AnimationPlayer, style} from "@angular/animations";
import {Injectable, InjectionToken, TemplateRef} from "@angular/core";
import {Dialog, DIALOG_DATA, DialogCloseOptions, DialogConfig, DialogRef} from "@angular/cdk/dialog";
import {ComponentType, Overlay} from "@angular/cdk/overlay";
import {Observable, of} from "rxjs";

export const OCTOPUS_DIALOG_DATA: InjectionToken<any> = DIALOG_DATA;
export const OCTOPUS_DRAWER_DATA: InjectionToken<any> = DIALOG_DATA;

@Injectable()
export class OctopusDialog<T = unknown, D = any, R = any> {

    private dialogRef: DialogRef<R, T> | null = null;
    private dialogCfg: DialogConfig<D, DialogRef<R, T>> = {
        disableClose: true,
        hasBackdrop: true, panelClass: ['octo-overlay', 'octo-dialog'], backdropClass: ['octo-overlay-mask'],
        positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
        minWidth: '0vw', minHeight: '0vh', maxWidth: '100vw', maxHeight: '100vh', width: '80vw', height: '60vh'
    };
    private dialogID: number = 0;
    private tempWidth?: string = '';
    private tempHeight?: string = '';

    constructor(
        private _builder: AnimationBuilder,
        private _dialog: Dialog,
        private _overlay: Overlay
    ) {
    }

    config(config?: DialogConfig<D, DialogRef<R, T>>): OctopusDialog<T> {
        this.dialogCfg = {...this.dialogCfg, ...config};
        return this;
    }

    open(componentOrTemplate: ComponentType<T> | TemplateRef<T>): OctopusDialog<T> {
        if (this.dialogRef === null) {
            this.dialogCfg.id = `octopus-dialog-${this.dialogID++}`;
            this.dialogRef = this._dialog.open(componentOrTemplate, this.dialogCfg);
        }

        return this;
    }

    close(result?: R, options?: DialogCloseOptions): void {
        this.dialogRef?.close(result, options);
        this.dialogRef = null;
    }

    closeAll(): void {
        this._dialog.closeAll();
    }

    minimize(): void {
        this.dialogRef?.updateSize(this.tempWidth, this.tempHeight);
        this.createAnimate(this.tempWidth, this.tempHeight, false);
    }

    maximize(): void {
        this.tempWidth = this.dialogRef?.config.width;
        this.tempHeight = this.dialogRef?.config.height;
        this.dialogRef?.updateSize('100%', '100%');
        this.createAnimate(this.tempWidth, this.tempHeight, true);
    }

    afterOpened(): Observable<DialogRef<R, T>> {
        return this._dialog.afterOpened.asObservable();
    }

    afterClosed(): Observable<R | undefined> {
        if (this.dialogRef) {
            return this.dialogRef.closed;
        }

        return of(undefined);
    }

    private createAnimate(width: string | undefined, height: string | undefined, flag: boolean): void {
        if (this.dialogRef) {
            let player: AnimationPlayer | null = this._builder.build([
                style({width: flag ? `${width}` : '100%', height: flag ? `${height}` : '100%'}),
                animate('250ms linear',
                    style({width: flag ? '100%' : `${width}`, height: flag ? '100%' : `${height}`}))
            ]).create(this.dialogRef.overlayRef.overlayElement);
            player.onDone(() => player = null);
            player.play();
        }
    }

}

@Injectable()
export class OctopusDrawer<T = unknown, D = any, R = any> {

    private dialogRef: DialogRef<R, T> | null = null;
    private dialogCfg: DialogConfig<D, DialogRef<R, T>> = {
        disableClose: true,
        hasBackdrop: true, panelClass: ['octo-overlay', 'octo-drawer'], backdropClass: ['octo-overlay-mask'],
        positionStrategy: this._overlay.position().global().left('0').bottom('0'),
        minWidth: '0vw', minHeight: '0vh', maxWidth: '100vw', maxHeight: '100vh', width: '100%'
    };
    private dialogID: number = 0;

    constructor(
        private _builder: AnimationBuilder,
        private _dialog: Dialog,
        private _overlay: Overlay
    ) {
    }

    config(config?: DialogConfig<D, DialogRef<R, T>>): OctopusDrawer<T> {
        this.dialogCfg = {...this.dialogCfg, ...config};
        return this;
    }

    open(componentOrTemplate: ComponentType<T> | TemplateRef<T>): OctopusDrawer<T> {
        if (this.dialogRef === null) {
            this.dialogCfg.id = `octopus-dialog-${this.dialogID++}`;
            this.dialogRef = this._dialog.open(componentOrTemplate, this.dialogCfg);
            this.createAnimate(true).then();
        }

        return this;
    }

    close(result?: R, options?: DialogCloseOptions): void {
        this.createAnimate(false).then(value => {
            if (value) {
                this.dialogRef?.close(result, options);
                this.dialogRef = null;
            }
        });
    }

    closeAll(): void {
        this._dialog.closeAll();
    }

    afterOpened(): Observable<DialogRef<R, T>> {
        return this._dialog.afterOpened.asObservable();
    }

    afterClosed(): Observable<R | undefined> {
        if (this.dialogRef) {
            return this.dialogRef.closed;
        }

        return of(undefined);
    }

    private createAnimate(flag: boolean): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            if (this.dialogRef) {
                let player: AnimationPlayer | null = this._builder.build([
                    style({transform: flag ? 'translateY(100%)' : 'translateY(0%)'}),
                    animate('250ms linear', style({transform: flag ? 'translateY(0%)' : 'translateY(100%)'}))
                ]).create(this.dialogRef.overlayRef.overlayElement);
                player.onDone(() => {
                    resolve(true);
                    player = null;
                });
                player.play();
            }
        });
    }

}
