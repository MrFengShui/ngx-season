import { Component, HostBinding } from "@angular/core";

@Component({
    selector: '[octopus-card-title]',
    template: `<ng-content></ng-content>`
})
export class OctopusCardTitle {

    @HostBinding('class') class: string = 'octopus-card-title';

}