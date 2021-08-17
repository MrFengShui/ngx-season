import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusIconModule } from "src/app/components/icon/icon.module";
import { OctopusRippleModule } from "src/app/components/ripple/ripple.module";

import { OctopusTabbed, OctopusTabbedUnit } from "./tabbed.component";

@NgModule({
    declarations: [
        OctopusTabbed,
        OctopusTabbedUnit
    ],
    imports: [
        CommonModule,
        PortalModule,
        OctopusIconModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusTabbed,
        OctopusTabbedUnit
    ]
})
export class OctopusTabbedModule { }