import { HostBinding } from "@angular/core";
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'app-widgets-item-holder',
    templateUrl: './iholder.component.html'
})
export class WidgetsItemHolderComponent {

    @HostBinding('class') class: string = 'holder item-holder w-100';

}