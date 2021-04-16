import { HostBinding } from "@angular/core";
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-widgets-unit-holder',
    template: `
        <div class="holder-wrapper">
            <div class="holder-box"></div>
            <div class="holder-pie"></div>
            <div class="holder-bars display-flex flex-column">
                <div class="holder-bar"></div>
                <div class="holder-bar my-50"></div>
                <div class="holder-bar"></div>
            </div>
        </div>
    `
})
export class WidgetsUnitHolderComponent {

    @HostBinding('class') class: string = 'holder unit-holder w-100';

}