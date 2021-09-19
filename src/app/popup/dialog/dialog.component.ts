import { Component, HostBinding } from "@angular/core";

import { OctopusDialog } from "./dialog.service";

@Component({
    selector: 'octopus-dialog-header',
    template: `
        <div class="octopus-dialog-header-wrapper">
            <div class="flex-fill"><ng-content></ng-content></div>
            <button octopus-icon-button color="warning" (click)="handleMaximizeActionEvent()">
                <octopus-icon>{{maximized ? "close_fullscreen" : "open_in_full"}}</octopus-icon>
            </button>
            <button octopus-icon-button color="failure">
                <octopus-icon>close</octopus-icon>
            </button>
        </div>
    `
})
export class OctopusDialogHeader {

    @HostBinding('class') class: string = 'octopus-dialog-header';

    maximized: boolean = false;

    constructor(private _dialog: OctopusDialog) { }

    handleMaximizeActionEvent(): void {
        this.maximized = !this.maximized;
        this._dialog.updateMaximized(this.maximized);
    }

}

@Component({
    selector: 'octopus-dialog-footer',
    template: `
        <div class="octopus-dialog-footer-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusDialogFooter {

    @HostBinding('class') class: string = 'octopus-dialog-footer';

}

@Component({
    selector: 'octopus-dialog-content',
    template: `
        <div class="octopus-dialog-content-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusDialogContent {

    @HostBinding('class') class: string = 'octopus-dialog-content';

}

