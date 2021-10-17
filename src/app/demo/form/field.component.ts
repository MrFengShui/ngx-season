import { Component } from "@angular/core";
import { ColorPalette, OctopusValidationState } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-field-view',
    templateUrl: './field.component.html'
})
export class DemoFieldView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    states: OctopusValidationState[] = ['success', 'warning', 'error', 'hint'];

    format(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}