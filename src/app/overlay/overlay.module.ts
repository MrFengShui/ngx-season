import {DialogModule} from "@angular/cdk/dialog";
import {OverlayModule} from "@angular/cdk/overlay";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OCTOPUS_DIALOG_DATA, OctopusDialog} from "./dialog.service";

import {
    OctopusDialogBody,
    OctopusDialogClose,
    OctopusDialogControlBar,
    OctopusDialogFoot,
    OctopusDialogHead
} from "./dialog.component";
import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusDialogClose,
        OctopusDialogHead,
        OctopusDialogBody,
        OctopusDialogFoot,
        OctopusDialogControlBar
    ],
    imports: [
        CommonModule,
        DialogModule,
        OverlayModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusDialogClose,
        OctopusDialogHead,
        OctopusDialogBody,
        OctopusDialogFoot,
        OctopusDialogControlBar
    ],
    providers: [
        OctopusDialog
    ]
})
export class OctopusOverlayModule {}
