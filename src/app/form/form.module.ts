import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusFormField } from "./field.component";

import { OcotpusFormInput } from "./input.directive";
import { OcotpusFormLabel } from "./label.directive";
import { OcotpusFormPostfix } from "./postfix.directive";
import { OcotpusFormPrefix } from "./prefix.directive";
import { OcotpusFormValidation } from "./valid.directive";

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
        CommonModule
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