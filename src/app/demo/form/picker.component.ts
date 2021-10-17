import { Component } from "@angular/core";

import { OctopusBlobValue } from "src/app/form/picker/picker.component";

import { ColorPalette, OctopusFileType } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-picker-view',
    templateUrl: './picker.component.html'
})
export class DemoPickerView {

    list: ColorPalette[] = ['primary', 'secondary', 'success', 'warning', 'failure', 'info'];
    types: OctopusFileType[] = ['base64', 'bindary', 'buffer', 'text'];
    accept: string[] = ['image/*', 'video/*', 'audio/*'];
    alpha: number = 100;
    color: string = '#ff0000';
    change: any;
    value: Date = new Date();
    blob: any;

    listenChange(value: OctopusBlobValue): void {
        window.alert(Object.entries(value));
    }

}