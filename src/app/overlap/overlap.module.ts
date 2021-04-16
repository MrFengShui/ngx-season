import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../global/material.module";
import { SharedModule } from "../global/shared.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
    ],
    exports: [
        LoginComponent
    ]
})
export class OverlapModule { }