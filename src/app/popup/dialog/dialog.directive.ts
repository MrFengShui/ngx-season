import { Directive, Input, HostListener } from "@angular/core";

import { OctopusDialog } from "./dialog.service";

@Directive({
    selector: 'button[octopus-dialog-close], a[octopus-dialog-close]',
})
export class OctopusDialogClose {

    @Input('octopus-dialog-close') close: any;

    @HostListener('click')
    private listenHostClick(): void {
        this._dialog.hide(this.close);
    }

    constructor(private _dialog: OctopusDialog) { }

}