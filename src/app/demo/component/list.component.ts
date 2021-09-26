import { Component } from "@angular/core";
import { ColorPalette } from "src/app/global/enum.utils";

@Component({
    selector: 'app-demo-list-view',
    templateUrl: './list.component.html'
})
export class DemoListView {

    list: string[] = ['Primary', 'Secondary', 'Success', 'Warning', 'Failure', 'Info'];

    format(text: string): ColorPalette {
        return text.toLowerCase() as ColorPalette;
    }

}