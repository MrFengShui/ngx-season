import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusBorderCell, OctopusLayoutBorder } from "./border.component";

@NgModule({
    declarations: [
        OctopusLayoutBorder,
        OctopusBorderCell
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusLayoutBorder,
        OctopusBorderCell
    ]
})
export class OctopusLayoutModule { }