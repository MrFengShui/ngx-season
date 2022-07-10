import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {
    OctopusCard,
    OctopusCardAttach, OctopusCardAvatar,
    OctopusCardContent, OctopusCardControl,
    OctopusCardHeader, OctopusCardSubtitle,
    OctopusCardTitle
} from "./card.component";

@NgModule({
    declarations: [
        OctopusCard,
        OctopusCardAttach,
        OctopusCardAvatar,
        OctopusCardContent,
        OctopusCardControl,
        OctopusCardHeader,
        OctopusCardTitle,
        OctopusCardSubtitle
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusCard,
        OctopusCardAttach,
        OctopusCardAvatar,
        OctopusCardContent,
        OctopusCardControl,
        OctopusCardHeader,
        OctopusCardTitle,
        OctopusCardSubtitle
    ]
})
export class OctopusCardModule {}
