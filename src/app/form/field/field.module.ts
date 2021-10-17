import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusInputModule } from "../input/input.module";

import { OcotpusFormLabel, OcotpusFormTip, OctopusFormField } from "./field.component";

@NgModule({
    declarations: [
        OctopusFormField,
        OcotpusFormLabel,
        OcotpusFormTip
    ],
    imports: [
        CommonModule,
        OctopusInputModule
    ],
    exports: [
        OctopusFormField,
        OcotpusFormLabel,
        OcotpusFormTip
    ]
})
export class OctopusFieldModule { }