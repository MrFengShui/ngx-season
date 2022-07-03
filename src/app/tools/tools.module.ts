import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusImageModule} from "../image/image.module";

import {
    OctopusBarsHolder, OctopusEmptyStatus,
    OctopusErrorStatus,
    OctopusMediaHolder,
    OctopusSplitline,
    OctopusUserHolder
} from "./tools.component";

@NgModule({
    declarations: [
        OctopusEmptyStatus,
        OctopusErrorStatus,
        OctopusSplitline,
        OctopusBarsHolder,
        OctopusMediaHolder,
        OctopusUserHolder
    ],
    imports: [
        CommonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusEmptyStatus,
        OctopusErrorStatus,
        OctopusSplitline,
        OctopusBarsHolder,
        OctopusMediaHolder,
        OctopusUserHolder
    ]
})
export class OctopusToolsModule {}
