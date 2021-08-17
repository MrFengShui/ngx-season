import { Directive, HostBinding } from "@angular/core";

@Directive({
    selector: '[octopus-form-postfix]'
})
export class OcotpusFormPostfix {

    @HostBinding('class') class: string = 'octopus-form-postfix';

}