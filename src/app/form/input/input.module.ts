import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OctopusButtonModule } from "src/app/components/button/button.module";
import { OctopusIconModule } from "src/app/components/icon/icon.module";

import { OctopusInput, OctopusInputGroup, OctopusInputGroupPrefix, OctopusInputGroupSuffix, OctopusInputPhone } from "./input.component";

@NgModule({
    declarations: [
        OctopusInput,
        OctopusInputPhone,
        OctopusInputGroup,
        OctopusInputGroupPrefix,
        OctopusInputGroupSuffix
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        OctopusButtonModule,
        OctopusIconModule
    ],
    exports: [
        OctopusInput,
        OctopusInputPhone,
        OctopusInputGroup,
        OctopusInputGroupPrefix,
        OctopusInputGroupSuffix
    ]
})
export class OctopusInputModule { }