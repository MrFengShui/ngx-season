import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {OctopusCheckBox, OctopusCheckToggle} from "./check.component";

import {OctopusImageModule} from "../image/image.module";
import {OctopusEffectsModule} from "../effects/effects.module";

@NgModule({
    declarations: [
        OctopusCheckBox,
        OctopusCheckToggle,
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
    ]
})
export class OctopusCheckModule {}
