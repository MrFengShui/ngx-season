import {DialogModule} from "@angular/cdk/dialog";
import {OverlayModule} from "@angular/cdk/overlay";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusDialog, OctopusDrawer, OctopusToast} from "./overlay.service";

import {
    OctopusDialogBody,
    OctopusDialogClose,
    OctopusDialogControlBar,
    OctopusDialogFoot,
    OctopusDialogHead, OctopusDrawerContent, OctopusDrawerHeader, OctopusToastBox
} from "./overlay.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusDialogClose,
        OctopusDialogHead,
        OctopusDialogBody,
        OctopusDialogFoot,
        OctopusDialogControlBar,
        OctopusDrawerHeader,
        OctopusDrawerContent,
        OctopusToastBox
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
        OctopusDialogControlBar,
        OctopusDrawerHeader,
        OctopusDrawerContent,
        OctopusToastBox
    ],
    providers: [
        OctopusDialog,
        OctopusDrawer,
        OctopusToast
    ]
})
export class OctopusOverlayModule {}
