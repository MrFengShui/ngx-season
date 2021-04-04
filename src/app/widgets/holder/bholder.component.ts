import { HostBinding } from "@angular/core";
import { Component } from "@angular/core";

@Component({
    selector: 'app-widgets-block-holder',
    template: `<div class="holder-wrapper root-box w-100 h-100"></div>`
})
export class WidgetsBlockHolderComponent {

    @HostBinding('class') class: string = 'holder block-holder';

}