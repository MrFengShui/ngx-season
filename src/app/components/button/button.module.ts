import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusIconModule } from "../icon/icon.module";
import { OctopusRippleModule } from "../ripple/ripple.module";

import { OctopusButton, OctopusButtonGroup, OctopusFillButton, OctopusIconButton, OctopusMixButton, OctopusOutlineButton, OctopusScrollButton, OctopusToggleButton, OctopusToggleGroup } from "./button.component";

@NgModule({
    declarations: [
        OctopusButton,
        OctopusFillButton,
        OctopusIconButton,
        OctopusMixButton,
        OctopusOutlineButton,
        OctopusScrollButton,
        OctopusToggleButton,
        OctopusButtonGroup,
        OctopusToggleGroup
    ],
    imports: [
        CommonModule,
        OctopusIconModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusButton,
        OctopusFillButton,
        OctopusIconButton,
        OctopusMixButton,
        OctopusOutlineButton,
        OctopusScrollButton,
        OctopusToggleButton,
        OctopusButtonGroup,
        OctopusToggleGroup
    ]
})
export class OctopusButtonModule { }