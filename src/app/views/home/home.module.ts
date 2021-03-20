import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/global/material.module";
import { SharedModule } from "src/app/global/shared.module";
import { WidgetsModule } from "src/app/widgets/widgets.module";

import { HomeSidenavService } from "src/app/services/home.service";

import { HomeComponent } from "./home.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { AudioComponent } from "./audio/audio.component";
import { VideoComponent } from "./video/video.component";
import { LiveComponent } from "./live/live.component";

import { HOME_ROUTER } from "src/app/routers/home.routing";

@NgModule({
    declarations: [
        HomeComponent,
        WelcomeComponent,
        AudioComponent,
        VideoComponent,
        LiveComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(HOME_ROUTER),
        MaterialModule,
        SharedModule,
        WidgetsModule
    ],
    exports: [
        HomeComponent,
        WelcomeComponent,
        AudioComponent,
        VideoComponent,
        LiveComponent
    ],
    providers: [
        HomeSidenavService
    ]
})
export class HomeModule { }