import { HostBinding } from "@angular/core";
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-widgets-item-holder',
    template: `
        <div class="holder-wrapper">
            <div class="holder-box mr-25"></div>
            <div class="holder-bars display-flex flex-column ml-25">
                <div class="holder-bar"></div>
                <div class="holder-bar my-50"></div>
                <div class="holder-bar"></div>
            </div>
        </div>
    `
})
export class WidgetsItemHolderComponent {

    @HostBinding('class') class: string = 'holder item-holder w-100';

}