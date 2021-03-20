import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/global/material.module";
import { SharedModule } from "src/app/global/shared.module";

import { ErrorComponent } from "./error/error.component";
import { OtherComponent } from "./other.component";
import { SignupComponent } from "./signup/signup.component";

import { OTHER_ROUTER } from "src/app/routers/other.routing";

@NgModule({
    declarations: [
        OtherComponent,
        ErrorComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(OTHER_ROUTER),
        MaterialModule,
        SharedModule
    ],
    exports: [
        OtherComponent,
        ErrorComponent,
        SignupComponent
    ]
})
export class OtherModule { }