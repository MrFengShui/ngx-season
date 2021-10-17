import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusBorderCell, OctopusLayoutBorder } from "./border.component";
import { OctopusLayoutGrid, OctopusGridCell } from "./grid.component";

@NgModule({
    declarations: [
        OctopusLayoutBorder,
        OctopusBorderCell,
        OctopusLayoutGrid,
        OctopusGridCell
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusLayoutBorder,
        OctopusBorderCell,
        OctopusLayoutGrid,
        OctopusGridCell
    ]
})
export class OctopusLayoutModule { }