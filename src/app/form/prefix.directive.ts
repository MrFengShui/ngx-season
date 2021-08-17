import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: '[octopus-form-prefix]'
})
export class OcotpusFormPrefix {

    @HostBinding('class') class: string = 'octopus-form-prefix';

}