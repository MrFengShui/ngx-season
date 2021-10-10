import { Component } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-toggle-view',
    templateUrl: './toggle.component.html'
})
export class DemoToggleView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    checked: boolean = true;
    value: any = 3;

    format(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}