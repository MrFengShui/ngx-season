import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../global/material.module";
import { SharedModule } from "../global/shared.module";
import { PipeModule } from "../pipes/pipe.module";

import { WidgetsAudioPlayerComponent } from "./player/aplayer.component";
import { WidgetsVideoPlayerComponent } from "./player/vplayer.component";
import { AvatarComponent } from "./avatar/avatar.component";
import { WidgetsAlertComponent } from "./alert/alert.component";
import { NoticeComponent } from "./notice/notice.component";
import { WidgetsParagraphHolderComponent } from "./holder/paragraph.component";
import { WidgetsUnitHolderComponent } from "./holder/uholder.component";
import { WidgetsChatServiceComponent } from "./chat/service.component";
import { WidgetsCarouselComponent } from "./carousel/carousel.component";
import { WidgetsBlockHolderComponent } from "./holder/bholder.component";
import { WidgetsItemHolderComponent } from "./holder/iholder.component";
import { WidgetsChatQueueComponent } from "./chat/queue.component";
import { WidgetsTrackerComponent } from "./tracker/tracker.component";
import { WidgetsOrbitComponent } from "./orbit/orbit.component";
import { WidgetsUnitAnchorComponent } from "./anchor/unit.component";
import { WidgetsMetaHolderComponent } from "./holder/meta.component";
import { WidgetsMediaMetaComponent } from "./media/meta.component";
import { WidgetsMediaCommentComponent } from "./media/comment.component";
import { WidgetsMediaRecommendComponent } from "./media/recommend.component";
import { WidgetsTitleSubtitleHolderDirective } from "./holder/tsholder.directive";
import { WidgetsParagraphHolderDirective } from "./holder/pholder.directive";
import { WidgetsAvatarNameSubscribeButtonHolderDirective } from "./holder/ansbholder.directive";
import { WidgetsToolbarHolderDirective } from "./holder/tbholder.directive";
import { WidgetsBlockHolderDirective } from "./holder/bholder.directive";
import { WidgetsMediaChatComponent } from "./media/chat.component";

@NgModule({
    declarations: [
        AvatarComponent,
        WidgetsAlertComponent,
        WidgetsChatQueueComponent,
        WidgetsChatServiceComponent,
        NoticeComponent,
        WidgetsAudioPlayerComponent,
        WidgetsVideoPlayerComponent,
        WidgetsTrackerComponent,
        WidgetsBlockHolderComponent,
        WidgetsParagraphHolderComponent,
        WidgetsUnitHolderComponent,
        WidgetsMetaHolderComponent,
        WidgetsItemHolderComponent,
        WidgetsCarouselComponent,
        WidgetsOrbitComponent,
        WidgetsUnitAnchorComponent,
        WidgetsMediaMetaComponent,
        WidgetsMediaCommentComponent,
        WidgetsMediaChatComponent,
        WidgetsMediaRecommendComponent,
        WidgetsTitleSubtitleHolderDirective,
        WidgetsParagraphHolderDirective,
        WidgetsAvatarNameSubscribeButtonHolderDirective,
        WidgetsToolbarHolderDirective,
        WidgetsBlockHolderDirective
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
        WidgetsAudioPlayerComponent,
        WidgetsVideoPlayerComponent,
        WidgetsTrackerComponent,
        WidgetsBlockHolderComponent,
        WidgetsParagraphHolderComponent,
        WidgetsUnitHolderComponent,
        WidgetsMetaHolderComponent,
        WidgetsItemHolderComponent,
        WidgetsCarouselComponent,
        WidgetsOrbitComponent,
        WidgetsUnitAnchorComponent,
        WidgetsMediaMetaComponent,
        WidgetsMediaCommentComponent,
        WidgetsMediaChatComponent,
        WidgetsMediaRecommendComponent,
        WidgetsTitleSubtitleHolderDirective,
        WidgetsParagraphHolderDirective,
        WidgetsAvatarNameSubscribeButtonHolderDirective,
        WidgetsToolbarHolderDirective,
        WidgetsBlockHolderDirective
    ]
})
export class WidgetsModule { }