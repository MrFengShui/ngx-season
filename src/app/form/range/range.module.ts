import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusRange } from "./range.component";

@NgModule({
    declarations: [
        OctopusRange
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusRange
    ]
})
export class OctopusRangeModule { }