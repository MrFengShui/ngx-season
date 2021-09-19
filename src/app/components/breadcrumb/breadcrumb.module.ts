import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { OctopusTooltipModule } from "src/app/popup/tooltip/tooltip.module";
import { OctopusIconModule } from "../icon/icon.module";

import { OctopusBreadcrumb, OctopusBreadcrumbAnchor } from "./breadcrumb.component";

@NgModule({
    declarations: [
        OctopusBreadcrumb,
        OctopusBreadcrumbAnchor
    ],
    imports: [
        CommonModule,
        RouterModule,
        OctopusIconModule,
        OctopusTooltipModule
    ],
    exports: [
        OctopusBreadcrumb,
        OctopusBreadcrumbAnchor
    ]
})
export class OctopusBreadcrumbModule { }