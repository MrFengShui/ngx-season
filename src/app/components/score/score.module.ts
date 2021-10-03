import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusIconModule } from "../icon/icon.module";

import { OctopusScore } from "./score.component";

@NgModule({
    declarations: [
        OctopusScore
    ],
    imports: [
        CommonModule,
        OctopusIconModule,
    ],
    exports: [
        OctopusScore
    ]
})
export class OctopusScoreModule { }