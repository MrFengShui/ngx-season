import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/global/material.module";
import { SharedModule } from "src/app/global/shared.module";
import { PipeModule } from "src/app/pipes/pipe.module";
import { WidgetsModule } from "src/app/widgets/widgets.module";

import { HOME_SUPPORT_ROUTER } from "src/app/routers/home.routing";

import { HomeSupportComponent } from "./support.component";
import { HomeSupportAboutComponent } from "./about.component";

@NgModule({
    declarations: [
        HomeSupportComponent,
        HomeSupportAboutComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(HOME_SUPPORT_ROUTER),
        MaterialModule,
        SharedModule,
        WidgetsModule,
        PipeModule
    ],
    exports: [
        HomeSupportComponent,
        HomeSupportAboutComponent
    ]
})
export class HomeSupportModule { }