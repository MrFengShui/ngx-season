import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from "src/app/components/button/button.module";
import { OctopusIconModule } from "src/app/components/icon/icon.module";

import { OctopusPopup } from "../popup.service";
import { OctopusToast } from "./toast.service";

import { OctopusAlertToast, OctopusAlertToastQueue, OctopusNoticeToast, OctopusNoticeToastQueue } from "./toast.component";

@NgModule({
    declarations: [
        OctopusAlertToast,
        OctopusNoticeToast,
        OctopusAlertToastQueue,
        OctopusNoticeToastQueue
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule,
        OctopusButtonModule,
        OctopusIconModule
    ],
    exports: [
        OctopusAlertToast,
        OctopusNoticeToast,
        OctopusAlertToastQueue,
        OctopusNoticeToastQueue
    ],
    providers: [
        OctopusPopup,
        OctopusToast
    ]
})
export class OctopusToastModule { }