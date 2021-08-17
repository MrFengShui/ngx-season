import { Component, HostBinding } from "@angular/core";

@Component({
    selector: '[octopus-card-subtitle]',
    template: `<ng-content></ng-content>`
})
export class OctopusCardSubtitle {

    @HostBinding('class') class: string = 'octopus-card-subtitle';

}