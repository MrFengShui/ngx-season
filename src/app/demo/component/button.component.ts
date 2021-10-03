import { Component } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-button-view',
    templateUrl: './button.component.html'
})
export class DemoButtonView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    toggled: boolean = false;

    format(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}