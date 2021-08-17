import { ChangeDetectionStrategy, Component } from "@angular/core";

import { OctopusDialog } from "../../popup/dialog/dialog.service";
import { OctopusDialogPosition } from "../../popup/dialog/dialog.utils";

import { DemoWidgetDialogComponent } from "./widget/dialog.component";

@Component({
    selector: 'app-demo-dialog-view',
    styleUrls: ['../demo.module.scss'],
    templateUrl: './dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoDialogViewComponent {

    constructor(private _dialog: OctopusDialog) { }

    handleDialogActionEvent(position: string): void {
        let dialog: OctopusDialog = this._dialog.create().resize().locate(position as OctopusDialogPosition).scroll();
        dialog.open(DemoWidgetDialogComponent, true, 'From DemoDialogViewComponent Open');
        dialog.opened().subscribe(value => console.log(`Opened: ${value}`));
        dialog.closed().subscribe(value => console.log(`Closed: ${value}`));
    }

}