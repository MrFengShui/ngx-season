import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

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
        CommonModule
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