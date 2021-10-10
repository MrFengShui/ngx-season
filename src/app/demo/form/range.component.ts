import { Component } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-range-view',
    templateUrl: './range.component.html'
})
export class DemoRangeView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    value: number = 50;

}