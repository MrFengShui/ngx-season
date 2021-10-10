import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusCheckboxModule } from "src/app/form/check/check.module";
import { OctopusAvatarModule } from "../avatar/avatar.module";
import { OctopusRippleModule } from "../ripple/ripple.module";

import { OctopusList, OctopusListHeadline, OctopusListItem, OctopusListItemAddon, OctopusListItemContent, OctopusListItemDuration, OctopusListItemMedia, OctopusListItemSubtitle, OctopusListItemTitle, OctopusNavList, OctopusNavListItem, OctopusSelectList, OctopusSelectListItem } from "./list.component";

@NgModule({
    declarations: [
        OctopusList,
        OctopusNavList,
        OctopusListHeadline,
        OctopusListItem,
        OctopusListItemTitle,
        OctopusListItemSubtitle,
        OctopusListItemContent,
        OctopusListItemDuration,
        OctopusListItemAddon,
        OctopusListItemMedia,
        OctopusSelectList,
        OctopusSelectListItem,
        OctopusNavListItem
    ],
    imports: [
        CommonModule,
        OctopusAvatarModule,
        OctopusCheckboxModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusList,
        OctopusNavList,
        OctopusListHeadline,
        OctopusListItem,
        OctopusListItemTitle,
        OctopusListItemSubtitle,
        OctopusListItemContent,
        OctopusListItemDuration,
        OctopusListItemAddon,
        OctopusListItemMedia,
        OctopusSelectList,
        OctopusSelectListItem,
        OctopusNavListItem
    ]
})
export class OctopusListModule { }