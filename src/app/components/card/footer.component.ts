import { Component, HostBinding } from "@angular/core";

@Component({
    selector: 'octopus-card-footer',
    templateUrl: './footer.component.html'
})
export class OctopusCardFooter {

    @HostBinding('class') class: string = 'octopus-card-footer';

}