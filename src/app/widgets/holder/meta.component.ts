import { HostBinding } from "@angular/core";
import { Component } from "@angular/core";

@Component({
    selector: 'app-widgets-meta-holder',
    template: `
        <div class="holder-wrapper display-flex align-items-center">
            <div class="holder-pie mr-25"></div>
            <div class="holder-bars display-flex flex flex-column ml-25">
                <div class="holder-bar"></div>
                <div class="holder-bar my-50"></div>
                <div class="holder-bar"></div>
            </div>
        </div>
    `
})
export class WidgetsMetaHolderComponent {

    @HostBinding('class') class: string = 'holder meta-holder w-100';

}