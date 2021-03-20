import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "../global/material.module";
import { SharedModule } from "../global/shared.module";
import { PipeModule } from "../pipes/pipe.module";

import { SigninComponent } from "./signin/signin.component";
import { AudioPlayerComponent } from "./aplayer/aplayer.component";
import { VideoPlayerComponent } from "./vplayer/vplayer.component";

@NgModule({
    declarations: [
        SigninComponent,
        AudioPlayerComponent,
        VideoPlayerComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        SharedModule,
        PipeModule
    ],
    exports: [
        SigninComponent,
        AudioPlayerComponent,
        VideoPlayerComponent
    ]
})
export class WidgetsModule { }