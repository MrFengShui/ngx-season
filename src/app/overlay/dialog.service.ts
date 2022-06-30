import {Injectable, InjectionToken, TemplateRef} from "@angular/core";
import {Dialog, DIALOG_DATA, DialogCloseOptions, DialogConfig, DialogRef} from "@angular/cdk/dialog";
import {ComponentType, Overlay} from "@angular/cdk/overlay";
import {Observable, of} from "rxjs";

export const OCTOPUS_DIALOG_DATA: InjectionToken<any> = DIALOG_DATA;

@Injectable()
export class OctopusDialog<T = unknown, D = any, R = any> {

    private dialogRef: DialogRef<R, T> | null = null;
    private dialogCfg: DialogConfig<D, DialogRef<R, T>> = {
        disableClose: true,
        hasBackdrop: true, panelClass: ['octo-overlay', 'octo-dialog'], backdropClass: ['octo-overlay-mask'],
        positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
        minWidth: '0vw', minHeight: '0vh', maxWidth: '100vw', maxHeight: '100vh', width: '80vw'
    };
    private dialogID: number = 0;
    private tempWidth?: string = '';
    private tempHeight?: string = '';

    constructor(
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
    }

    maximize(): void {
        this.tempWidth = this.dialogRef?.config.width;
        this.tempHeight = this.dialogRef?.config.height;
        this.dialogRef?.updateSize('100vw', '100vh');
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

}

