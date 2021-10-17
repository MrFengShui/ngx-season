import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OctopusDividerModule } from "src/app/components/divider/divider.module";

import { OctopusIconModule } from "src/app/components/icon/icon.module";
import { OctopusListModule } from "src/app/components/list/list.module";

import { OctopusSelect, OctopusSelectDropdown, OctopusSelectOption, OctopusSelectOptionGroup } from "./select.component";

@NgModule({
    declarations: [
        OctopusSelect,
        OctopusSelectOption,
        OctopusSelectOptionGroup,
        OctopusSelectDropdown
    ],
    imports: [
        CommonModule,
        PortalModule,
        OverlayModule,
        FormsModule,
        ReactiveFormsModule,
        OctopusDividerModule,
        OctopusIconModule,
        OctopusListModule
    ],
    exports: [
        OctopusSelect,
        OctopusSelectOption,
        OctopusSelectOptionGroup,
        OctopusSelectDropdown
    ]
})
export class OctopusSelectModule { }