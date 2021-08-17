import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: '[octopus-form-input]'
})
export class OcotpusFormInput {

    @HostBinding('class') class: string = 'octopus-form-input';

}