import { Component, HostBinding } from "@angular/core";

@Component({
    selector: 'app-home-support-about',
    templateUrl: './about.component.html'
})
export class HomeSupportAboutComponent {

    @HostBinding('class') class: string = 'about';

}