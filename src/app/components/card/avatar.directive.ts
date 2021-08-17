import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: '[octopus-card-avatar]'
})
export class OctopusCardAvatar {

    @HostBinding('class') class: string = 'octopus-card-avatar';

}