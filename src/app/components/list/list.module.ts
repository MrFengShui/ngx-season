import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusFormModule } from "src/app/form/form.module";
import { OctopusRippleModule } from "../ripple/ripple.module";

import { OctopusListItem, OctopusListIcon, OctopusNavListItem, OctopusSelectListItem, OctopusListText } from "./item.component";
import { OctopusList, OctopusListHeadline, OctopusNavList, OctopusSelectList } from "./list.component";

@NgModule({
    declarations: [
        OctopusList,
        OctopusNavList,
        OctopusListHeadline,
        OctopusListItem,
        OctopusSelectList,
        OctopusSelectListItem,
        OctopusNavListItem,
        OctopusListIcon,
        OctopusListText
    ],
    imports: [
        CommonModule,
        OctopusFormModule,
        OctopusRippleModule
    ],
    exports: [
        OctopusList,
        OctopusNavList,
        OctopusListHeadline,
        OctopusListItem,
        OctopusSelectList,
        OctopusSelectListItem,
        OctopusNavListItem,
        OctopusListIcon,
        OctopusListText
    ]
})
export class OctopusListModule { }