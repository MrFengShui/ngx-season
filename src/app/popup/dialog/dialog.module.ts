import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusDialog } from "./dialog.service";

import { OctopusDialogContent, OctopusDialogFooter, OctopusDialogHeader } from "./dialog.component";
import { OctopusDialogSubtitle, OctopusDialogTitle } from "./dialog.directive";
import { PortalModule } from "@angular/cdk/portal";

@NgModule({
    declarations: [
        OctopusDialogContent,
        OctopusDialogFooter,
        OctopusDialogHeader,
        OctopusDialogTitle,
        OctopusDialogSubtitle
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        OctopusDialogContent,
        OctopusDialogFooter,
        OctopusDialogHeader,
        OctopusDialogTitle,
        OctopusDialogSubtitle
    ],
    providers: [
        OctopusDialog
    ]
})
export class OctopusDialogModule { }