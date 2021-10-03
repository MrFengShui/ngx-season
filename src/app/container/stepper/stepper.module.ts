import { CdkStep, CdkStepHeader, CdkStepLabel, CdkStepper, CdkStepperModule, CdkStepperNext, CdkStepperPrevious } from '@angular/cdk/stepper';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusButtonModule } from 'src/app/components/button/button.module';
import { OctopusDividerModule } from 'src/app/components/divider/divider.module';
import { OctopusIconModule } from 'src/app/components/icon/icon.module';
import { OctopusRippleModule } from 'src/app/components/ripple/ripple.module';

import { OctopusStep, OctopusStepAction, OctopusStepHeader, OctopusStepLabel, OctopusStepper, OctopusStepperNext, OctopusStepperPrevious } from "./stepper.component";

@NgModule({
    declarations: [
        OctopusStepper,
        OctopusStepperNext,
        OctopusStepperPrevious,
        OctopusStep,
        OctopusStepHeader,
        OctopusStepLabel,
        OctopusStepAction
    ],
    imports: [
        CommonModule,
        CdkStepperModule,
        OctopusButtonModule,
        OctopusDividerModule,
        OctopusIconModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusStepper,
        OctopusStepperNext,
        OctopusStepperPrevious,
        OctopusStep,
        OctopusStepHeader,
        OctopusStepLabel,
        OctopusStepAction
    ],
    providers: [
        { provide: CdkStepper, useClass: OctopusStepper },
        { provide: CdkStep, useClass: OctopusStep },
        { provide: CdkStepHeader, useClass: OctopusStepHeader },
        { provide: CdkStepLabel, useClass: OctopusStepLabel }
    ]
})
export class OctopusStepperModule { }