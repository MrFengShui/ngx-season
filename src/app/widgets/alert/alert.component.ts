import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import { AlertModel } from "src/app/models/popup.model";

@Component({
    selector: 'app-widgets-alert',
    templateUrl: './alert.component.html'
})
export class WidgetsAlertComponent {

    inputData: AlertModel;

    constructor(@Inject(MAT_SNACK_BAR_DATA) private data: AlertModel) {
        this.inputData = data;
    }

}