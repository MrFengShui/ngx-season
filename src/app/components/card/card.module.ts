import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusCard } from "./card.component";
import { OctopusCardAttach } from "./attach.component";
import { OctopusCardHeader } from "./header.component";
import { OctopusCardTitle } from "./title.component";
import { OctopusCardSubtitle } from "./subtitle.component";
import { OctopusCardContent } from "./content.component";
import { OctopusCardFooter } from "./footer.component";

import { OctopusCardAvatar } from "./avatar.directive";

@NgModule({
    declarations: [
        OctopusCard,
        OctopusCardAttach,
        OctopusCardHeader,
        OctopusCardTitle,
        OctopusCardSubtitle,
        OctopusCardContent,
        OctopusCardFooter,
        OctopusCardAvatar
    ],
    imports: [
        CommonModule
    ],
    exports: [
        OctopusCard,
        OctopusCardAttach,
        OctopusCardHeader,
        OctopusCardTitle,
        OctopusCardSubtitle,
        OctopusCardContent,
        OctopusCardFooter,
        OctopusCardAvatar
    ]
})
export class OctopusCardModule { }