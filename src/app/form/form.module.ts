import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OctopusCheckbox } from "./check/check.component";
import { OcotpusFormInput, OcotpusFormLabel, OcotpusFormPostfix, OcotpusFormPrefix, OcotpusFormValidation, OctopusFormField } from "./field/field.component";
import { OctopusInputRange } from "./input/input.component";
import { OctopusSelect, OctopusSelectDropdown, OctopusSelectOption } from "./select/select.component";

@NgModule({
    declarations: [
        OctopusCheckbox,
        OctopusFormField,
        OcotpusFormLabel,
        OcotpusFormInput,
        OcotpusFormPrefix,
        OcotpusFormPostfix,
        OcotpusFormValidation,
        OctopusInputRange,
        OctopusSelect,
        OctopusSelectDropdown,
        OctopusSelectOption
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        OctopusCheckbox,
        OctopusFormField,
        OcotpusFormLabel,
        OcotpusFormInput,
        OcotpusFormPrefix,
        OcotpusFormPostfix,
        OcotpusFormValidation,
        OctopusInputRange,
        OctopusSelect,
        OctopusSelectDropdown,
        OctopusSelectOption
    ]
})
export class OctopusFormModule { }