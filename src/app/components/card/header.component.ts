import { Component, HostBinding } from "@angular/core";

@Component({
    selector: 'octopus-card-header',
    templateUrl: './header.component.html'
})
export class OctopusCardHeader {

    @HostBinding('class') class: string = 'octopus-card-header';

}