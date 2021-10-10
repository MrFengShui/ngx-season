import { A11yModule } from "@angular/cdk/a11y";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusRippleModule } from "src/app/components/ripple/ripple.module";

import { OctopusToggleButton, OctopusToggleGroup, OctopusToggleSwitch } from "./toggle.component";

@NgModule({
    declarations: [
        OctopusToggleButton,
        OctopusToggleGroup,
        OctopusToggleSwitch
    ],
    imports: [
        CommonModule,
        A11yModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusToggleButton,
        OctopusToggleGroup,
        OctopusToggleSwitch
    ]
})
export class OctopusToggleModule { }