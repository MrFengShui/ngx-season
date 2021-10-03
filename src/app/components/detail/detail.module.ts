import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusDetail, OctopusDetailUnit } from "./detail.component";

@NgModule({
    declarations: [
        OctopusDetail,
        OctopusDetailUnit
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusDetail,
        OctopusDetailUnit
    ]
})
export class OctopusDetailModule { }