import { PortalModule } from "@angular/cdk/portal";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NGXSeasonAvatarModule } from "../avatar/avatar.module";
import { NGXSeasonCheckModule } from "../check/check.module";

import { NGXSeasonListComponent, NGXSeasonListFooterDirective, NGXSeasonListHeaderDirective } from "./list.component";
import { NGXSeasonListCheckItemComponent, NGXSeasonListItemComponent, NGXSeasonListMetaItemComponent } from "./list-item.component";
import { NGXSeasonListItemContentDirective, NGXSeasonListItemFooterDirective, NGXSeasonListItemHeaderDirective, NGXSeasonListItemMediaDirective } from "./list-widget.component";

@NgModule({
    declarations: [
        NGXSeasonListComponent,
        NGXSeasonListHeaderDirective,
        NGXSeasonListFooterDirective,
        NGXSeasonListItemComponent,
        NGXSeasonListCheckItemComponent,
        NGXSeasonListMetaItemComponent,
        NGXSeasonListItemHeaderDirective,
        NGXSeasonListItemContentDirective,
        NGXSeasonListItemFooterDirective,
        NGXSeasonListItemMediaDirective
    ],
    imports: [ 
        CommonModule,
        PortalModule,

        NGXSeasonAvatarModule,
        NGXSeasonCheckModule
    ],
    exports: [
        NGXSeasonListComponent,
        NGXSeasonListHeaderDirective,
        NGXSeasonListFooterDirective,
        NGXSeasonListItemComponent,
        NGXSeasonListCheckItemComponent,
        NGXSeasonListMetaItemComponent,
        NGXSeasonListItemHeaderDirective,
        NGXSeasonListItemContentDirective,
        NGXSeasonListItemFooterDirective,
        NGXSeasonListItemMediaDirective
    ]
})
export class NGXSeasonListModule {}