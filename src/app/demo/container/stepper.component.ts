import { Component } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-stepper-view',
    templateUrl: './stepper.component.html'
})
export class DemoStepperView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];

}