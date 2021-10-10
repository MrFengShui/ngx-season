import { OverlayModule } from "@angular/cdk/overlay";
import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OcotpusFormInput, OcotpusFormLabel, OcotpusFormPostfix, OcotpusFormPrefix, OcotpusFormValidation, OctopusFormField } from "./field/field.component";

@NgModule({
    declarations: [
        OctopusFormField,
        OcotpusFormLabel,
        OcotpusFormInput,
        OcotpusFormPrefix,
        OcotpusFormPostfix,
        OcotpusFormValidation
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OverlayModule,
        PortalModule
    ],
    exports: [
        OctopusFormField,
        OcotpusFormLabel,
        OcotpusFormInput,
        OcotpusFormPrefix,
        OcotpusFormPostfix,
        OcotpusFormValidation
    ]
})
export class OctopusFormModule { }