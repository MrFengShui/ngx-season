import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {OctopusRadioButton, OctopusRadioGroup, OctopusRadioToggle} from "./radio.component";

import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
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
        OctopusRadioGroup,
        OctopusRadioButton,
        OctopusRadioToggle
    ]
})
export class OctopusRadioModule {}
