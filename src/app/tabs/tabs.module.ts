import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    OctopusTabbedUnit,
    OctopusTabbedHeader,
    OctopusTabbedGroup,
    OctopusTabbedUnitHead,
    OctopusTabbedBox,
    OctopusTabbedUnitBody,
    OctopusTabbedControl,
    OctopusTabbedFavicon
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
        OctopusTabbedFavicon,
        OctopusTabbedControl,
        OctopusTabbedUnit,
        OctopusTabbedHeader,
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
        OctopusTabbedFavicon,
        OctopusTabbedControl,
        OctopusTabbedUnit,
        OctopusTabbedUnit,
        OctopusTabbedHeader,
        OctopusTabbedGroup
    ]
})
export class OctopusTabbedModule {}
