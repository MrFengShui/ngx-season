import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { OctopusBreadcrumb, OctopusBreadcrumbAction, OctopusBreadcrumbLabel, OctopusBreadcrumbSplit } from "./breadcrumb.component";

@NgModule({
    declarations: [
        OctopusBreadcrumb,
        OctopusBreadcrumbAction,
        OctopusBreadcrumbLabel,
        OctopusBreadcrumbSplit
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        OctopusBreadcrumb,
        OctopusBreadcrumbAction,
        OctopusBreadcrumbLabel,
        OctopusBreadcrumbSplit
    ]
})
export class OctopusBreadcrumbModule { }