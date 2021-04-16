import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "src/app/global/material.module";
import { SharedModule } from "src/app/global/shared.module";
import { PipeModule } from "src/app/pipes/pipe.module";
import { WidgetsModule } from "src/app/widgets/widgets.module";

import { HOME_SETTING_ROUTER } from "src/app/routers/home.routing";

import { HomeSettingComponent } from "./setting.component";
import { HomeSettingAccountComponent } from "./account.component";
import { HomeSettingLanguageComponent } from "./language.component";
import { HomeSettingNoticeComponent } from "./notice.component";
import { HomeSettingSecurityComponent } from "./security.component";
import { HomeSettingThemeComponent } from "./theme.component";
import { HomeSettingModeComponent } from "./mode.component";

@NgModule({
    declarations: [
        HomeSettingComponent,
        HomeSettingAccountComponent,
        HomeSettingSecurityComponent,
        HomeSettingNoticeComponent,
        HomeSettingModeComponent,
        HomeSettingThemeComponent,
        HomeSettingLanguageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(HOME_SETTING_ROUTER),
        MaterialModule,
        SharedModule,
        WidgetsModule,
        PipeModule
    ],
    exports: [
        HomeSettingComponent,
        HomeSettingAccountComponent,
        HomeSettingSecurityComponent,
        HomeSettingNoticeComponent,
        HomeSettingModeComponent,
        HomeSettingThemeComponent,
        HomeSettingLanguageComponent,
    ]
})
export class HomeSettingModule { }