import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    OctopusTabbedUnit,
    OctopusTabHeader,
    OctopusTabbedGroup, OctopusTabbedUnitHead, OctopusTabbedBox, OctopusTabbedUnitBody, OctopusTabbedControl
} from "./tabs.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";
import {OctopusToolsModule} from "../tools/tools.module";

@NgModule({
    declarations: [
        OctopusTabbedBox,
        OctopusTabbedUnitHead,
        OctopusTabbedUnitBody,
        OctopusTabbedControl,
        OctopusTabbedUnit,
        OctopusTabHeader,
        OctopusTabbedGroup
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusImageModule,
        OctopusToolsModule,
        OctopusEffectsModule
    ],
    exports: [
        OctopusTabbedBox,
        OctopusTabbedUnitHead,
        OctopusTabbedUnitBody,
        OctopusTabbedControl,
        OctopusTabbedUnit,
        OctopusTabbedUnit,
        OctopusTabHeader,
        OctopusTabbedGroup
    ]
})
export class OctopusTabModule {}
