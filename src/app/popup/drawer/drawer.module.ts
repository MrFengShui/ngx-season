import { BidiModule } from "@angular/cdk/bidi";
import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusPopup } from "../popup.service";
import { OctopusDrawer } from "./drawer.service";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BidiModule,
        OverlayModule,
        PortalModule
    ],
    exports: [],
    providers: [
        OctopusPopup,
        OctopusDrawer
    ]
})
export class OctopusDrawerModule { }