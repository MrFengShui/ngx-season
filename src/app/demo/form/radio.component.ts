import { Component } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-radiobutton-view',
    templateUrl: './radio.component.html'
})
export class DemoRadioButtonView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    value: any = 'radio-1';

}