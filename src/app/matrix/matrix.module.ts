import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusMatrix, OctopusMatrixTile, OctopusMatrixTileFooter, OctopusMatrixTileHeader} from "./matrix.component";

import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusMatrix,
        OctopusMatrixTile,
        OctopusMatrixTileHeader,
        OctopusMatrixTileFooter
    ],
    imports: [
        CommonModule,
        OctopusEffectsModule
    ],
    exports: [
        OctopusMatrix,
        OctopusMatrixTile,
        OctopusMatrixTileHeader,
        OctopusMatrixTileFooter
    ]
})
export class OctopusMatrixModule {}
