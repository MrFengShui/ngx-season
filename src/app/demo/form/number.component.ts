import { Component } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-number-view',
    templateUrl: './number.component.html'
})
export class DemoNumberView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    minValue: string = '0';
    maxValue: string = '100';
    step: string = '5';
    value: number = 50;

}