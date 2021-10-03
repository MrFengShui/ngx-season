import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from "../button/button.module";
import { OctopusIconModule } from "../icon/icon.module";

import { OctopusRoll, OctopusRollUnit } from "./roll.component";

@NgModule({
    declarations: [
        OctopusRoll,
        OctopusRollUnit
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusIconModule
    ],
    exports: [
        OctopusRoll,
        OctopusRollUnit
    ]
})
export class OctopusRollModule { }