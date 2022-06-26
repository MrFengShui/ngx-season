import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusImageModule} from "../image/image.module";

import {OctopusBarsHolder, OctopusMediaHolder, OctopusUserHolder} from "./holders.component";
import {OctopusEmptyStatus, OctopusErrorStatus} from "./status.component";
import {OctopusSplitline} from "./split.component";

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
