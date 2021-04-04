import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/global/material.module";
import { SharedModule } from "src/app/global/shared.module";
import { WidgetsModule } from "src/app/widgets/widgets.module";
import { PipeModule } from "src/app/pipes/pipe.module";

import { HomeSidenavService } from "src/app/services/home.service";

import { HomeComponent } from "./home.component";
import { PlazzaComponent } from "./index/plazza.component";
import { WelcomeComponent } from "./index/welcome.component";
import { AudioComponent } from "./audio/audio.component";
import { AudioHomeComponent } from "./audio/ahome.component";
import { VideoComponent } from "./video/video.component";
import { LiveComponent } from "./live/live.component";
import { SettingComponent } from "./setting/setting.component";
import { SettingAccountComponent } from "./setting/account/account.component";
import { SettingSecurityComponent } from "./setting/security/security.component";
import { SettingNoticeComponent } from "./setting/notice/notice.component";
import { SupportComponent } from "./support/support.component";
import { ReportComponent } from "./report/report.component";

import { HOME_ROUTER } from "src/app/routers/home.routing";

@NgModule({
    declarations: [
        HomeComponent,
        WelcomeComponent,
        AudioHomeComponent,
        AudioComponent,
        PlazzaComponent,
        VideoComponent,
        LiveComponent,
        SettingComponent,
        SettingAccountComponent,
        SettingSecurityComponent,
        SettingNoticeComponent,
        SupportComponent,
        ReportComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(HOME_ROUTER),
        MaterialModule,
        SharedModule,
        WidgetsModule,
        PipeModule
    ],
    exports: [
        HomeComponent,
        WelcomeComponent,
        AudioHomeComponent,
        AudioComponent,
        PlazzaComponent,
        VideoComponent,
        LiveComponent,
        SettingComponent,
        SettingAccountComponent,
        SettingSecurityComponent,
        SettingNoticeComponent,
        SupportComponent,
        ReportComponent
    ],
    providers: [
        HomeSidenavService
    ]
})
export class HomeModule { }