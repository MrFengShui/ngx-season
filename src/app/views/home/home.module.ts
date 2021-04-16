import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/global/material.module";
import { SharedModule } from "src/app/global/shared.module";
import { OverlapModule } from "src/app/overlap/overlap.module";
import { WidgetsModule } from "src/app/widgets/widgets.module";
import { PipeModule } from "src/app/pipes/pipe.module";

import { HomeSidenavService } from "src/app/services/home.service";

import { HomeComponent } from "./home.component";
import { PlazzaComponent } from "./index/plazza.component";
import { WelcomeComponent } from "./index/welcome.component";
import { AudioComponent } from "./media/audio.component";
import { VideoComponent } from "./media/video.component";
import { LiveComponent } from "./live/live.component";
import { ReportComponent } from "./report/report.component";

import { HOME_ROUTER } from "src/app/routers/home.routing";

@NgModule({
    declarations: [
        HomeComponent,
        WelcomeComponent,
        AudioComponent,
        PlazzaComponent,
        VideoComponent,
        LiveComponent,
        ReportComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(HOME_ROUTER),
        MaterialModule,
        SharedModule,
        OverlapModule,
        WidgetsModule,
        PipeModule
    ],
    exports: [
        HomeComponent,
        WelcomeComponent,
        AudioComponent,
        PlazzaComponent,
        VideoComponent,
        LiveComponent,
        ReportComponent
    ],
    providers: [
        HomeSidenavService
    ]
})
export class HomeModule { }