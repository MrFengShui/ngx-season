import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {OctopusCheckBox, OctopusCheckToggle} from "./check.component";

import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";
import {OctopusRadioButton, OctopusRadioGroup, OctopusRadioToggle} from "./radio.component";

@NgModule({
    declarations: [
        OctopusCheckBox,
        OctopusCheckToggle,
        OctopusRadioGroup,
        OctopusRadioButton,
        OctopusRadioToggle
    ],
    imports: [
        CommonModule,
        FormsModule,
        OctopusImageModule,
        OctopusEffectsModule
    ],
    exports: [
        OctopusCheckBox,
        OctopusCheckToggle,
        OctopusRadioGroup,
        OctopusRadioButton,
        OctopusRadioToggle
    ]
})
export class OctopusFormModule {}
