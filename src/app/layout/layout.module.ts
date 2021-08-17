import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusBorderBottom, OctopusBorderCenter, OctopusBorderLeft, OctopusBorderRight, OctopusBorderTop, OctopusLayoutBorder } from "./border.component";

@NgModule({
    declarations: [
        OctopusLayoutBorder,
        OctopusBorderTop,
        OctopusBorderBottom,
        OctopusBorderLeft,
        OctopusBorderCenter,
        OctopusBorderRight
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusLayoutBorder,
        OctopusBorderTop,
        OctopusBorderBottom,
        OctopusBorderLeft,
        OctopusBorderCenter,
        OctopusBorderRight
    ]
})
export class OctopusLayoutModule { }