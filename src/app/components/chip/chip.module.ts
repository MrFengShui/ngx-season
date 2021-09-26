import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from "../button/button.module";
import { OctopusIconModule } from "../icon/icon.module";
import { OctopusRippleModule } from "../ripple/ripple.module";

import { OctopusChip, OctopusChipIcon, OctopusChipStack } from "./chip.component";

@NgModule({
    declarations: [
        OctopusChip,
        OctopusChipIcon,
        OctopusChipStack
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusIconModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusChip,
        OctopusChipIcon,
        OctopusChipStack
    ]
})
export class OctopusChipModule { }