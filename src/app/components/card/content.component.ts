import { Component, HostBinding } from "@angular/core";

@Component({
    selector: 'octopus-card-content',
    templateUrl: './content.component.html'
})
export class OctopusCardContent {

    @HostBinding('class') class: string = 'octopus-card-content';

}