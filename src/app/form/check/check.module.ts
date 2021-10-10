import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { OctopusCheckbox } from "./check.component";

@NgModule({
    declarations: [
        OctopusCheckbox
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        OctopusCheckbox
    ]
})
export class OctopusCheckboxModule { }