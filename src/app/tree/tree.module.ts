import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CdkTreeModule} from "@angular/cdk/tree";

import {OctopusFlatTree, OctopusNestTree} from "./tree.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusFlatTree,
        OctopusNestTree
    ],
    imports: [
        CommonModule,
        CdkTreeModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusFlatTree,
        OctopusNestTree
    ]
})
export class OctopusTreeModule {}
