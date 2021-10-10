import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusIconModule } from "../icon/icon.module";
import { OctopusRippleModule } from "../ripple/ripple.module";

import { OctopusButton, OctopusButtonGroup, OctopusFillButton, OctopusIconButton, OctopusMixButton, OctopusOutlineButton, OctopusScrollButton, } from "./button.component";

@NgModule({
    declarations: [
        OctopusButton,
        OctopusFillButton,
        OctopusIconButton,
        OctopusMixButton,
        OctopusOutlineButton,
        OctopusScrollButton,
        OctopusButtonGroup
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
        OctopusButtonGroup,
    ]
})
export class OctopusButtonModule { }