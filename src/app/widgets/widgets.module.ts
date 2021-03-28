import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../global/material.module";
import { SharedModule } from "../global/shared.module";
import { PipeModule } from "../pipes/pipe.module";

import { SigninComponent } from "./signin/signin.component";
import { AudioPlayerComponent } from "./aplayer/aplayer.component";
import { VideoPlayerComponent } from "./vplayer/vplayer.component";
import { AvatarComponent } from "./avatar/avatar.component";
import { WidgetsAlertComponent } from "./alert/alert.component";
import { NoticeComponent } from "./notice/notice.component";
import { WidgetsParagraphHolderComponent } from "./holder/pholder.component";
import { WidgetsUnitHolderComponent } from "./holder/uholder.component";
import { WidgetsChatServiceComponent } from "./chat/service.component";
import { WidgetsCarouselComponent } from "./carousel/carousel.component";

@NgModule({
    declarations: [
        AvatarComponent,
        WidgetsAlertComponent,
        WidgetsChatServiceComponent,
        NoticeComponent,
        SigninComponent,
        AudioPlayerComponent,
        VideoPlayerComponent,
        WidgetsParagraphHolderComponent,
        WidgetsUnitHolderComponent,
        WidgetsCarouselComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        SharedModule,
        PipeModule
    ],
    exports: [
        AvatarComponent,
        WidgetsAlertComponent,
        WidgetsChatServiceComponent,
        NoticeComponent,
        SigninComponent,
        AudioPlayerComponent,
        VideoPlayerComponent,
        WidgetsParagraphHolderComponent,
        WidgetsUnitHolderComponent,
        WidgetsCarouselComponent
    ]
})
export class WidgetsModule { }