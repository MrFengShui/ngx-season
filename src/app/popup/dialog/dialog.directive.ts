import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: '[octopus-dialog-title]'
})
export class OctopusDialogTitle {

    @HostBinding('class') class: string = 'octopus-dialog-title';

}

@Directive({
    selector: '[octopus-dialog-subtitle]'
})
export class OctopusDialogSubtitle {

    @HostBinding('class') class: string = 'octopus-dialog-subtitle';

}