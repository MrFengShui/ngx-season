import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    OctopusAnchor,
    OctopusButton,
    OctopusScrollButton, OctopusSolidAnchor,
    OctopusSolidButton, OctopusStrokedAnchor,
    OctopusStrokedButton
} from "./button.component";

import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusAnchor,
        OctopusButton,
        OctopusSolidAnchor,
        OctopusSolidButton,
        OctopusStrokedAnchor,
        OctopusStrokedButton,
        OctopusScrollButton
    ],
    imports: [
        CommonModule,
        OctopusEffectsModule,
        OctopusImageModule
    ],
    exports: [
        OctopusAnchor,
        OctopusButton,
        OctopusSolidAnchor,
        OctopusSolidButton,
        OctopusStrokedAnchor,
        OctopusStrokedButton,
        OctopusScrollButton
    ]
})
export class OctopusButtonModule {}
