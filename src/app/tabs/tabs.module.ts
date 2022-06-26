import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    OctopusTab,
    OctopusTabHeader,
    OctopusTabContent,
    OctopusTabPane, OctopusTabThumbnail, OctopusTabbBox
} from "./tabs.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";
import {OctopusToolsModule} from "../tools/tools.module";

@NgModule({
    declarations: [
        OctopusTabbBox,
        OctopusTabThumbnail,
        OctopusTabContent,
        OctopusTab,
        OctopusTabHeader,
        OctopusTabPane
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusImageModule,
        OctopusToolsModule,
        OctopusEffectsModule
    ],
    exports: [
        OctopusTabbBox,
        OctopusTabThumbnail,
        OctopusTabContent,
        OctopusTab,
        OctopusTab,
        OctopusTabHeader,
        OctopusTabPane
    ]
})
export class OctopusTabModule {}
