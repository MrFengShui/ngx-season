import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { OctopusPopup } from "../popup.service";

import { OctopusTooltip, OctopusTooltipContainer } from "./tooltip.component";

@NgModule({
    declarations: [
        OctopusTooltip,
        OctopusTooltipContainer
    ],
    imports: [
        CommonModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        OctopusTooltip,
        OctopusTooltipContainer
    ],
    providers: [
        OctopusPopup
    ]
})
export class OctopusTooltipModule { }