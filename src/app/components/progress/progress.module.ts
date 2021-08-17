import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusProgressPie } from "./pie.component";
import { OctopusProgressBar } from "./bar.component";

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