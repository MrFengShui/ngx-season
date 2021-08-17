import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusDivider } from "./divider.component";

@NgModule({
    declarations: [
        OctopusDivider
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusDivider
    ]
})
export class OctopusDividerModule { }