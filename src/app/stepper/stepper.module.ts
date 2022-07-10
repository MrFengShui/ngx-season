import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CdkStepperModule} from '@angular/cdk/stepper';

import {
    OctopusStep,
    OctopusStepper,
    OctopusStepperHeader
} from "./stepper.component";

import {OctopusToolsModule} from "../tools/tools.module";
import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusStepper,
        OctopusStep,
        OctopusStepperHeader
    ],
    imports: [
        CommonModule,
        CdkStepperModule,
        OctopusButtonModule,
        OctopusEffectsModule,
        OctopusImageModule,
        OctopusToolsModule
    ],
    exports: [
        OctopusStepper,
        OctopusStep,
        OctopusStepperHeader
    ]
})
export class OctopusStepperModule {}
