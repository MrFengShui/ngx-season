import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OctopusRadioButton, OctopusRadioGroup } from "./radio.component";

@NgModule({
    declarations: [
        OctopusRadioButton,
        OctopusRadioGroup
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        OctopusRadioButton,
        OctopusRadioGroup
    ]
})
export class OctopusRadioModule { }