import { Component, HostBinding } from "@angular/core";

@Component({
    selector: 'octopus-card-attach',
    templateUrl: './attach.component.html'
})
export class OctopusCardAttach {

    @HostBinding('class') class: string = 'octopus-card-attach';

}