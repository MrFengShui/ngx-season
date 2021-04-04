import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../global/material.module";
import { SharedModule } from "../global/shared.module";
import { PipeModule } from "../pipes/pipe.module";

import { SigninComponent } from "../overlay/signin/signin.component";
import { AudioPlayerComponent } from "./aplayer/aplayer.component";
import { VideoPlayerComponent } from "./vplayer/vplayer.component";
import { AvatarComponent } from "./avatar/avatar.component";
import { WidgetsAlertComponent } from "./alert/alert.component";
import { NoticeComponent } from "./notice/notice.component";
import { WidgetsParagraphHolderComponent } from "./holder/pholder.component";
import { WidgetsUnitHolderComponent } from "./holder/uholder.component";
import { WidgetsChatServiceComponent } from "./chat/service.component";
import { WidgetsCarouselComponent } from "./carousel/carousel.component";
import { WidgetsBlockHolderComponent } from "./holder/bholder.component";
import { WidgetsItemHolderComponent } from "./holder/iholder.component";
import { WidgetsChatQueueComponent } from "./chat/queue.component";
import { WidgetsTrackerComponent } from "./tracker/tracker.component";

@NgModule({
    declarations: [
        AvatarComponent,
        WidgetsAlertComponent,
        WidgetsChatQueueComponent,
        WidgetsChatServiceComponent,
        NoticeComponent,
        SigninComponent,
        AudioPlayerComponent,
        VideoPlayerComponent,
        WidgetsTrackerComponent,
        WidgetsBlockHolderComponent,
        WidgetsParagraphHolderComponent,
        WidgetsUnitHolderComponent,
        WidgetsItemHolderComponent,
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
        WidgetsChatQueueComponent,
        WidgetsChatServiceComponent,
        NoticeComponent,
        SigninComponent,
        AudioPlayerComponent,
        VideoPlayerComponent,
        WidgetsTrackerComponent,
        WidgetsBlockHolderComponent,
        WidgetsParagraphHolderComponent,
        WidgetsUnitHolderComponent,
        WidgetsItemHolderComponent,
        WidgetsCarouselComponent
    ]
})
export class WidgetsModule { }