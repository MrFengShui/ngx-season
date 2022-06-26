import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {OctopusButton, OctopusSolidButton, OctopusStrokeButton} from "./button.component";

import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusButton,
        OctopusSolidButton,
        OctopusStrokeButton
    ],
    imports: [
        CommonModule,
        OctopusEffectsModule,
        OctopusImageModule
    ],
    exports: [
        OctopusButton,
        OctopusSolidButton,
        OctopusStrokeButton
    ]
})
export class OctopusButtonModule {}
