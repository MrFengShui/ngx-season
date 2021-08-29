import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusRippleModule } from "../ripple/ripple.module";

import { OctopusButton, OctopusFillButton, OctopusIconButton, OctopusMixButton, OctopusOutlineButton } from "./button.component";

@NgModule({
    declarations: [
        OctopusButton,
        OctopusFillButton,
        OctopusIconButton,
        OctopusMixButton,
        OctopusOutlineButton
    ],
    imports: [
        CommonModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusButton,
        OctopusFillButton,
        OctopusIconButton,
        OctopusMixButton,
        OctopusOutlineButton
    ]
})
export class OctopusButtonModule { }