import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OctopusCheckboxModule } from "src/app/form/check/check.module";

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
        OctopusCheckboxModule
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