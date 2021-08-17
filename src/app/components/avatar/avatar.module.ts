import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusAvatar } from "./avatar.directive";

@NgModule({
    declarations: [
        OctopusAvatar
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusAvatar
    ]
})
export class OctopusAvatarModule { }