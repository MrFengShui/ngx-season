import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusProgressBar, OctopusProgressPie } from "./progress.component";

@NgModule({
    declarations: [
        OctopusProgressBar,
        OctopusProgressPie
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusProgressBar,
        OctopusProgressPie
    ]
})
export class OctopusProgressModule { }