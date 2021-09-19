import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusCard, OctopusCardAvatar, OctopusCardContent, OctopusCardFooter, OctopusCardGroup, OctopusCardHeader, OctopusCardMedia, OctopusCardSubtitle, OctopusCardTitle } from "./card.component";

@NgModule({
    declarations: [
        OctopusCardGroup,
        OctopusCard,
        OctopusCardAvatar,
        OctopusCardHeader,
        OctopusCardTitle,
        OctopusCardSubtitle,
        OctopusCardMedia,
        OctopusCardContent,
        OctopusCardFooter
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusCardGroup,
        OctopusCard,
        OctopusCardAvatar,
        OctopusCardHeader,
        OctopusCardTitle,
        OctopusCardSubtitle,
        OctopusCardMedia,
        OctopusCardContent,
        OctopusCardFooter
    ]
})
export class OctopusCardModule { }