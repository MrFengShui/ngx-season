import { CdkStep, CdkStepHeader, CdkStepLabel, CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from 'src/app/components/button/button.module';
import { OctopusIconModule } from 'src/app/components/icon/icon.module';
import { OctopusRippleModule } from 'src/app/components/ripple/ripple.module';

import { OctopusStep, OctopusStepHeader, OctopusStepLabel, OctopusStepper } from "./stepper.component";

@NgModule({
    declarations: [
        OctopusStepper,
        OctopusStep,
        OctopusStepHeader,
        OctopusStepLabel,
    ],
    imports: [
        CommonModule,
        CdkStepperModule,
        OctopusButtonModule,
        OctopusIconModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusStepper,
        OctopusStep,
        OctopusStepHeader,
        OctopusStepLabel
    ],
    providers: [
        { provide: CdkStepper, useClass: OctopusStepper },
        { provide: CdkStep, useClass: OctopusStep },
        { provide: CdkStepHeader, useClass: OctopusStepHeader },
        { provide: CdkStepLabel, useClass: OctopusStepLabel }
    ]
})
export class OctopusStepperModule { }