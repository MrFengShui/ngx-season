import { BidiModule } from "@angular/cdk/bidi";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from "src/app/components/button/button.module";
import { OctopusIconModule } from "src/app/components/icon/icon.module";

import { OctopusPopup } from "../popup.service";
import { OctopusDialog } from "./dialog.service";

import { OctopusDialogContent, OctopusDialogFooter, OctopusDialogHeader } from "./dialog.component";

import { OctopusDialogClose } from "./dialog.directive";

@NgModule({
    declarations: [
        OctopusDialogContent,
        OctopusDialogFooter,
        OctopusDialogHeader,
        OctopusDialogClose
    ],
    imports: [
        CommonModule,
        BidiModule,
        OverlayModule,
        PortalModule,
        OctopusButtonModule,
        OctopusIconModule
    ],
    exports: [
        OctopusDialogContent,
        OctopusDialogFooter,
        OctopusDialogHeader,
        OctopusDialogClose
    ],
    providers: [
        OctopusPopup,
        OctopusDialog
    ]
})
export class OctopusDialogModule { }