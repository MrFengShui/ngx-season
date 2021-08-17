import { Component, HostBinding } from "@angular/core";

@Component({
    selector: 'octopus-dialog-header',
    template: `
        <div class="octopus-dialog-header-wrapper">
            <ng-content></ng-content>
        </div>
    `
})
export class OctopusDialogHeader {

    @HostBinding('class') class: string = 'octopus-dialog-header';

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
