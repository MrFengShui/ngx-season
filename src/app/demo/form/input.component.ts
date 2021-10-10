import { Component } from "@angular/core";

import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-input-view',
    templateUrl: './input.component.html'
})
export class DemoInputView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    types: Array<'text' | 'password' | 'email' | 'search'> = ['text', 'password', 'email', 'search'];
    phone: string = '';
    visible: boolean = false;
    value: string = '';

    format(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

}