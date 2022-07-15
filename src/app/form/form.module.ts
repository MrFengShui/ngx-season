import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TextFieldModule} from '@angular/cdk/text-field';

import {
    OctopusFormField,
    OctopusFormHint,
    OctopusFormLabel,
    OctopusFormPrefix,
    OctopusFormSuffix,
    OctopusInput
} from "./form.component";

import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusFormField,
        OctopusFormLabel,
        OctopusFormHint,
        OctopusFormPrefix,
        OctopusFormSuffix,
        OctopusInput
    ],
    imports: [
        CommonModule,
        FormsModule,
        TextFieldModule,
        OctopusImageModule,
        OctopusEffectsModule
    ],
    exports: [
        TextFieldModule,
        OctopusFormField,
        OctopusFormLabel,
        OctopusFormHint,
        OctopusFormPrefix,
        OctopusFormSuffix,
        OctopusInput
    ]
})
export class OctopusFormModule {}
