import { HostBinding } from "@angular/core";
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-widgets-unit-holder',
    templateUrl: './uholder.component.html'
})
export class WidgetsUnitHolderComponent {

    @HostBinding('class') class: string = 'holder unit-holder';

}