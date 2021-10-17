import { Component } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-select-view',
    templateUrl: './select.component.html'
})
export class DemoSelectView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    flag: boolean = false;
    select: string = 'item-1';

    format(text: string): string {
        return text.charAt(0) + text.slice(1);
    }

}