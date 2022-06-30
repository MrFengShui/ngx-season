import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    OctopusChipAvatar,
    OctopusChipLabel, OctopusChipList,
    OctopusMarkLabel,
    OctopusMarkLabelHead,
    OctopusMarkLabelTail
} from "./label.component";

import {OctopusButtonModule} from "../button/button.module";
import {OctopusImageModule} from "../image/image.module";

@NgModule({
    declarations: [
        OctopusChipAvatar,
        OctopusChipLabel,
        OctopusChipList,
        OctopusMarkLabel,
        OctopusMarkLabelHead,
        OctopusMarkLabelTail
    ],
    imports: [
        CommonModule,
        OctopusButtonModule,
        OctopusImageModule
    ],
    exports: [
        OctopusChipAvatar,
        OctopusChipLabel,
        OctopusChipList,
        OctopusMarkLabel,
        OctopusMarkLabelHead,
        OctopusMarkLabelTail
    ]
})
export class OctopusLabelModule {}
