import { Component } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-navbar-view',
    templateUrl: './navbar.component.html'
})
export class DemoNavbarView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];

}